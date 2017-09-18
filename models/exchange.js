var mongoose = require('mongoose');
var config = require('config');
mongoose.createConnection('mongodb://localhost/' + config.get('Customer.dbConfig').dbName);

var ExchangeSchema = new mongoose.Schema({
    from: String,
    to: String,
    rate: Number,
    timestamp: Number,
});

module.exports = mongoose.model('Exchange', ExchangeSchema);
