var express = require('express');
var router = express.Router();
var request = require('request');
var Service = require('../models/service');
var Doc = require('../models/doc');
var Transfer = require('../models/transfer');
var ShopTutorial = require('../models/shoptutorial');
var Show = require('../models/show');
var Slide = require('../models/slide');
var Notiz = require('../models/notification');
var About = require('../models/about');
var Search = require('../models/search');
var sendMail = require('../utils/sendMail');
var EmailSender = new sendMail();
var allhaha = require('../utils/allhahaAPI');
var Allhaha = new allhaha("e3016002-f1c1-47e1-b0e4-3770415e2797", "47c0ae5b-d9ee-4ebb-ba29-79caf197eb69");

/* GET home page. */
router.get('/', function (req, res, next) {
  Service.find({}).sort({ updated_at: 1 }).exec(function (err, services) {
    Doc.find({}).sort({ updated_at: -1 }).exec(function (err, docs) {
      Transfer.find({}).sort({ updated_at: -1 }).exec(function (err, transfers) {
        ShopTutorial.find({}).sort({ updated_at: -1 }).exec(function (err, shoptutorials) {
          Show.find({ active: true }).sort({ updated_at: -1 }).exec(function (err, shows) {
            Slide.find({}).sort({ updated_at: -1 }).exec(function (err, slides) {
              Notiz.findOne({}).sort({ updated_at: -1 }).exec(function (err, notification) {
                Search.find({ active: true }).sort({ times: -1 }).limit(20).exec(function (err, hotsearchs) {
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
                    services: services || [],
                    docs: docs,
                    paths: paths,
                    transfers: transfers,
                    shoptutorials: shoptutorials,
                    shows: shows,
                    slides: slides,
                    notification: notification || {},
                    hotsearchs: hotsearchs
                  });
                });
              });
            });
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
            Search.find({ active: true }).sort({ times: -1 }).limit(20).exec(function (err, hotsearchs) {
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
                shoptutorials: shoptutorials,
                hotsearchs: hotsearchs,
              });
            });
          });
        });
      });
    });
  });
});

router.get('/doc', function (req, res, next) {
  Doc.findById(req.query.id, function (err, doc) {
    Doc.find({}).sort({ updated_at: -1 }).exec(function (err, docs) {
      Transfer.find({}).sort({ updated_at: -1 }).exec(function (err, transfers) {
        ShopTutorial.find({}).sort({ updated_at: -1 }).exec(function (err, shoptutorials) {
          Search.find({ active: true }).sort({ times: -1 }).limit(20).exec(function (err, hotsearchs) {
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
              shoptutorials: shoptutorials,
              hotsearchs: hotsearchs
            });
          });
        });
      });
    });
  });
});

router.get('/transfer', function (req, res, next) {
  Transfer.findById(req.query.id, function (err, transfer) {
    Doc.find({}).sort({ updated_at: -1 }).exec(function (err, docs) {
      Transfer.find({}).sort({ updated_at: -1 }).exec(function (err, transfers) {
        ShopTutorial.find({}).sort({ updated_at: -1 }).exec(function (err, shoptutorials) {
          Search.find({ active: true }).sort({ times: -1 }).limit(20).exec(function (err, hotsearchs) {
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
              shoptutorials: shoptutorials,
              hotsearchs: hotsearchs
            });
          });
        });
      });
    });
  });
});

router.get('/shoptutorial', function (req, res, next) {
  if (req.query.id) {
    ShopTutorial.findById(req.query.id, function (err, shoptutorial) {
      Doc.find({}).sort({ updated_at: -1 }).exec(function (err, docs) {
        Transfer.find({}).sort({ updated_at: -1 }).exec(function (err, transfers) {
          ShopTutorial.find({}).sort({ updated_at: -1 }).exec(function (err, shoptutorials) {
            Search.find({ active: true }).sort({ times: -1 }).limit(20).exec(function (err, hotsearchs) {
              var paths = [], path;
              transfers.forEach(function (transfer, index) {
                if (path != transfer.path) {
                  paths.push(transfer.path);
                  path = transfer.path;
                }
              });
              res.render('frontend/shoptutorial-details', {
                title: shoptutorial.ShopTitle,
                description: shoptutorial.Description,
                keywords: "德淘转运，德淘，欧洲购物,欧淘，德淘之家，德淘网，美速通，德淘攻略",
                shoptutorial: shoptutorial,
                docs: docs,
                paths: paths,
                transfers: transfers,
                shoptutorials: shoptutorials,
                hotsearchs: hotsearchs
              });
            });
          });
        });
      });
    });
  } else {
    Doc.find({}).sort({ updated_at: -1 }).exec(function (err, docs) {
      Transfer.find({}).sort({ updated_at: -1 }).exec(function (err, transfers) {
        ShopTutorial.find({}).sort({ updated_at: -1 }).exec(function (err, shoptutorials) {
          Search.find({ active: true }).sort({ times: -1 }).limit(20).exec(function (err, hotsearchs) {
            let paths = [], path, categorys = [], category;
            transfers.forEach(function (transfer, index) {
              if (path != transfer.path) {
                paths.push(transfer.path);
                path = transfer.path;
              }
            });
            shoptutorials.forEach((shop, index) => {
              if (category != shop.Category) {
                categorys.push(shop.Category);
                category = shop.Category;
              }
            });
            res.render('frontend/shoptutorial', {
              title: "海淘教程",
              description: "海淘教程",
              keywords: "德淘转运，德淘，欧洲购物,欧淘，德淘之家，德淘网，美速通，德淘攻略",
              docs: docs,
              paths: paths,
              transfers: transfers,
              categorys: categorys,
              shoptutorials: shoptutorials,
              hotsearchs: hotsearchs
            });
          });
        });
      });
    });
  }
});

