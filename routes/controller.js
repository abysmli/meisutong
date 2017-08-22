var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var mv = require('mv');
var auth = require('../models/auth');
var Service = require('../models/service');
var Doc = require('../models/doc');
var Transfer = require('../models/transfer');
var Show = require('../models/show');
var ShopTutorial = require('../models/shoptutorial');
var Slide = require('../models/slide');
var Notiz = require('../models/notification');
var About = require('../models/about');

router.get('/', auth, function (req, res, next) {
    res.render('controller/index', {
        layout: 'controller/layout',
        title: '美速通控制台'
    });
});

router.get('/notification', auth, function (req, res, next) {
    Notiz.findOne({}).sort({ updated_at: -1 }).exec(function (err, notification) {
        if (err) next(err);
        else {
            res.render('controller/notification', {
                title: '编辑首页提醒',
                notification: notification || {},
                layout: 'controller/layout'
            });
        }
    });
});

router.post('/notification', auth, function (req, res, next) {
    var notification = req.body;
    notification.display = (notification.display == "true");
    Notiz.create(notification, function (err, notification) {
        if (err) next(err);
        else {
            res.redirect('/controller/notification');
        }
    });
});

router.get('/about', auth, function (req, res, next) {
    About.findOne({}).sort({ updated_at: -1 }).exec(function (err, about) {
        if (err) next(err);
        else {
            res.render('controller/about', {
                title: '编辑关于我们',
                about: about || {},
                layout: 'controller/layout'
            });
        }
    });
});

