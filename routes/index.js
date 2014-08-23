var gisRouter = require('./gis');
var reportsRouter = require('./reports');


module.exports = exports = function(app) {

	app.use('/api/gis', gisRouter());
    app.use('/api/reports', reportsRouter());
};