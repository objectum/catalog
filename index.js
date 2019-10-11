const fastify = require ("fastify") ();
const proxy = require ("fastify-http-proxy");
const config = require ("./config");

fastify.addHook ("onError", async (req, res, error) => {
	console.error (error);
});

fastify.register (proxy, {
	upstream: `http://${config.objectum.host}:${config.objectum.port}`,
	prefix: `/api/projects/${config.code}/`,
	rewritePrefix: `/projects/${config.code}/`,
	http2: false
});

fastify.register (proxy, {
	upstream: `http://${config.objectum.host}:${config.objectum.port}`,
	prefix: "/public",
	rewritePrefix: "/public",
	http2: false
});

async function start () {
	await fastify.listen (config.port);
	console.log (`server listening on ${fastify.server.address ().port}`);
};

start ().catch (err => {
	console.error (err);
	process.exit (1);
});
