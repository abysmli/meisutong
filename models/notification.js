var mongoose = require('mongoose');
var config = require('config');
mongoose.createConnection('mongodb://localhost/' + config.get('Customer.dbConfig').dbName);

var NotificationSchema = new mongoose.Schema({
    title: String,
    content: String,
    display: Boolean,
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', NotificationSchema);
