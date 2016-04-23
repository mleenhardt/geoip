const path = require('path');
const settings  = require(path.join(path.dirname(require.main.filename), 'settings.json'));
const logger = require('bunyan').createLogger({
    name: 'geoip-web-api',
    stream: process.stdout,
    level: 'info'
});

module.exports = {
    settings: settings,
    logger: logger
};