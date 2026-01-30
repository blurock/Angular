// index.js example of organization

const catalog = require('./api/getcatalogontology');
const transaction = require('./api/runtransactions');

exports.getActivityCatalog = catalog.getActivityCatalog;
exports.processTransaction = transaction.processTransaction;