router.get('/aboutus', function (req, res, next) {
  ShopTutorial.findById(req.query.id, function (err, shoptutorial) {
    Doc.find({}).sort({ updated_at: -1 }).exec(function (err, docs) {
      Transfer.find({}).sort({ updated_at: -1 }).exec(function (err, transfers) {
        ShopTutorial.find({}).sort({ updated_at: -1 }).exec(function (err, shoptutorials) {
          About.findOne({}).sort({ updated_at: -1 }).exec(function (err, about) {
            Search.find({ active: true }).sort({ times: -1 }).limit(20).exec(function (err, hotsearchs) {
              if (err) next(err);
              else {
                var paths = [], path;
                transfers.forEach(function (transfer, index) {
                  if (path != transfer.path) {
                    paths.push(transfer.path);
                    path = transfer.path;
                  }
                });
                res.render('frontend/about', {
                  title: '关于我们',
                  description: "美速通转运网-致力于成为中国最专业的转运公司！本公司位于洛杉矶，主要经营北美到中国大陆的传统国际快递、以及国际电子商务仓储、物流及相关业务，为德淘人士、欧洲购物、欧淘、德淘转运、德淘海外代购公司、以及德淘代购个人提供一个优秀的转运平台。",
                  keywords: "德淘转运，德淘，欧洲购物,欧淘，德淘之家，德淘网，美速通，德淘攻略",
                  shoptutorial: shoptutorial,
                  docs: docs,
                  paths: paths,
                  transfers: transfers,
                  shoptutorials: shoptutorials,
                  hotsearchs: hotsearchs,
                  about: about || {},
                });
              }
            });
          });
        });
      });
    });
  });
});

router.get('/comingsoon', function (req, res, next) {
  res.render('frontend/comingsoon', {
    title: '即将到来',
    description: "美速通转运网-致力于成为中国最专业的转运公司！本公司位于洛杉矶，主要经营北美到中国大陆的传统国际快递、以及国际电子商务仓储、物流及相关业务，为德淘人士、欧洲购物、欧淘、德淘转运、德淘海外代购公司、以及德淘代购个人提供一个优秀的转运平台。",
    keywords: "德淘转运，德淘，欧洲购物,欧淘，德淘之家，德淘网，美速通，德淘攻略",
    layout: null
  });
});

router.all('/searchProduct', function (req, res, next) {
  let keywords = req.body.search || req.query.search;
  Allhaha.searchProduct(keywords, (err, products) => {
    ShopTutorial.findById(req.query.id, function (err, shoptutorial) {
      Doc.find({}).sort({ updated_at: -1 }).exec(function (err, docs) {
        Transfer.find({}).sort({ updated_at: -1 }).exec(function (err, transfers) {
          ShopTutorial.find({}).sort({ updated_at: -1 }).exec(function (err, shoptutorials) {
            Search.find({ active: true }).sort({ times: -1 }).limit(20).exec(function (err, hotsearchs) {
              if (err) next(err);
              else {
                var paths = [], path;
                transfers.forEach(function (transfer, index) {
                  if (path != transfer.path) {
                    paths.push(transfer.path);
                    path = transfer.path;
                  }
                });
                Search.findOne({ query: keywords }, function (err, search) {
                  if (search) {
                    search.times = parseInt(search.times) + 1;
                  } else {
                    search = new Search({
                      query: keywords,
                      times: 1
                    });
                  }
                  search.save(function (err) { });
                });
                res.render('frontend/productsearch', {
                  title: '产品搜索',
                  description: "美速通转运网-致力于成为中国最专业的转运公司！本公司位于洛杉矶，主要经营北美到中国大陆的传统国际快递、以及国际电子商务仓储、物流及相关业务，为德淘人士、欧洲购物、欧淘、德淘转运、德淘海外代购公司、以及德淘代购个人提供一个优秀的转运平台。",
                  keywords: "德淘转运，德淘，欧洲购物,欧淘，德淘之家，德淘网，美速通，德淘攻略",
                  shoptutorial: shoptutorial,
                  docs: docs,
                  paths: paths,
                  transfers: transfers,
                  shoptutorials: shoptutorials,
                  hotsearchs: hotsearchs,
                  products: products || [],
                });
              }
            });
          });
        });
      });
    });
  });
});

router.get('/currencyExchange', function (req, res, next) {
  request({
    url: "https://www.exchangerate-api.com/EUR/CNY?k=2d8c6e862f92ff48d10fa915"
  }, function (err, response, data) {
    res.send(parseFloat(data).toFixed(4));
  });
});

