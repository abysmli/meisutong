var express = require('express');
var router = express.Router();
var Show = require('../models/show');

router.get('/', function (req, res, next) {
    res.render('show/show', {
        layout: null,
        title: '买家秀'
    });
});

router.post('/', function (req, res, next) {
    var show = req.body;
    Show.create(show, function (err, show) {
        if (err) {
            next(err);
        }
        return res.redirect('/');
    });
});

module.exports = router;