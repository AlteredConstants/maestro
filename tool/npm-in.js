const path = require('path');
const fork = require('child_process').fork;

// Add the root project .bin directory so subprojects have access to them, too.
const binPath = path.join(__dirname, '../node_modules/.bin');
process.env.PATH = process.env.PATH + path.delimiter + binPath;

const childPath = path.join(__dirname, 'npm.js');
const [,, projectList, ...args] = process.argv;
const projects = projectList.split(',');

const runInProject = project => new Promise((resolve, reject) => {
  if (projects.length > 1) console.log(`[${project}] ${args.join(' ')}`);
  const projectPath = path.join(__dirname, '..', project);
  const child = fork(childPath, args, { cwd: projectPath });
  child.on('close', code => ((code !== 0) ? reject(code) : resolve()));
});

const syncAll = (func, list) => list.reduce(
  (promise, next) => promise.then(() => func(next)),
  Promise.resolve());

syncAll(runInProject, projects).catch(code => process.exit(code));
