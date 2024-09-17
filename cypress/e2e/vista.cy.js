describe('report to check vista dashboard', () => {
  const thresholds = {
    performance: 0,
    accessibility: 50,
    'best-practices': 50,
    seo: 50,
  };

  const lighthouseOptions = {
    formFactor: 'desktop',
    screenEmulation: { disabled: true },
  };

  const lighthouseConfig = {
    settings: { output: 'html' },
    extends: 'lighthouse:default',
  };

  // Function to randomly select a client and return the corresponding credentials
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

    // Visit the home page
    cy.visit('http://localhost:3000/');

    // Get the random client and its credentials
    const client = getClientCredentials();

    // Select the client from the dropdown
    cy.get('select').select(client.name);

    // Click the login button to navigate to the login page
    cy.get('button').contains('Login').click();

    // Fill in the login credentials based on the selected client
    cy.get('input[placeholder="User ID"]').type(client.username);
    cy.get('input[placeholder="Password"]').type(client.password);
    cy.get('button').contains('Secure Login').click();

    // Add any additional steps needed before generating the Lighthouse report
    cy.wait(2000); // Adjust the wait time if necessary to let the page load fully

    // Run Lighthouse audits
  cy.lighthouse(thresholds, lighthouseOptions, lighthouseConfig);
  });
});
 