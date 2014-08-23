var express = require('express'),
    router = express.Router(),
    GisHandler = require('./handlers/gisDataHandler'),
    GisHandlerLatLon = require('./handlers/gisDataLatLonHandler');

module.exports = exports = function() {
    var gisHandler = new GisHandler(),
        gisHandlerLatLon = new GisHandlerLatLon();


    router.route('/museo')
        .get(gisHandler.listMuseo);

    router.route('/bibliotecas')
        .get(gisHandler.listBibliotecas);

    router.route('/informacion_turistica')
        .get(gisHandler.listInfoTuristica);

    router.route('/servicios_sociales')
        .get(gisHandler.listServiciosSociales);

    router.route('/centros_de_salud')
        .get(gisHandler.listCentrosSalud);

    router.route('/educacion_publica_municipal')
        .get(gisHandler.listEducacionPublicaMunicipal);

    router.route('/educacion_publica_provincial')
        .get(gisHandler.listEducacionPublicaProvincial);

    router.route('/educacion_privada')
        .get(gisHandler.listEducacionPrivada);

    router.route('/clubs')
        .get(gisHandler.listClubs);

    router.route('/barrios')
        .get(gisHandler.listBarrios);

    router.route('/areas_programaticas')
        .get(gisHandler.listAreasProgramaticas);

    router.route('/lat_lon_barrios')
        .get(gisHandlerLatLon.LatLonBarrio);

    router.route('/lat_lon_est_medido_puesto')
        .get(gisHandlerLatLon.LatLonPuestoEstacionamientoMedido);

    router.route('/lat_lon_wifi')
        .get(gisHandlerLatLon.LatLonWifi);

    return router;
};
