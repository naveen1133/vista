const { defineConfig } = require('cypress');
const { lighthouse, prepareAudit } = require('@cypress-audit/lighthouse');
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
      });

      on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
      });

      on('before:browser:launch', (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on('task', {
        lighthouse: lighthouse((lighthouseReport) => {
          const folderPath = 'lighthouse-report'; // Folder where Lighthouse reports will be saved
          
          // Generate a filename with a timestamp
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
    pageLoadTimeout: 120000, // Increase page load timeout to 2 minutes
    defaultCommandTimeout: 60000, // Adjust as needed
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      reportFilename: `cypress-report-${new Date().toISOString().replace(/[:.]/g, '-')}`,
      overwrite: false,
      html: true,
      json: false,
    },
  },
});
