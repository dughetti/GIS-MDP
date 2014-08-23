var soap = require('soap');
    config = require('../../config');
    fs = require('fs');
/* The ContentHandler must be constructed with a connected db */
function reportsHandler () {
    /*jshint validthis: true */
    "use strict";

    this.submitReport = function(req, res, next) {
        fs.appendFile('./hackatest.txt', req.body.position.lat + " " + req.body.position.lng + ' ' + req.body.complaint + '\n\r', function(err) {});
    };
}

module.exports = reportsHandler;