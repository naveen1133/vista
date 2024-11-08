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
     
    },

    // Specify the pattern for test files
    specPattern: 'cypress/e2e/**/*.cy.js',

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
    
  //   reporter: 'cypress-mochawesome-reporter',
  // reporterOptions: {
  //   reportDir: 'cypress/reports',
  //   reportFilename: 'report',
  //   overwrite: false,
  //   html: true,
  //   json: true,
  //   embeddedScreenshots: true,
  //   charts: true, // Add visual charts if useful
  //   timestamp: 'mmddyyyy_HHMMss'
  // },
  },
});
