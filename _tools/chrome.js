const { ChromeLauncher } = require('lighthouse/lighthouse-cli/chrome-launcher');

const cli = {
  input: process.argv.slice(2),
  flags: {
    remoteDebuggingPort: process.env.CHROME_REMOTE_DEBUGGING_PORT || 9222
  }
};

const launcher = new ChromeLauncher({
  startingUrl: cli.input[0],
  port: cli.flags.remoteDebuggingPort,
  autoSelectChrome: true,
  additionalFlags: [
    // '--disable-gpu',
    // '--headless'
  ]
});

const exitHandler = err => {
  console.warn(err);
  return launcher.kill().then(() => {
    process.exit(-1);
  });
};

const onError = exitHandler.bind(null);

process.on('SIGINT', onError);
process.on('unhandledRejection', onError);
process.on('rejectionHandled', onError);
process.on('uncaughtException', onError);

launcher.run().then(() => {
  const debugURL = `http://localhost:${cli.flags.remoteDebuggingPort}`;
  console.log('Launched Chrome in headless mode');
  console.log(`- Load ${debugURL} for Remote Debugging`);
}).catch(exitHandler);
