var mongoose = require('mongoose');
var config = require('config');
mongoose.createConnection('mongodb://localhost/' + config.get('Customer.dbConfig').dbName);

var ServiceSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    img: String,
    sort:Number,
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Service', ServiceSchema);
