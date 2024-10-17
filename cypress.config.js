const { defineConfig } = require('cypress');
const { lighthouse, prepareAudit } = require('@cypress-audit/lighthouse');
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    setupNodeEvents(on, config) {
      // Cypress Mochawesome reporter
      require('cypress-mochawesome-reporter/plugin')(on);

      // Hooks for Mochawesome
      on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
      });

      on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
      });

      // Hook for Lighthouse audits
      on('before:browser:launch', (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });
      on('task', {
        writeAccessibilityReport({ filename, content }) {
          // Define the reports directory
          const reportsDir = path.join(__dirname, '..', 'reports');  // Ensure '..' points to the correct location
          
          // Check if the reports directory exists, if not, create it
          if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir);
          }
    
          // Define the path for the file where the report will be saved
          const filePath = path.join(reportsDir, filename);
    
          // Write the report content to the file
          fs.writeFileSync(filePath, content);
    
          console.log(`report saved as ${filePath}`);
    
          return null;
        }
      });
    

      // Task for generating Lighthouse reports
      on('task', {
        lighthouse: lighthouse((lighthouseReport) => {
          const folderPath = 'lighthouse-report';
          
          const filename = `lighthouse-report-${new Date().toISOString().replace(/[:.]/g, '-')}.html`;
          const filePath = path.join(folderPath, filename);

          if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
          }

          fs.writeFile(filePath, lighthouseReport.report, (error) => {
            if (error) {
              console.error('Error writing Lighthouse report:', error);
            } else {
              console.log(`Lighthouse report saved as ${filePath}`);
            }
          });
        }),
      });
    },

    // Specify the pattern for test files
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',

    // Timeout and configuration options
    pageLoadTimeout: 180000, // 3 minutes
    defaultCommandTimeout: 90000, // 1.5 minutes
    requestTimeout: 60000, // 1 minute
    responseTimeout: 60000, // 1 minute

    // Retries for failed tests
    retries: {
      runMode: 1, // Number of retries when running in CI
      openMode: 0, // Number of retries when running locally
    },
    
    // Cypress Mochawesome reporter configuration
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      reportFilename: `cypress-report-${new Date().toISOString().replace(/[:.]/g, '-')}`,
      overwrite: false,
      html: true,
      json: true,
    },
  },
});
