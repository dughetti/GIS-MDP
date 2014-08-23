var express = require('express'),
    router = express.Router(),
    ReportsHandler = require('./handlers/reportsDataHandler');

module.exports = exports = function() {
    var reportsHandler = new ReportsHandler();
    router.route('/')
        .post(reportsHandler.submitReport)

    return router;
};
