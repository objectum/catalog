const config = require ("./config");
const path = require ("path");
const express = require ("express");
const proxy = require ("express-http-proxy");
const app = express ();

app.use (`/api`, proxy (`http://${config.objectum.host}:${config.objectum.port}`, {
	proxyReqPathResolver: function (req) {
		let parts = req.url.split('?');
		let queryString = parts [1];
		
		return `/projects/${config.code}${parts [0]}${queryString ? "?" + queryString : ""}`;
	}
}));
app.use ("/public/*", proxy (`http://${config.objectum.host}:${config.objectum.port}`, {
	proxyReqPathResolver: function (req) {
		return req.baseUrl;
	}
}));
app.use (express.static (path.join (__dirname, "build")));
app.get ("/*", function (req, res) {
	res.sendFile (path.join (__dirname, "build", "index.html"));
});
app.listen (config.port, function () {
	console.log (`server listening on port ${config.port}`);
});