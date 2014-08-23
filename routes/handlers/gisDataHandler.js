var soap = require('soap');
    config = require('../../config');
/* The ContentHandler must be constructed with a connected db */
function gisHandler () {
    /*jshint validthis: true */
    "use strict";

    var geoJ = {
        "return" : {
            type: "FeatureCollection",
            features: []
        },
        "success" : true
    };

    this.listMuseo = function(req,res,next){
        var args = {token: config.token};

        soap.createClient(config.serviceUrl, function(err, client) {
            if(client){
                client.museos(args, function(err, result) {
                    if(err) {
                        geoJ.return = {};
                        geoJ.success = false;
                        geoJ.error = err;
                        return res.json(404,geoJ);
                    }
                    geoJ.return.features = [];
                    for (var i = 0; i < result.return.item.length; i++) {
                        (function(j) {
                            var feature = {
                                type: "Feature",
                                properties: {
                                    descripcion: result.return.item[j].descripcion.$value,
                                    ubicacion: result.return.item[j].ubicacion.$value
                                },
                                geometry: { type: "Point", coordinates: [  parseFloat(result.return.item[j].longitud.$value) ,parseFloat(result.return.item[j].latitud.$value)] }
                            };
                            geoJ.return.features.push(feature);
                         })(i);
                    }

                    return res.json(200,geoJ);
                });
            }
        });
    };

    this.listBibliotecas = function(req,res,next){
        var args = {token: config.token};

        soap.createClient(config.serviceUrl, function(err, client) {
            if(client){
                client.bibliotecas(args, function(err, result) {
                   if(err) {
                       geoJ.return = {};
                       geoJ.success = false;
                       geoJ.error = err;
                       return res.json(404,geoJ);
                   }
                    geoJ.return.features = [];
                    for (var i = 0; i < result.return.item.length; i++) {
                        (function(j) {
                            var feature = {
                                type: "Feature",
                                properties: {
                                    descripcion: result.return.item[j].descripcion.$value,
                                    ubicacion: result.return.item[j].ubicacion.$value
                                },
                                geometry: { type: "Point", coordinates: [  parseFloat(result.return.item[j].longitud.$value) ,parseFloat(result.return.item[j].latitud.$value)] }
                            };
                            geoJ.return.features.push(feature);
                         })(i);
                    }

                    return res.json(200,geoJ);
                });
            }
        });
    };

    this.listInfoTuristica = function(req,res,next){
        var args = {token: config.token};

        soap.createClient(config.serviceUrl, function(err, client) {
            client.informacion_turistica(args, function(err, result) {
                if(err) {
                  geoJ.return = {};
                  geoJ.success = false;
                  geoJ.error = err;
                  return res.json(404,geoJ);
                }
                geoJ.return.features = [];
                for (var i = 0; i < result.return.item.length; i++) {
                    (function(j) {
                        var feature = {
                            type: "Feature",
                            properties: {
                                descripcion: result.return.item[j].descripcion.$value,
                                ubicacion: result.return.item[j].ubicacion.$value
                            },
                            geometry: { type: "Point", coordinates: [  parseFloat(result.return.item[j].longitud.$value) ,parseFloat(result.return.item[j].latitud.$value)] }
                        };
                        geoJ.return.features.push(feature);
                     })(i);
                }

                return res.json(200,geoJ);
            });
        });
    };

    this.listServiciosSociales = function(req,res,next){
        var args = {token: config.token};

        soap.createClient(config.serviceUrl, function(err, client) {
            client.servicios_sociales(args, function(err, result) {
                if(err) {
                    geoJ.return = {};
                    geoJ.success = false;
                    geoJ.error = err;
                    return res.json(404,geoJ);
                }
                geoJ.return.features = [];
                for (var i = 0; i < result.return.item.length; i++) {
                    (function(j) {
                        var feature = {
                            type: "Feature",
                            properties: {
                                descripcion: result.return.item[j].descripcion.$value,
                                ubicacion: result.return.item[j].ubicacion.$value
                            },
                            geometry: { type: "Point", coordinates: [  parseFloat(result.return.item[j].longitud.$value) ,parseFloat(result.return.item[j].latitud.$value)] }
                        };
                        geoJ.return.features.push(feature);
                     })(i);
                }

                return res.json(200,geoJ);
            });
        });
    };

    this.listCentrosSalud = function(req,res,next){
        var args = {token: config.token};

        soap.createClient(config.serviceUrl, function(err, client) {
            if(client){
                client.centros_de_salud(args, function(err, result) {
                    if(err) {
                        geoJ.return = {};
                        geoJ.success = false;
                        geoJ.error = err;
                        return res.json(404,geoJ);
                    }
                    geoJ.return.features = [];
                    for (var i = 0; i < result.return.item.length; i++) {
                        (function(j) {
                            var feature = {
                                type: "Feature",
                                properties: {
                                    descripcion: result.return.item[j].descripcion.$value,
                                    ubicacion: result.return.item[j].ubicacion.$value
                                },
                                geometry: { type: "Point", coordinates: [  parseFloat(result.return.item[j].longitud.$value) ,parseFloat(result.return.item[j].latitud.$value)] }
                            };
                            geoJ.return.features.push(feature);
                         })(i);
                    }

                    return res.json(200,geoJ);
                });
            }
        });
    };

    this.listEducacionPublicaMunicipal = function(req,res,next){
        var args = {token: config.token};

        soap.createClient(config.serviceUrl, function(err, client) {
            client.educacion_publica_municipal(args, function(err, result) {
                if(err) {
                    geoJ.return = {};
                    geoJ.success = false;
                    geoJ.error = err;
                    return res.json(404,geoJ);
                }
                geoJ.return.features = [];
                for (var i = 0; i < result.return.item.length; i++) {
                    (function(j) {
                        var feature = {
                            type: "Feature",
                            properties: {
                                descripcion: result.return.item[j].descripcion.$value,
                                ubicacion: result.return.item[j].ubicacion.$value
                            },
                            geometry: { type: "Point", coordinates: [  parseFloat(result.return.item[j].longitud.$value) ,parseFloat(result.return.item[j].latitud.$value)] }
                        };
                        geoJ.return.features.push(feature);
                     })(i);
                }

                return res.json(200,geoJ);
            });
        });
    };

    this.listEducacionPublicaProvincial = function(req,res,next){
        var args = {token: config.token};

        soap.createClient(config.serviceUrl, function(err, client) {
            client.educacion_publica_provincial(args, function(err, result) {
                if(err) {
                    geoJ.return = {};
                    geoJ.success = false;
                    geoJ.error = err;
                    return res.json(404,geoJ);
                }
                geoJ.return.features = [];
                for (var i = 0; i < result.return.item.length; i++) {
                    (function(j) {
                        var feature = {
                            type: "Feature",
                            properties: {
                                descripcion: result.return.item[j].descripcion.$value,
                                ubicacion: result.return.item[j].ubicacion.$value
                            },
                            geometry: { type: "Point", coordinates: [  parseFloat(result.return.item[j].longitud.$value) ,parseFloat(result.return.item[j].latitud.$value)] }
                        };
                        geoJ.return.features.push(feature);
                     })(i);
                }

                return res.json(200,geoJ);
            });
        });
    };

    this.listEducacionPrivada = function(req,res,next){
        var args = {token: config.token};

        soap.createClient(config.serviceUrl, function(err, client) {
            client.educacion_privada(args, function(err, result) {
                if(err) {
                    geoJ.return = {};
                    geoJ.success = false;
                    geoJ.error = err;
                    return res.json(404,geoJ);
                }
                geoJ.return.features = [];
                for (var i = 0; i < result.return.item.length; i++) {
                    (function(j) {
                        var feature = {
                            type: "Feature",
                            properties: {
                                descripcion: result.return.item[j].descripcion.$value,
                                ubicacion: result.return.item[j].ubicacion.$value
                            },
                            geometry: { type: "Point", coordinates: [  parseFloat(result.return.item[j].longitud.$value) ,parseFloat(result.return.item[j].latitud.$value)] }
                        };
                        geoJ.return.features.push(feature);
                     })(i);
                }

                return res.json(200,geoJ);
            });
        });
    };

    this.listClubs = function(req,res,next){
        var args = {token: config.token};

        soap.createClient(config.serviceUrl, function(err, client) {
            client.clubs(args, function(err, result) {
                if(err) {
                    geoJ.return = {};
                    geoJ.success = false;
                    geoJ.error = err;
                    return res.json(404,geoJ);
                }
                geoJ.return.features = [];
                if(result.return.item && result.return.item.length){
                    for (var i = 0; i < result.return.item.length; i++) {
                        (function(j) {
                            var feature = {
                                type: "Feature",
                                properties: {
                                    descripcion: result.return.item[j].descripcion.$value,
                                    ubicacion: result.return.item[j].ubicacion.$value
                                },
                                geometry: { type: "Point", coordinates: [  parseFloat(result.return.item[j].longitud.$value) ,parseFloat(result.return.item[j].latitud.$value)] }
                            };
                            geoJ.return.features.push(feature);
                         })(i);
                    }
                }
                return res.json(200,geoJ);
            });
        });
    };

    this.listBarrios = function(req,res,next){
        var args = {token: config.token};

        soap.createClient(config.serviceUrl, function(err, client) {
            client.barrios(args, function(err, result) {
                if(err) {
                    geoJ.return = {};
                    geoJ.success = false;
                    geoJ.error = err;
                    return res.json(404,geoJ);
                }
                geoJ.return.features = [];
                for (var i = 0; i < result.return.item.length; i++) {
                    (function(j) {
                        var feature = {
                            type: "Feature",
                            properties: {
                                descripcion: result.return.item[j].descripcion.$value,
                                ubicacion: result.return.item[j].ubicacion.$value
                            },
                            geometry: { type: "Point", coordinates: [  parseFloat(result.return.item[j].longitud.$value) ,parseFloat(result.return.item[j].latitud.$value)] }
                        };
                        geoJ.return.features.push(feature);
                     })(i);
                }

                return res.json(200,geoJ);
            });
        });
    };

    this.listAreasProgramaticas = function(req,res,next){
        var args = {token: config.token};

        soap.createClient(config.serviceUrl, function(err, client) {
            client.areas_programaticas(args, function(err, result) {
                if(err) {
                    geoJ.return = {};
                    geoJ.success = false;
                    geoJ.error = err;
                    return res.json(404,geoJ);
                }
                geoJ.return.features = [];
                for (var i = 0; i < result.return.item.length; i++) {
                    (function(j) {
                        var feature = {
                            type: "Feature",
                            properties: {
                                descripcion: result.return.item[j].descripcion.$value,
                                ubicacion: result.return.item[j].ubicacion.$value
                            },
                            geometry: { type: "Point", coordinates: [  parseFloat(result.return.item[j].longitud.$value) ,parseFloat(result.return.item[j].latitud.$value)] }
                        };
                        geoJ.return.features.push(feature);
                     })(i);
                }

                return res.json(200,geoJ);
            });
        });
    };
}

module.exports = gisHandler;