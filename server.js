#!/usr/bin/env node

var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;
var fs = require('fs');
var URL = require('url');
var util = require('util');

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
	var headers = {'Access-Control-Allow-Origin': '*'}; // CORS FTW

	http.createServer(function(req, res) {
		var ip = req.connection.remoteAddress;
		if (req.headers['x-forwarded-for']) {
			ip = req.headers['x-forwarded-for'].split(', ').shift()
		} 
		var url = URL.parse(req.url, true); // true = parse querystring to object
		var path = url.pathname;
		if (path == "/") {
			res.writeHead(200);
			res.end(template.replace(/\{ip\}/g, ip).replace(/\{domain\}/g, req.headers['host']));
		} else if (path == '/text') {
			res.writeHead(200, headers);
			res.end(ip);
		} else if (path == '/json') {
			var data = JSON.stringify({ip: ip});
			if (url.query && url.query.callback) {
				data = util.format('%s(%s);', url.query.callback, data);
			}
			res.writeHead(200, headers); 
			res.end(data);
		} else {
			res.writeHead(404);
			res.end('404 file not found');
		}
	}).listen(process.env.PORT);
}
