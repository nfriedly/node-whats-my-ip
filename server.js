var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (!process.env.PORT) {
	console.error('The PORT environment variable must be set');
	process.exit(1);
}

if (cluster.isMaster) {
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', function(worker, code, signal) {
		console.log('worker ' + worker.process.pid + ' died');
	});
} else {
	http.createServer(function(req, res) {
		if (req.headers['x-forwarded-for']) {
			res.writeHead(200);
			res.end(req.headers['x-forwarded-for']);
		} else {
			res.writeHead(500);
			res.end('Unable to determine your IP. This script expects a load balancer, such as the one that heroku.com provides, to set the x-forwarded-for header.');
		}
	}).listen(process.env.PORT);
}
