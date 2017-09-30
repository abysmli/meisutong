var mongoose = require('mongoose');
var config = require('config');
mongoose.createConnection('mongodb://localhost/' + config.get('Customer.dbConfig').dbName);

var TrackSchema = new mongoose.Schema({
    trackingnumber: String,
    code: String,
    carrier: String,
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Track', TrackSchema);
