describe('report to check activity page', () => {
  const thresholds = {
    performance: 90,
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

  it('should generate report to check activity page', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    cy.visit('http://localhost:3000/');
    const client = getClientCredentials();
    cy.get('select').select(client.name);
    cy.get('button').contains('Login').click();
    cy.get('input[placeholder="User ID"]').type(client.username);
    cy.get('input[placeholder="Password"]').type(client.password);
    cy.get('button').contains('Secure Login').click();

    cy.wait(2000);
    cy.get('button').contains('Activity').click();
    cy.wait(2000);

    cy.lighthouse(thresholds, lighthouseOptions, lighthouseConfig, {
      filename: 'activity-page-report.html',
    });
  });
});