router.post('/track', function (req, res, next) {
  request.post({ url: 'http://de.99mst.com/cgi-bin/GInfo.dll', form: req.body, json: true }, function (err, httpResponse, body) {
    if (body) {
      if (body.ReturnValue == '100') {
        let trackingnumber = body.Response_Info.transNbr;
        let code, carrier;
        if (trackingnumber.length == 13) {
          code = 'china-post';
          carrier = "中国邮政";
        } else if (trackingnumber.length == 10) {
          code = 'deppon';
          carrier = "德邦物流";
        } else if (trackingnumber.length == 14 || (trackingnumber.charAt(0) == '2' && trackingnumber.length == 12)) {
          code = 'ane66';
          carrier = "安能物流";
        } else if (trackingnumber.length == 12) {
          code = 'sf-express';
          carrier = "顺丰快递";
        } else {
          code = '';
          carrier = '';
        }
        body.ChinaPart = {
          trackingnumber: trackingnumber,
          code: code,
          carrier: carrier
        };
        request.post({
          url: 'https://api.trackingmore.com/v2/trackings/post', json: true, body: {
            'tracking_number': trackingnumber,
            'carrier_code': code
          }, headers: {
            'Content-Type': 'application/json',
            'Trackingmore-Api-Key': '464031ea-ff09-4a31-8ec7-b07e99d5ecee'
          }
        }, function (err, httpResponse, responseBody) {
          setTimeout(() => {
            request.get({
              url: 'http://api.trackingmore.com/v2/trackings/' + code + '/' + trackingnumber, json: true, headers: {
                'Content-Type': 'application/json',
                'Trackingmore-Api-Key': '464031ea-ff09-4a31-8ec7-b07e99d5ecee',
              }
            }, function (err, httpResponse, _body) {
              if (_body.data.origin_info) {
                if (_body.data.origin_info.trackinfo) {
                  _body.data.origin_info.trackinfo.reverse()
                  body.ChinaPart.info = _body.data;
                }
              }
              res.json(body);
            });
          }, 7000);
        });
      } else {
        res.json(body);
      }
    } else {
      res.json(body);
    }
  });
});

router.get('/contactus', function (req, res, next) {
  ShopTutorial.findById(req.query.id, function (err, shoptutorial) {
    Doc.find({}).sort({ updated_at: -1 }).exec(function (err, docs) {
      Transfer.find({}).sort({ updated_at: -1 }).exec(function (err, transfers) {
        ShopTutorial.find({}).sort({ updated_at: -1 }).exec(function (err, shoptutorials) {
          Search.find({ active: true }).sort({ times: -1 }).limit(20).exec(function (err, hotsearchs) {
            if (err) next(err);
            else {
              var paths = [], path;
              transfers.forEach(function (transfer, index) {
                if (path != transfer.path) {
                  paths.push(transfer.path);
                  path = transfer.path;
                }
              });
              res.render('frontend/contactus', {
                title: '联系我们',
                description: "美速通转运网-致力于成为中国最专业的转运公司！本公司位于洛杉矶，主要经营北美到中国大陆的传统国际快递、以及国际电子商务仓储、物流及相关业务，为德淘人士、欧洲购物、欧淘、德淘转运、德淘海外代购公司、以及德淘代购个人提供一个优秀的转运平台。",
                keywords: "德淘转运，德淘，欧洲购物,欧淘，德淘之家，德淘网，美速通，德淘攻略",
                shoptutorial: shoptutorial,
                docs: docs,
                paths: paths,
                transfers: transfers,
                shoptutorials: shoptutorials,
                hotsearchs: hotsearchs,
              });
            }
          });
        });
      });
    });
  });
});

router.post('/contactus', function (req, res, next) {
  var feedback = req.body;
  EmailSender.send({
    to: feedback.email,
    subject: '感谢您的留言',
    template: 'feedback',
    content: {
      title: "感谢您的留言",
      data: {
        name: feedback.name,
        email: feedback.email,
        phone: feedback.phone,
        category: feedback.category,
        subject: feedback.subject,
        message: feedback.message
      }
    }
  }, function (err, info) { });
  EmailSender.send({
    to: 'service@cope-express.de',
    subject: '收到留言，请尽快回复',
    template: 'feedbackToUs',
    content: {
      title: "收到留言，请尽快回复",
      data: {
        name: feedback.name,
        email: feedback.email,
        phone: feedback.phone,
        category: feedback.category,
        subject: feedback.subject,
        message: feedback.message
      }
    }
  }, function (err, info) { res.redirect("/"); });
});

router.get('/carriers', (req, res, next) => {
  request.get({
    url: 'https://api.trackingmore.com/v2/carriers', json: true, headers: {
      'Content-Type': 'application/json',
      'Trackingmore-Api-Key': '464031ea-ff09-4a31-8ec7-b07e99d5ecee',
      'Lang': 'cn'
    }
  }, function (err, httpResponse, body) {
    res.json(body);
  });
});



module.exports = router;
