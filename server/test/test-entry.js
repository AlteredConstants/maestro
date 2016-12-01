import fs from 'fs';
import path from 'path';
import { afterEach } from 'mocha';
import chai from 'chai';
import td from 'testdouble';
import tdChai from 'testdouble-chai';
import deepFreeze from 'deep-freeze';

chai.use(tdChai(td));

// Reset the testdouble state after every test.
afterEach(() => td.reset());

// Prevent mutation of sample data in tests.
const dataDirectoryPath = path.join(__dirname, 'data');
fs.readdirSync(dataDirectoryPath).forEach((fileName) => {
  if (!fileName.endsWith('.json')) return;
  // eslint-disable-next-line import/no-dynamic-require, global-require
  deepFreeze(require(path.join(dataDirectoryPath, fileName)));
});
