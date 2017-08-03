var mongoose = require('mongoose');
var config = require('config');
mongoose.createConnection('mongodb://localhost/' + config.get('Customer.dbConfig').dbName);

var ShopTutorialSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    img: String,
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ShopTutorial', ShopTutorialSchema);
