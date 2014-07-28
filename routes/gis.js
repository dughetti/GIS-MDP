var express = require('express'),
    router = express.Router(),
    GisHandler = require('./handlers/gisDataHandler');

module.exports = exports = function() {
    var gisHandler = new GisHandler();


    router.route('/museo')
        // create a company (accessed at POST http://localhost:8080/api/company)
        // .post(companyHandler.newCompany)
        // get all company (accessed at GET http://localhost:8080/api/company/)
        .get(gisHandler.listMuseo);

    router.route('/bibliotecas')
        // create a company (accessed at POST http://localhost:8080/api/company)
        // .post(companyHandler.newCompany)
        // get all company (accessed at GET http://localhost:8080/api/company/)
        .get(gisHandler.listBibliotecas);

    router.route('/informacion_turistica')
        // create a company (accessed at POST http://localhost:8080/api/company)
        // .post(companyHandler.newCompany)
        // get all company (accessed at GET http://localhost:8080/api/company/)
        .get(gisHandler.listInfoTuristica);

    router.route('/servicios_sociales')
        // create a company (accessed at POST http://localhost:8080/api/company)
        // .post(companyHandler.newCompany)
        // get all company (accessed at GET http://localhost:8080/api/company/)
        .get(gisHandler.listServiciosSociales);

    router.route('/centros_de_salud')
        // create a company (accessed at POST http://localhost:8080/api/company)
        // .post(companyHandler.newCompany)
        // get all company (accessed at GET http://localhost:8080/api/company/)
        .get(gisHandler.listCentrosSalud);

    router.route('/educacion_publica_municipal')
        // create a company (accessed at POST http://localhost:8080/api/company)
        // .post(companyHandler.newCompany)
        // get all company (accessed at GET http://localhost:8080/api/company/)
        .get(gisHandler.listEducacionPublicaMunicipal);

    router.route('/educacion_publica_provincial')
        // create a company (accessed at POST http://localhost:8080/api/company)
        // .post(companyHandler.newCompany)
        // get all company (accessed at GET http://localhost:8080/api/company/)
        .get(gisHandler.listEducacionPublicaProvincial);

    router.route('/educacion_privada')
        // create a company (accessed at POST http://localhost:8080/api/company)
        // .post(companyHandler.newCompany)
        // get all company (accessed at GET http://localhost:8080/api/company/)
        .get(gisHandler.listEducacionPrivada);

    router.route('/clubs')
        // create a company (accessed at POST http://localhost:8080/api/company)
        // .post(companyHandler.newCompany)
        // get all company (accessed at GET http://localhost:8080/api/company/)
        .get(gisHandler.listClubs);

    router.route('/barrios')
        // create a company (accessed at POST http://localhost:8080/api/company)
        // .post(companyHandler.newCompany)
        // get all company (accessed at GET http://localhost:8080/api/company/)
        .get(gisHandler.listBarrios);

    router.route('/areas_programaticas')
        // create a company (accessed at POST http://localhost:8080/api/company)
        // .post(companyHandler.newCompany)
        // get all company (accessed at GET http://localhost:8080/api/company/)
        .get(gisHandler.listAreasProgramaticas);





    // router.route('/company/:name')
    //     // get the company with that name (accessed at GET http://localhost:8080/api/company/name)
    //     .get(companyHandler.getCompanyByName)
    //     // delete the company with this name */
    //     .delete(companyHandler.deleteCompany);

    // router.param('companyName', companyHandler.checkCompanyName);

    // router.route('/company/:companyName/line')
    //     .post(lineHandler.handleNewLine);
    //     //.get(lineHandler.listLines);
    // router.route('/company/:companyName/line/:lineName')
    //     .get(lineHandler.handleLineByCode)
    //     .delete(lineHandler.handleDeleteLine);

    // router.route('/company/:companyName/lineUpload')
    //     .get(lineHandler.handleGetNewLineUpload)
    //     .post(lineHandler.handleNewLineUpload);


    return router;
};
