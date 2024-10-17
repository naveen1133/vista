import 'cypress-axe';

describe('Report to check Vista dashboard', () => {
  const thresholds = {
    performance: 70,
    accessibility: 90,
    'best-practices': 85,
    seo: 85,
    pwa: 75,
  };

  const lighthouseOptions = {
    formFactor: 'desktop',
    screenEmulation: { disabled: true },
  };

  const lighthouseConfig = {
    settings: { output: 'html' },
    extends: 'lighthouse:default',
  };

  const getClientCredentials = () => {
    const clients = [
      { name: 'Amazon', username: 'amazon6586', password: 'Test12test' },
      { name: 'TJX', username: 'tjx456', password: 'Test12Test' },
    ];
    return clients[Math.floor(Math.random() * clients.length)];
  };

  it('should generate report to check vista dashboard', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    // Visit the page
    cy.visit('http://localhost:3000/');

    // Select the client and log in
    const client = getClientCredentials();
    cy.get('select').select(client.name);
    cy.get('button').contains('Login').click();
    cy.get('input[placeholder="User ID"]').type(client.username);
    cy.get('input[placeholder="Password"]').type(client.password);
    cy.get('button').contains('Secure Login').click();

    // Wait for content to load
    cy.wait(2000);
    cy.get('button').contains('Activity').click();
    cy.wait(2000);

    // Inject Axe for accessibility testing
    cy.injectAxe();

    const violationsWithScreenshots = [];

    // Run accessibility check with Axe
    cy.checkA11y(
      null,
      {
        includedImpacts: ['critical', 'serious', 'moderate', 'minor'],
      },
      (violations) => {
        if (violations.length > 0) {
          // Map each violation to a screenshot of the violating element
          const screenshotPromises = violations.map((violation, index) => {
            const elementSelector = violation.nodes[0].target[0];
            const uniqueScreenshotName = `violation-${index}-${violation.id}-${Date.now()}`;

            // Ensure the element is present before interacting
            return cy.get('body').then(($body) => {
              if ($body.find(elementSelector).length > 0) {
                // Scroll into view and take a screenshot of the violating element
                return cy.get(elementSelector).scrollIntoView().then(($el) => {
                  cy.wrap($el).screenshot(uniqueScreenshotName).then(() => {
                    // Read the screenshot and store it in the violations array
                    cy.readFile(`cypress/screenshots/${uniqueScreenshotName}.png`, 'base64')
                      .then((base64Image) => {
                        violationsWithScreenshots.push({
                          violation,
                          elementSelector,
                          screenshot: base64Image,
                        });
                      });
                  });
                });
              } else {
                cy.log(`Element ${elementSelector} not found for violation ${violation.id}`);
              }
            });
          });

          // Once all screenshots are processed, generate the HTML report
          cy.wrap(Promise.all(screenshotPromises)).then(() => {
            const htmlReport = generateHTMLReportWithScreenshots(violationsWithScreenshots);
            cy.task('writeAccessibilityReport', {
              filename: 'accessibility-report.html',
              content: htmlReport,
            });
          });
        } else {
          cy.log('No accessibility violations found');
        }
      }
    );
  });
});

// Function to generate the HTML report with screenshots
function generateHTMLReportWithScreenshots(violations) {
  let htmlContent = `<html><head><title>Accessibility Report</title></head><body><h1>Accessibility Axe Report</h1>`;

  violations.forEach(({ violation, elementSelector, screenshot }) => {
    htmlContent += `
      <h2>Violation ID: ${violation.id}</h2>
      <p><strong>Description:</strong> ${violation.description}</p>
      <p><strong>Impact:</strong> ${violation.impact}</p>
      <p><strong>Affected Element:</strong> <code>${elementSelector}</code></p>
      <p><strong>Screenshot:</strong></p>
      <img src="data:image/png;base64, ${screenshot}" alt="Screenshot of issue" />
      <hr/>
    `;
  });

  htmlContent += `</body></html>`;
  return htmlContent;
}
