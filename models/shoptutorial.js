var mongoose = require('mongoose');
var config = require('config');
mongoose.createConnection('mongodb://localhost/' + config.get('Customer.dbConfig').dbName);

var ShopTutorialSchema = new mongoose.Schema({
    ShopId: String,
    ShopTitle: String,
    Description: String,
    Category: String,
    Logo: String,
    LogoURL: String,
    ProductCount: String,
    ProgramId: String,
    ShortURL: String,
    Tutorial: String,
    sort:Number,
	updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ShopTutorial', ShopTutorialSchema);