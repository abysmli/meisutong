var mongoose = require('mongoose');
var config = require('config');
mongoose.createConnection('mongodb://localhost/' + config.get('Customer.dbConfig').dbName);

var ShowSchema = new mongoose.Schema({
    title: String,
    name: String,
    description: String,
    transid: String,
    img: String,
    active: {
        type: Boolean,
        default: false
    },
    sort:Number,
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Show', ShowSchema);
