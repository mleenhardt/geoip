const config = require('./lib/config');
const geoIPService = require('./lib/geoIPService');
const restify = require('restify');

const server = restify.createServer({
    name: 'geoip-web-api',
    log: config.logger
});

server.on('after', restify.auditLogger({
    log: config.logger
}));

server.on('uncaughtException', function(req, res, route, err) {
    config.logger.error(err);
})

server.get('/api/lookup/:ip', function ipLookup(req, res, next) {
    var result = {};
    var ip = geoIPService.lookup(req.params.ip);
    if (ip) {
        if (ip.continent) {
            result.continent = {
                code: ip.continent.code,
                name: ip.continent.names.en
            }
        }
        if (ip.country) {
            result.country = {
                iso_code: ip.country.iso_code,
                name: ip.country.names.en
            }
        }
        if (ip.subdivisions && ip.subdivisions.length) {
            result.country.subdivision = {
                iso_code: ip.subdivisions[0].iso_code,
                name: ip.subdivisions[0].names.en
            }
        }
        if (ip.city) {
            result.city = {
                name: ip.city.names.en,
                postal_code: ip.postal.code
            }
        }
        if (ip.location) {
            result.location = ip.location;
        }
    }

    res.charSet('utf-8');
    res.send(result || {});
    return next();
});

server.listen(8080, function serverListen() {
    config.logger.info(`${server.name} listening at ${server.url}`);
});