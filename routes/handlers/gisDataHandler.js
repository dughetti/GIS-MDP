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


    // this.newCompany = function(req, res, next) {
    //     console.log("handling new company " + req.body.organization);

    //     var organization = req.body.organization;
    //     if(organization){
    //         companies.createNewCompany(organization,function(err,result){
    //             if(err) return next(err);

    //             return res.json(201,{message: "La empresa " + result[0].organization + " se creo con éxito."});
    //         });
    //     }
    //     else{
    //         res.json(404,{message: "Falta el nombre de la organización."});
    //     }

    // };

    // this.getCompanyByName = function(req,res,next){
    //     console.log("Handling get company by name " + req.params.name);
    //     var name = req.params.name;
    //     if(name){
    //         companies.getCompanyByName(name,function(err,result){
    //             if(err) return next(err);

    //             return res.json(200,result);
    //         });
    //     }
    //     else{
    //         res.json(404,{message: "Falta el nombre de la organización."});
    //     }

    // };

    // this.deleteCompany = function(req, res, next) {
    //     var name = req.params.name;
    //     if(!name){
    //         var ownError = new Error("Falta el nombre de la organización a eliminar.");
    //         ownError.statusResponse = 404;
    //         return next(ownError);
    //     }

    //     companies.deleteCompany(name,function(err,result){
    //         if(err) return next(err);
    //         else{
    //             return res.json(200,{message:"company " + name + " removed."});
    //         }
    //     });
    // };

    // this.listCompany = function(req,res,next){
    //     var limit=10,
    //         skip = 0,
    //         field = {};

    //     if(req.query.limit){
    //         limit = parseInt(req.query.limit,10);
    //     }
    //     if(req.query.skip){
    //         skip =  parseInt(req.query.skip,10);
    //     }
    //     if(req.query.fields){
    //         var aux = req.query.fields.split(",");
    //         aux.forEach(function(element){field[element.trim()] = true; });
    //     }

    //     companies.listCompany(limit,skip,field,function(err,result){
    //         if(err) return next(err);
    //         return res.json(200,result);
    //     });
    // };

    // this.checkCompanyName = function(req, res, next, name){
    //     companies.getCompanyByName(name,function(err, company){
    //         if (err) {
    //           return next(err);
    //         }
    //         req.company = company;
    //         next();
    //     });
    // };

}

module.exports = gisHandler;