var gisRouter = require('./gis');


module.exports = exports = function(app) {

	app.use('/api/gis', gisRouter());

};