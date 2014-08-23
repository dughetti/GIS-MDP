var soap = require('soap');
    config = require('../../config');
/* The ContentHandler must be constructed with a connected db */
function gisHandlerLatLon () {
    /*jshint validthis: true */
    "use strict";

    var geoJ = {
        "return" : {
            type: "FeatureCollection",
            features: []
        },
        "success" : true
    };

    this.LatLonBarrio = function(req,res,next){
        var args = {latitud: req.query.lat,longitud:req.query.lon,token: config.token};

        soap.createClient(config.serviceUrl, function(err, client) {
            client.latlong_barrio(args, function(err, result) {
                if(err) {
                    geoJ.return = {};
                    geoJ.success = false;
                    geoJ.error = err;
                    return res.json(404,geoJ);
                }
                geoJ.return.features = [];
                var feature = {
                    type: "Feature",
                    properties: {
                      descripcion: result.return.descripcion.$value,
                      codigo: result.return.codigo.$value
                    },
                    geometry: { type: "Point", coordinates: [  parseFloat(req.query.lon) ,parseFloat(req.query.lat)] }
                };
                geoJ.return.features.push(feature);

                return res.json(200,geoJ);
            });
        });
    };

    this.LatLonPuestoEstacionamientoMedido = function(req,res,next){
       var args = {latitud: req.query.lat,longitud:req.query.lon,token: config.token};

       soap.createClient(config.serviceUrl, function(err, client) {
           client.latlong_puestomedido(args, function(err, result) {
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
                               codigo: result.return.item[j].codigo.$value
                           },
                           geometry: { type: "Point", coordinates: [  parseFloat(req.query.lon) ,parseFloat(req.query.lat)] }
                       };
                       geoJ.return.features.push(feature);
                    })(i);
               }
               return res.json(200,geoJ);
           });
       });
    };

    this.LatLonWifi = function(req,res,next){
       var args = {latitud: req.query.lat,longitud:req.query.lon,token: config.token};

       soap.createClient(config.serviceUrl, function(err, client) {
           client.wifi_mgp(args, function(err, result) {
               if(err || result.return.item) {
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
                                codigo: result.return.item[j].codigo.$value
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

module.exports = gisHandlerLatLon;