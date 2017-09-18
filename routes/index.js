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
var Exchange = require('../models/exchange');
var sendMail = require('../utils/sendMail');
var EmailSender = new sendMail();
var allhaha = require('../utils/allhahaAPI');
var Allhaha = new allhaha("e3016002-f1c1-47e1-b0e4-3770415e2797", "47c0ae5b-d9ee-4ebb-ba29-79caf197eb69");
var TrackingmoreAPIKey = "464031ea-ff09-4a31-8ec7-b07e99d5ecee";

/* GET home page. */
router.get('/', function (req, res, next) {
  Service.find({}).sort({ updated_at: 1 }).exec(function (err, services) {
    Doc.find({}).sort({ updated_at: -1 }).exec(function (err, docs) {
      Transfer.find({}).sort({ updated_at: -1 }).exec(function (err, transfers) {
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

router.get('/service', function (req, res, next) {
  Service.findById(req.query.id, function (err, service) {
    Service.find({}).sort({ updated_at: 1 }).exec(function (err, services) {
      Doc.find({}).sort({ updated_at: -1 }).exec(function (err, docs) {
        Transfer.find({}).sort({ updated_at: -1 }).exec(function (err, transfers) {
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
              hotsearchs: hotsearchs,
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
            hotsearchs: hotsearchs
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
            hotsearchs: hotsearchs
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
              hotsearchs: hotsearchs
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
  Doc.find({}).sort({ updated_at: -1 }).exec(function (err, docs) {
    Transfer.find({}).sort({ updated_at: -1 }).exec(function (err, transfers) {
      Search.find({ active: true }).sort({ times: -1 }).limit(20).exec(function (err, hotsearchs) {
        About.findOne({}).sort({ updated_at: -1 }).exec(function (err, about) {
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
              docs: docs,
              paths: paths,
              transfers: transfers,
              hotsearchs: hotsearchs,
              about: about || {},
            });
          }
        });
      });
    });
  });
});

router.get('/login', function (req, res, next) {
  Service.find({}).sort({ updated_at: 1 }).exec(function (err, services) {
    Doc.find({}).sort({ updated_at: -1 }).exec(function (err, docs) {
      Transfer.find({}).sort({ updated_at: -1 }).exec(function (err, transfers) {
        Search.find({ active: true }).sort({ times: -1 }).limit(20).exec(function (err, hotsearchs) {
          var paths = [], path;
          transfers.forEach(function (transfer, index) {
            if (path != transfer.path) {
              paths.push(transfer.path);
              path = transfer.path;
            }
          });
          res.render('frontend/login', {
            title: '登录系统',
            description: "美速通转运网-致力于成为中国最专业的转运公司！本公司位于洛杉矶，主要经营北美到中国大陆的传统国际快递、以及国际电子商务仓储、物流及相关业务，为德淘人士、欧洲购物、欧淘、德淘转运、德淘海外代购公司、以及德淘代购个人提供一个优秀的转运平台。",
            keywords: "德淘转运，德淘，欧洲购物,欧淘，德淘之家，德淘网，美速通，德淘攻略",
            services: services,
            docs: docs,
            paths: paths,
            transfers: transfers,
            hotsearchs: hotsearchs,
            layout: null
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
  Doc.find({}).sort({ updated_at: -1 }).exec(function (err, docs) {
    Transfer.find({}).sort({ updated_at: -1 }).exec(function (err, transfers) {
      Search.find({ active: true }).sort({ times: -1 }).limit(20).exec(function (err, hotsearchs) {
        Allhaha.searchProduct(keywords, (err, products) => {
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
              docs: docs,
              paths: paths,
              transfers: transfers,
              hotsearchs: hotsearchs,
              products: products || [],
            });
          }
        });
      });
    });
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
          code = 'sfb2c';
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
          url: 'http://chaoxun-international.com:3000/Request-Transfer-Post', json: true, body: body.ChinaPart
        }, function (err, httpResponse, responseBody) {
          console.log(responseBody);
          setTimeout(() => {
            request.post({
              url: 'http://chaoxun-international.com:3000/Request-Transfer-Tracking', json: true, body: body.ChinaPart
            }, function (err, httpResponse, _body) {
              console.log(_body);
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
  Doc.find({}).sort({ updated_at: -1 }).exec(function (err, docs) {
    Transfer.find({}).sort({ updated_at: -1 }).exec(function (err, transfers) {
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
            docs: docs,
            paths: paths,
            transfers: transfers,
            hotsearchs: hotsearchs,
          });
        }
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

router.get('/EMS_MODEL/CN/S/TOP.HTM', (req, res, next) => {
  res.render('frontend/top', {
    title: '用户中心菜单',
    description: "美速通转运网-致力于成为中国最专业的转运公司！本公司位于洛杉矶，主要经营北美到中国大陆的传统国际快递、以及国际电子商务仓储、物流及相关业务，为德淘人士、欧洲购物、欧淘、德淘转运、德淘海外代购公司、以及德淘代购个人提供一个优秀的转运平台。",
    keywords: "德淘转运，德淘，欧洲购物,欧淘，德淘之家，德淘网，美速通，德淘攻略",
  });
});

router.get('/header', (req, res, next) => {
  res.json(req.headers);
});

router.get('/carriers', (req, res, next) => {
  request.post({
    url: 'http://chaoxun-international.com:3000/Request-Transfer-Carriers', json: true, body: {}
  }, function (err, httpResponse, body) {
    res.json(body);
  });
});

router.post('/Request-Transfer-Post', (req, res, next) => {
  request.post({
    url: 'http://api.trackingmore.com/v2/trackings/post', json: true, body: {
      'tracking_number': req.body.trackingnumber,
      'carrier_code': req.body.code
    }, headers: {
      'Content-Type': 'application/json',
      'Trackingmore-Api-Key': TrackingmoreAPIKey
    }
  }, function (err, httpResponse, body) {
    res.json(body);
  });
});

router.post('/Request-Transfer-Tracking', (req, res, next) => {

  request.get({
    url: 'http://api.trackingmore.com/v2/trackings/' + req.body.code + '/' + req.body.trackingnumber, json: true, headers: {
      'Content-Type': 'application/json',
      'Trackingmore-Api-Key': TrackingmoreAPIKey,
    }
  }, function (err, httpResponse, body) {
    res.json(body);
  });
});

router.post('/Request-Transfer-Carriers', (req, res, next) => {
  request.get({
    url: 'http://api.trackingmore.com/v2/carriers', json: true, headers: {
      'Content-Type': 'application/json',
      'Trackingmore-Api-Key': TrackingmoreAPIKey,
      'Lang': 'cn'
    }
  }, function (err, httpResponse, body) {
    res.json(body);
  });
});

router.get('/cgi-bin/GInfo.dll', (req, res, next) => {
  var body = {
    'MfcISAPICommand': 'EmsApiTrack',
    'cno': req.query.cno,
    'ntype': "10010000",
    'cp': '65001'
  };
  request.post({ url: 'http://de.99mst.com/cgi-bin/GInfo.dll', form: body, json: true }, function (err, httpResponse, body) {
    if (body) {
      var statusCode = {
        '-9': '错误',
        '-5': '错误',
        '-4': '错误',
        '-3': '不支持的运单号',
        '-2': '没有结果',
        '0': '处理中',
        '1': '已发出',
        '2': '运输中',
        '3': '已抵达',
        '4': '错误',
        '5': '进入海关',
        '6': '地址错误',
        '7': '包裹丢失',
        '8': '包裹寄回发送地',
        '9': '错误',
        '10': '错误',
      }
      if (body.ReturnValue == '100') {
        body.Response_Info.statusDetails = statusCode[body.Response_Info.status];
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
          code = 'sfb2c';
          carrier = "顺丰快递";
        } else {
          code = '';
          carrier = '未知物流';
        }
        body.ChinaPart = {
          trackingnumber: trackingnumber,
          code: code,
          carrier: carrier
        };
        request.post({
          url: 'http://chaoxun-international.com:3000/Request-Transfer-Post', json: true, body: body.ChinaPart
        }, function (err, httpResponse, responseBody) {
          console.log(responseBody);
          setTimeout(() => {
            request.post({
              url: 'http://chaoxun-international.com:3000/Request-Transfer-Tracking', json: true, body: body.ChinaPart
            }, function (err, httpResponse, _body) {
              console.log(_body);
              if (_body.data.origin_info) {
                if (_body.data.origin_info.trackinfo) {
                  _body.data.origin_info.trackinfo.reverse()
                  body.ChinaPart.info = _body.data;
                }
              }
              Service.find({}).sort({ updated_at: 1 }).exec(function (err, services) {
                Doc.find({}).sort({ updated_at: -1 }).exec(function (err, docs) {
                  Transfer.find({}).sort({ updated_at: -1 }).exec(function (err, transfers) {
                    Search.find({ active: true }).sort({ times: -1 }).limit(20).exec(function (err, hotsearchs) {
                      var paths = [], path;
                      transfers.forEach(function (transfer, index) {
                        if (path != transfer.path) {
                          paths.push(transfer.path);
                          path = transfer.path;
                        }
                      });
                      res.render('frontend/tracking', {
                        title: "物流追踪",
                        description: "美速通转运网-致力于成为中国最专业的转运公司！本公司位于洛杉矶，主要经营北美到中国大陆的传统国际快递、以及国际电子商务仓储、物流及相关业务，为德淘人士、欧洲购物、欧淘、德淘转运、德淘海外代购公司、以及德淘代购个人提供一个优秀的转运平台。",
                        keywords: "德淘转运，德淘，欧洲购物,欧淘，德淘之家，德淘网，美速通，德淘攻略",
                        data: body,
                        services: services,
                        docs: docs,
                        paths: paths,
                        transfers: transfers,
                        hotsearchs: hotsearchs,
                      });
                    });
                  });
                });
              });
            });
          }, 10000);
        });
      } else {
        res.json(body);
      }
    } else {
      res.json(body);
    }
  });
});

router.get('/currencyExchange', function (req, res, next) {
  Exchange.find({}).sort({timestamp:-1}).limit(1).exec((err, exchanges)=>{
    res.send(exchanges[0].rate.toFixed(4));
  });
});

module.exports = router;
