var mongoose = require('mongoose');
var config = require('config');
mongoose.createConnection('mongodb://localhost/' + config.get('Customer.dbConfig').dbName);

var AboutSchema = new mongoose.Schema({
    content: String,
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('About', AboutSchema);
