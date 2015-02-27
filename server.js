var spdy = require('spdy');
var Static = require('node-static');

var file = new Static.Server('.', { cache: 0 });

var options = {
	plain: true,
	ssl: false,

	// **optional** SPDY-specific options
	windowSize: 1024 * 1024, // Server's window size

	// **optional** if true - server will send 3.1 frames on 3.0 *plain* spdy
	autoSpdy31: false
};

var server = spdy.createServer(options, function(request, response) {
	file.serve(request, response);
});

server.listen(3000);
