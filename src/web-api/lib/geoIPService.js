const config = require('./config');
const mmdbReader = new require('mmdb-reader')(config.settings.mmdbPath);

module.exports = {
    lookup: mmdbReader.lookup.bind(mmdbReader)
}