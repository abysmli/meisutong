var mongoose = require('mongoose');
var config = require('config');
mongoose.createConnection('mongodb://localhost/' + config.get('Customer.dbConfig').dbName);

var TransferSchema = new mongoose.Schema({
    title: String,
    path: String,
    description: String,
    content: String,
    sort:Number,
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transfer', TransferSchema);