router.post('/about', auth, function (req, res, next) {
    var about = req.body;
    About.create(about, function (err, about) {
        if (err) next(err);
        else {
            res.redirect('/controller/about');
        }
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
    Service.create(service, function (err, service) {
        if (err) {
            next(err);
        }
        return res.redirect('/controller/service');
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
    }
    Service.findOneAndUpdate({
        _id: req.query.id
    }, service, function (err, service) {
        if (err) next(err);
        else {
            res.redirect('/controller/service');
        }
    });
});

router.get('/service/remove', auth, function (req, res, next) {
    Service.findByIdAndRemove(req.query.id, function (err, service) {
        if (err) next(err);
        else {
            return res.redirect('/controller/service');
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
        return res.redirect('/controller/doc');
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
    if (JSON.parse(doc.img) == "") {
        delete doc.img;
    }
    Doc.findOneAndUpdate({
        _id: req.query.id
    }, doc, function (err, doc) {
        if (err) next(err);
        else {
            res.redirect('/controller/doc');
        }
    });
});

router.get('/doc/remove', auth, function (req, res, next) {
    Doc.findByIdAndRemove(req.query.id, function (err, doc) {
        if (err) next(err);
        else {
            return res.redirect('/controller/doc');
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
        return res.redirect('/controller/shoptutorial');
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
    if (JSON.parse(shoptutorial.img) == "") {
        delete shoptutorial.img;
    }
    ShopTutorial.findOneAndUpdate({
        _id: req.query.id
    }, shoptutorial, function (err, shoptutorial) {
        if (err) next(err);
        else {
            res.redirect('/controller/shoptutorial');
        }
    });
});

router.get('/shoptutorial/remove', auth, function (req, res, next) {
    ShopTutorial.findByIdAndRemove(req.query.id, function (err, shoptutorial) {
        if (err) next(err);
        else {
            return res.redirect('/controller/shoptutorial');
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
        return res.redirect('/controller/transfer');
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
    if (JSON.parse(transfer.img) == "") {
        delete transfer.img;
    }
    Transfer.findOneAndUpdate({
        _id: req.query.id
    }, transfer, function (err, transfer) {
        if (err) next(err);
        else {
            res.redirect('/controller/transfer');
        }
    });
});

router.get('/transfer/remove', auth, function (req, res, next) {
    Transfer.findByIdAndRemove(req.query.id, function (err, transfer) {
        if (err) next(err);
        else {
            return res.redirect('/controller/transfer');
        }
    });
});

router.get('/show', auth, function (req, res, next) {
    Show.find({}).sort({ updated_at: -1 }).exec(function (err, shows) {
        res.render('controller/show', {
            layout: 'controller/layout',
            title: '买家秀',
            shows: shows
        });
    });
});

router.get('/show/add', auth, function (req, res, next) {
    res.render('controller/show-form', {
        title: '添加买家秀',
        show: {},
        layout: 'controller/layout'
    });
});

router.post('/show/add', auth, function (req, res, next) {
    var show = req.body;
    Show.create(show, function (err, show) {
        if (err) {
            next(err);
        }
        return res.redirect('/controller/show');
    });
});

router.get('/show/edit', auth, function (req, res, next) {
    Show.findById(req.query.id, function (err, show) {
        if (err) next(err);
        else {
            res.render('controller/show-form', {
                title: '编辑买家秀',
                show: show,
                layout: 'controller/layout'
            });
        }
    });
});

router.post('/show/edit', auth, function (req, res, next) {
    var show = req.body;
    if (JSON.parse(show.img) == "") {
        delete show.img;
    }
    Show.findOneAndUpdate({
        _id: req.query.id
    }, show, function (err, show) {
        if (err) next(err);
        else {
            res.redirect('/controller/show');
        }
    });
});

router.get('/show/remove', auth, function (req, res, next) {
    Show.findByIdAndRemove(req.query.id, function (err, show) {
        if (err) next(err);
        else {
            return res.redirect('/controller/show');
        }
    });
});

router.get('/slide', auth, function (req, res, next) {
    Slide.find({}).sort({ updated_at: -1 }).exec(function (err, slides) {
        res.render('controller/slide', {
            layout: 'controller/layout',
            title: '首页轮播',
            slides: slides
        });
    });
});

router.get('/slide/add', auth, function (req, res, next) {
    res.render('controller/slide-form', {
        title: '添加首页轮播',
        slide: {},
        layout: 'controller/layout'
    });
});

router.post('/slide/add', auth, function (req, res, next) {
    var slide = req.body;
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var slide = fields;
        var oldpath = files.img.path;
        var newpath = process.cwd() + '/public/images/banner/' + files.img.name;
        if (files.img.name == "") {
            Slide.create(slide, function (err, slide) {
                if (err) {
                    next(err);
                }
                return res.redirect('/controller/slide');
            });
        } else {
            mv(oldpath, newpath, { mkdirp: true }, function (err) {
                if (err) throw err;
                var slide = fields;
                slide.img = '/images/banner/' + files.img.name;
                Slide.create(slide, function (err, slide) {
                    if (err) {
                        next(err);
                    }
                    return res.redirect('/controller/slide');
                });
            });
        }
    });
});

router.get('/slide/edit', auth, function (req, res, next) {
    Slide.findById(req.query.id, function (err, slide) {
        if (err) next(err);
        else {
            res.render('controller/slide-form', {
                title: '编辑首页轮播',
                slide: slide,
                layout: 'controller/layout'
            });
        }
    });
});

router.post('/slide/edit', auth, function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var slide = fields;
        var oldpath = files.img.path;
        var newpath = process.cwd() + '/public/images/banner/' + files.img.name;
        if (files.img.name == "") {
            Slide.findOneAndUpdate({
                _id: req.query.id
            }, slide, function (err, slide) {
                if (err) next(err);
                else {
                    res.redirect('/controller/slide');
                }
            });
        } else {
            mv(oldpath, newpath, { mkdirp: true }, function (err) {
                if (err) throw err;
                slide.img = '/images/banner/' + files.img.name;
                Slide.findOneAndUpdate({
                    _id: req.query.id
                }, slide, function (err, slide) {
                    if (err) next(err);
                    else {
                        res.redirect('/controller/slide');
                    }
                });
            });
        }
    });
});

router.get('/slide/remove', auth, function (req, res, next) {
    Slide.findByIdAndRemove(req.query.id, function (err, slide) {
        if (err) next(err);
        else {
            return res.redirect('/controller/slide');
        }
    });
});

module.exports = router;
