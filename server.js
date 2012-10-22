#!/usr/bin/env node

var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;
var fs = require('fs');
var URL = require('url');

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

	var template = fs.readFileSync('index.html').toString();

	http.createServer(function(req, res) {
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; 
		var path = URL.parse(req.url).pathname;
		if (path == "/") {
			res.writeHead(200);
			res.end(template.replace(/\{ip\}/g, ip).replace(/\{domain\}/g, req.headers['host']));
		} else if (path == '/text') {
			res.writeHead(200);
			res.end(ip);
		} else {
			res.writeHead(404);
			res.end('404 file not found');
		}
	}).listen(process.env.PORT);
}
