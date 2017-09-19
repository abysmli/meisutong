var mongoose = require('mongoose');
var config = require('config');
mongoose.createConnection('mongodb://localhost/' + config.get('Customer.dbConfig').dbName);

var SlideSchema = new mongoose.Schema({
    title: String,
    description: String,
    img: String,
    sort:Number,
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Slide', SlideSchema);