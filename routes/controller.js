var express = require('express');
var router = express.Router();
var auth = require('../models/auth');
var Service = require('../models/service');
var Doc = require('../models/doc');
var Transfer = require('../models/transfer');
var ShopTutorial = require('../models/shoptutorial');

router.get('/', auth, function (req, res, next) {
    res.render('controller/index', {
        layout: 'controller/layout',
        title: '美速通控制台'
    });
});

router.get('/service', auth, function (req, res, next) {
    Service.find({}).sort({ updated_at: -1 }).exec(function (err, services) {
        res.render('controller/service', {
            layout: 'controller/layout',
            title: '服务管理',
            services: services
        });
    });
});

router.get('/service/add', auth, function (req, res, next) {
    res.render('controller/service-form', {
        title: '添加服务',
        service: {},
        layout: 'controller/layout'
    });
});

router.post('/service/add', auth, function (req, res, next) {
    var service = req.body;
    service.img = JSON.parse(service.img);
    console.log(service.img);
    Service.create(service, function (err, service) {
        if (err) {
            next(err);
        }
        return res.redirect('/controller/');
    });
});

router.get('/service/edit', auth, function (req, res, next) {
    Service.findById(req.query.id, function (err, service) {
        if (err) next(err);
        else {
            res.render('controller/service-form', {
                title: '编辑服务',
                service: service,
                layout: 'controller/layout'
            });
        }
    });
});

router.post('/service/edit', auth, function (req, res, next) {
    var service = req.body;
    if (JSON.parse(service.img) == "") {
        delete service.img;
    } else {
        service.img = JSON.parse(service.img);
    }
    console.log(service.img);
    Service.findOneAndUpdate({
        _id: req.query.id
    }, service, function (err, service) {
        if (err) next(err);
        else {
            res.redirect('/controller/');
        }
    });
});

router.get('/service/remove', auth, function (req, res, next) {
    Service.findByIdAndRemove(req.query.id, function (err, service) {
        if (err) next(err);
        else {
            return res.redirect('/controller/');
        }
    });
});

router.get('/doc', auth, function (req, res, next) {
    Doc.find({}).sort({ updated_at: -1 }).exec(function (err, docs) {
        res.render('controller/doc', {
            layout: 'controller/layout',
            title: '操作指南',
            docs: docs
        });
    });
});

router.get('/doc/add', auth, function (req, res, next) {
    res.render('controller/doc-form', {
        title: '添加操作指南',
        doc: {},
        layout: 'controller/layout'
    });
});

router.post('/doc/add', auth, function (req, res, next) {
    var doc = req.body;
    Doc.create(doc, function (err, doc) {
        if (err) {
            next(err);
        }
        return res.redirect('/controller/');
    });
});

router.get('/doc/edit', auth, function (req, res, next) {
    Doc.findById(req.query.id, function (err, doc) {
        if (err) next(err);
        else {
            res.render('controller/doc-form', {
                title: '编辑操作指南',
                doc: doc,
                layout: 'controller/layout'
            });
        }
    });
});

router.post('/doc/edit', auth, function (req, res, next) {
    var doc = req.body;
    Doc.findOneAndUpdate({
        _id: req.query.id
    }, doc, function (err, doc) {
        if (err) next(err);
        else {
            res.redirect('/controller/');
        }
    });
});

router.get('/doc/remove', auth, function (req, res, next) {
    Doc.findByIdAndRemove(req.query.id, function (err, doc) {
        if (err) next(err);
        else {
            return res.redirect('/controller/');
        }
    });
});

router.get('/shoptutorial', auth, function (req, res, next) {
    ShopTutorial.find({}).sort({ updated_at: -1 }).exec(function (err, shoptutorials) {
        res.render('controller/shoptutorial', {
            layout: 'controller/layout',
            title: '海淘教程',
            shoptutorials: shoptutorials,
        });
    });
});



router.get('/shoptutorial/add', auth, function (req, res, next) {
    res.render('controller/shoptutorial-form', {
        title: '添加海淘教程',
        shoptutorial: {},
        layout: 'controller/layout'
    });
});

router.post('/shoptutorial/add', auth, function (req, res, next) {
    var shoptutorial = req.body;
    ShopTutorial.create(shoptutorial, function (err, shoptutorial) {
        if (err) {
            next(err);
        }
        return res.redirect('/controller/');
    });
});

router.get('/shoptutorial/edit', auth, function (req, res, next) {
    ShopTutorial.findById(req.query.id, function (err, shoptutorial) {
        if (err) next(err);
        else {
            res.render('controller/shoptutorial-form', {
                title: '编辑海淘教程',
                shoptutorial: shoptutorial,
                layout: 'controller/layout'
            });
        }
    });
});

router.post('/shoptutorial/edit', auth, function (req, res, next) {
    var shoptutorial = req.body;
    ShopTutorial.findOneAndUpdate({
        _id: req.query.id
    }, shoptutorial, function (err, shoptutorial) {
        if (err) next(err);
        else {
            res.redirect('/controller/');
        }
    });
});

router.get('/shoptutorial/remove', auth, function (req, res, next) {
    ShopTutorial.findByIdAndRemove(req.query.id, function (err, shoptutorial) {
        if (err) next(err);
        else {
            return res.redirect('/controller/');
        }
    });
});

router.get('/transfer', auth, function (req, res, next) {
    Transfer.find({}).sort({ updated_at: -1 }).exec(function (err, transfers) {
        res.render('controller/transfer', {
            layout: 'controller/layout',
            title: '转运路线',
            transfers: transfers
        });
    });
});

router.get('/transfer/add', auth, function (req, res, next) {
    res.render('controller/transfer-form', {
        title: '添加转运路线',
        transfer: {},
        layout: 'controller/layout'
    });
});

router.post('/transfer/add', auth, function (req, res, next) {
    var transfer = req.body;
    Transfer.create(transfer, function (err, transfer) {
        if (err) {
            next(err);
        }
        return res.redirect('/controller/');
    });
});

router.get('/transfer/edit', auth, function (req, res, next) {
    Transfer.findById(req.query.id, function (err, transfer) {
        if (err) next(err);
        else {
            res.render('controller/transfer-form', {
                title: '编辑转运路线',
                transfer: transfer,
                layout: 'controller/layout'
            });
        }
    });
});

router.post('/transfer/edit', auth, function (req, res, next) {
    var transfer = req.body;
    Transfer.findOneAndUpdate({
        _id: req.query.id
    }, transfer, function (err, transfer) {
        if (err) next(err);
        else {
            res.redirect('/controller/');
        }
    });
});

router.get('/transfer/remove', auth, function (req, res, next) {
    Transfer.findByIdAndRemove(req.query.id, function (err, transfer) {
        if (err) next(err);
        else {
            return res.redirect('/controller/');
        }
    });
});

module.exports = router;
