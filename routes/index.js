var express = require('express');
var router = express.Router();
var Service = require('../models/service');
var Doc = require('../models/doc');
var Transfer = require('../models/transfer');
var ShopTutorial = require('../models/shoptutorial');

/* GET home page. */
router.get('/', function (req, res, next) {
  Service.find({}).sort({ updated_at: 1 }).exec(function (err, services) {
    Doc.find({}).sort({ updated_at: -1 }).exec(function (err, docs) {
      Transfer.find({}).sort({ updated_at: -1 }).exec(function (err, transfers) {
        ShopTutorial.find({}).sort({ updated_at: -1 }).exec(function (err, shoptutorials) {
          var paths = [], path;
          transfers.forEach(function (transfer, index) {
            if (path != transfer.path) {
              paths.push(transfer.path);
              path = transfer.path;
            }
          });
          res.render('frontend/index', {
            title: '德淘转运_德淘之家_欧洲购物_欧淘货运德淘网|美速通转运——你身边最好的专业海淘转运公司',
            description: "美速通转运网-致力于成为中国最专业的转运公司！本公司位于洛杉矶，主要经营北美到中国大陆的传统国际快递、以及国际电子商务仓储、物流及相关业务，为德淘人士、欧洲购物、欧淘、德淘转运、德淘海外代购公司、以及德淘代购个人提供一个优秀的转运平台。",
            keywords: "德淘转运，德淘，欧洲购物,欧淘，德淘之家，德淘网，美速通，德淘攻略",
            services: services,
            docs: docs,
            paths: paths,
            transfers: transfers,
            shoptutorials: shoptutorials
          });
        });
      });
    });
  });
});

router.get('/service', function (req, res, next) {
  Service.findById(req.query.id, function (err, service) {
    Service.find({}).sort({ updated_at: 1 }).exec(function (err, services) {
      Doc.find({}).sort({ updated_at: -1 }).exec(function (err, docs) {
        Transfer.find({}).sort({ updated_at: -1 }).exec(function (err, transfers) {
          ShopTutorial.find({}).sort({ updated_at: -1 }).exec(function (err, shoptutorials) {
            var paths = [], path;
            transfers.forEach(function (transfer, index) {
              if (path != transfer.path) {
                paths.push(transfer.path);
                path = transfer.path;
              }
            });
            res.render('frontend/service', {
              title: service.title,
              description: service.description,
              keywords: "德淘转运，德淘，欧洲购物,欧淘，德淘之家，德淘网，美速通，德淘攻略",
              service: service, services: services,
              docs: docs,
              paths: paths,
              transfers: transfers,
              shoptutorials: shoptutorials
            });
          });
        });
      });
    });
  });
});

router.get('/doc', function (req, res, next) {
  Doc.findById(req.query.id, function (err, doc) {
    Service.find({}).sort({ updated_at: 1 }).exec(function (err, services) {
      Doc.find({}).sort({ updated_at: -1 }).exec(function (err, docs) {
        Transfer.find({}).sort({ updated_at: -1 }).exec(function (err, transfers) {
          ShopTutorial.find({}).sort({ updated_at: -1 }).exec(function (err, shoptutorials) {
            var paths = [], path;
            transfers.forEach(function (transfer, index) {
              if (path != transfer.path) {
                paths.push(transfer.path);
                path = transfer.path;
              }
            });
            res.render('frontend/doc', {
              title: doc.title,
              description: doc.description,
              keywords: "德淘转运，德淘，欧洲购物,欧淘，德淘之家，德淘网，美速通，德淘攻略",
              doc: doc,
              docs: docs,
              paths: paths,
              transfers: transfers,
              shoptutorials: shoptutorials
            });
          });
        });
      });
    });
  });
});

router.get('/transfer', function (req, res, next) {
  Transfer.findById(req.query.id, function (err, transfer) {
    Service.find({}).sort({ updated_at: 1 }).exec(function (err, services) {
      Doc.find({}).sort({ updated_at: -1 }).exec(function (err, docs) {
        Transfer.find({}).sort({ updated_at: -1 }).exec(function (err, transfers) {
          ShopTutorial.find({}).sort({ updated_at: -1 }).exec(function (err, shoptutorials) {
            var paths = [], path;
            transfers.forEach(function (transfer, index) {
              if (path != transfer.path) {
                paths.push(transfer.path);
                path = transfer.path;
              }
            });
            res.render('frontend/transfer', {
              title: transfer.title,
              description: transfer.description,
              keywords: "德淘转运，德淘，欧洲购物,欧淘，德淘之家，德淘网，美速通，德淘攻略",
              transfer: transfer,
              docs: docs,
              paths: paths,
              transfers: transfers,
              shoptutorials: shoptutorials
            });
          });
        });
      });
    });
  });
});

router.get('/shoptutorial', function (req, res, next) {
  ShopTutorial.findById(req.query.id, function (err, shoptutorial) {
    Service.find({}).sort({ updated_at: 1 }).exec(function (err, services) {
      Doc.find({}).sort({ updated_at: -1 }).exec(function (err, docs) {
        Transfer.find({}).sort({ updated_at: -1 }).exec(function (err, transfers) {
          ShopTutorial.find({}).sort({ updated_at: -1 }).exec(function (err, shoptutorials) {
            var paths = [], path;
            transfers.forEach(function (transfer, index) {
              if (path != transfer.path) {
                paths.push(transfer.path);
                path = transfer.path;
              }
            });
            res.render('frontend/shoptutorial', {
              title: shoptutorial.title,
              description: shoptutorial.description,
              keywords: "德淘转运，德淘，欧洲购物,欧淘，德淘之家，德淘网，美速通，德淘攻略",
              shoptutorial: shoptutorial,
              docs: docs,
              paths: paths,
              transfers: transfers,
              shoptutorials: shoptutorials
            });
          });
        });
      });
    });
  });
});

module.exports = router;
