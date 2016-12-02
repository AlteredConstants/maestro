const npm = require('global-npm');

const promisify = func => (...funcArgs) => new Promise((resolve, reject) => {
  func(...funcArgs, (error, ...resultArgs) => {
    if (error) reject(error);
    else resolve(...resultArgs);
  });
});

function processArgs() {
  const [,, command, ...args] = process.argv;
  if (npm.fullList.every(c => c !== command)) {
    return ['run', [command, ...args]];
  }
  return [command, args];
}

const [command, args] = processArgs();

const load = promisify(npm.load.bind(npm));
const runCommand = () => promisify(npm.commands[command].bind(npm))([...args]);

Promise.resolve()
.then(() => load({}))
.then(runCommand)
.catch(() => process.exit(1));
