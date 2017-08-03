var mongoose = require('mongoose');
var config = require('config');
mongoose.createConnection('mongodb://localhost/' + config.get('Customer.dbConfig').dbName);

var DocSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Doc', DocSchema);
