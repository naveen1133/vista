const { defineConfig } = require("cypress");
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
const fs = require("fs");
const path = require("path");
const { beforeRunHook, afterRunHook } = require("cypress-mochawesome-reporter/lib");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    reportFilename: `cypress-report-${new Date().toISOString().replace(/[:.]/g, "-")}`,
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);

      let globalStartTime;
      let globalEndTime;

      on("before:run", async (details) => {
        console.log("Override before:run");
        await beforeRunHook(details);
        globalStartTime = new Date();
        console.log(`Test suite started at: ${globalStartTime}`);
      });

      on("after:run", async () => {
        globalEndTime = new Date();
        const totalExecutionTime = (globalEndTime - globalStartTime) / 1000; // Convert to seconds
        console.log(`Test suite ended at: ${globalEndTime}`);
        console.log(
          `Total execution time for all test files: ${totalExecutionTime.toFixed(3)} seconds`
        );

        // Directory for log files
        const logDirPath = path.join(__dirname, "cypress", "reports", "timings");
        if (!fs.existsSync(logDirPath)) {
          fs.mkdirSync(logDirPath, { recursive: true });
        }

        // Create log file name with timestamp
        const logFileName = `test-suite-${new Date()
          .toISOString()
          .replace(/[:.]/g, "-")}.json`;
        const logFilePath = path.join(logDirPath, logFileName);

        // Prepare log data
        const logData = {
          startTime: globalStartTime.toISOString(),
          endTime: globalEndTime.toISOString(),
          totalExecutionTime: `${totalExecutionTime.toFixed(3)} seconds`,
        };

        // Write to JSON file
        fs.writeFileSync(logFilePath, JSON.stringify(logData, null, 2), "utf8");
        console.log(`Execution timings saved to ${logFilePath}`);
      });

      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on("task", {
        lighthouse: lighthouse((lighthouseReport) => {
          const folderPath = path.join("cypress", "lighthouse");
          const filename = path.join(
            folderPath,
            `lighthouse-report-${new Date().toISOString().replace(/[:.]/g, "-")}.html`
          );

          if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
          }

          fs.writeFile(filename, lighthouseReport.report, (error) => {
            if (error) {
              console.error("Error writing the Lighthouse report:", error);
            } else {
              console.log(`Lighthouse report saved as ${filename}`);
            }
          });
          return null;
        }),
      });

      // Return the configuration with additional properties
      return {
        ...config,
        specPattern: "cypress/e2e/**/*.cy.{js,cjs,jsx,ts,tsx}",
        defaultCommandTimeout: 30000,
        pageLoadTimeout: 120000,
        experimentalStudio: true,
        video: false,
        screenshotOnRunFailure: true,
        retries: {
          runMode: 1,
          openMode: 0,
        },
      };
    },
  },
});
