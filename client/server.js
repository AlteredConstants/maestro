const spdy = require('spdy');
const Static = require('node-static');

const file = new Static.Server('.', { cache: 0 });

const options = {
  plain: true,
  ssl: false,

  // **optional** SPDY-specific options
  windowSize: 1024 * 1024, // Server's window size

  // **optional** if true - server will send 3.1 frames on 3.0 *plain* spdy
  autoSpdy31: false,
};

const server = spdy.createServer(options, (request, response) => {
  file.serve(request, response);
});

server.listen(3000);
