const logger = require('bunyan').createLogger({
    name: 'geoip-web-api',
    stream: process.stdout,
    level: 'info'
});
const restify = require('restify');

const server = restify.createServer({
    name: 'geoip-web-api',
    log: logger
});

server.on('after', restify.auditLogger({
    log: logger
}));

server.get('/api/ping', function apiPing(req, res, next) {
    res.send('pong');
    return next();
});

server.get('/api/greet/:name', function apiGreet(req, res, next) {
    res.send({
        message: 'Hello world',
        name: req.params.name
    });
    return next();
})

server.listen(8080, function serverListen() {
    logger.info(`${server.name} listening at ${server.url}`);
});