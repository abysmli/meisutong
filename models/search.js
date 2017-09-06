var mongoose = require('mongoose');
var config = require('config');
mongoose.createConnection('mongodb://localhost/' + config.get('Customer.dbConfig').dbName);

var SearchSchema = new mongoose.Schema({
    query: String,
    times: { type: Number, default: 0 },
    active: { type: Boolean, default: false },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Search', SearchSchema);
