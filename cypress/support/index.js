Cypress.on('test:after:run', (test, runnable) => {
    const totalTime = test.duration / 1000;  // In seconds
    const executedTime = runnable.duration / 1000;  // In seconds
    const savedTime = (executedTime - totalTime).toFixed(3);  // Calculate saved time
  
    console.log(`Total run time: ${totalTime}s`);
    console.log(`Executed in: ${executedTime}s`);
    console.log(`Saved: ${savedTime}s (~${((savedTime / executedTime) * 100).toFixed(1)}%)`);
    
    // Optionally add this to the Mochawesome report or any custom logging
  });
  