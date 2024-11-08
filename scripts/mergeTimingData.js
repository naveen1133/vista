const fs = require('fs');
const path = require('path');

const timingFilePath = path.join(__dirname, 'cypress/reports/timingData.json');
const mergedReportPath = path.join(__dirname, 'cypress/reports/mergedReport.json');

function readTimingData() {
  if (fs.existsSync(timingFilePath)) {
    const data = fs.readFileSync(timingFilePath);
    return JSON.parse(data);
  }
  return [];
}

function calculateMetrics(timingData) {
  let totalElapsedTime = 0;
  let individualExecutionTimes = 0;

  timingData.forEach(run => {
    const elapsedTime = run.endTime - run.startTime;
    totalElapsedTime += elapsedTime;
    individualExecutionTimes += run.executionTime;
  });

  const savedTime = individualExecutionTimes - totalElapsedTime;
  const percentSaved = ((savedTime / individualExecutionTimes) * 100).toFixed(2);

  return {
    totalElapsedTime: totalElapsedTime / 1000, // Convert ms to seconds
    individualExecutionTimes: individualExecutionTimes / 1000,
    savedTime: savedTime / 1000,
    percentSaved
  };
}

function writeMetricsToReport(metrics) {
  const report = {
    totalElapsedTime: `${metrics.totalElapsedTime}s`,
    individualExecutionTimes: `${metrics.individualExecutionTimes}s`,
    savedTime: `${metrics.savedTime}s`,
    percentSaved: `${metrics.percentSaved}%`
  };

  if (fs.existsSync(mergedReportPath)) {
    const existingReport = JSON.parse(fs.readFileSync(mergedReportPath));
    existingReport.timingMetrics = report;
    fs.writeFileSync(mergedReportPath, JSON.stringify(existingReport, null, 2));
  } else {
    fs.writeFileSync(mergedReportPath, JSON.stringify({ timingMetrics: report }, null, 2));
  }
}

function main() {
  const timingData = readTimingData();
  if (timingData.length === 0) {
    console.error('No timing data found.');
    return;
  }

  const metrics = calculateMetrics(timingData);
  writeMetricsToReport(metrics);
}

main();
