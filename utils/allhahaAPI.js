'use strict';
var request = require('request');

class Auth {
    constructor(appid, appsecret) {
        this.appid = appid;
        this.appsecret = appsecret;
        this.token = "";
    }

    auth(callback) {
        request.post({
            url: 'http://allhaha.com/api/auth',
            form: {
                appid: this.appid,
                appsecret: this.appsecret
            },
            json: true
        }, (err, httpResponse, body) => {
            if (body) {
                if (body.success) {
                    this.token = body.token;
                    callback(body);
                } else {
                    callback(body);
                }
            } else {
                callback(err);
            }
        });
    }

    checkToken(callback) {
        request.get({
            url: 'http://allhaha.com/api/checkToken',
            headers: {
                'x-access-token': this.token
            },
            json: true
        }, (err, httpResponse, body) => {
            if (body.success) {
                callback(body);
            } else {
                this.auth();
                callback(body);
            }
        });
    }

    getToken() {
        return this.token;
    }

    getShops(callback) {
        this.auth((result) => {
            if (result.success) {
                request.get({
                    url: 'http://allhaha.com/api/getShops',
                    headers: {
                        'x-access-token': this.token
                    },
                    json: true
                }, (err, httpResponse, body) => {
                    callback(err, body);
                });
            } else {
                console.log("Check Allhaha Auth Failed!");
            }
        });
    }

    searchProduct(query, callback) {
        this.auth((result) => {
            if (result.success) {
                request.get({
                    url: 'http://allhaha.com/api/searchProduct?search_value=' + query,
                    headers: {
                        'x-access-token': this.token
                    },
                    json: true
                }, (err, httpResponse, body) => {
                    callback(err, body);
                });
            } else {
                console.log("Check Allhaha Auth Failed!");
            }
        });
    }
}

module.exports = Auth;

