function ApiHandler (db) {
    "use strict";

    var borough = db.collection("boroughs");
    var museum = db.collection("museum");
    var theater = db.collection("theater");
    var subway = db.collection("subways");

    var geoJ = {
                    type: "FeatureCollection",
                                                                                                    
                    features: []
                };

    this.getBoroughs = function(req, res, next) {
        "use strict";
        borough.find().toArray(function(err, items) {
            geoJ.features = [];
            geoJ.features = items;
            res.send(JSON.stringify(geoJ));
        });
    }

    this.getMuseums = function(req, res, next) {
        "use strict";
        museum.find().toArray(function(err, items) {
            geoJ.features = [];
            geoJ.features = items;
            res.send(JSON.stringify(geoJ));
        });
    }

    this.getTheaters = function(req, res, next) {
        "use strict";
        theater.find().toArray(function(err, items) {
            geoJ.features = [];
            geoJ.features = items;
            res.send(JSON.stringify(geoJ));
        });
    }

    this.getSubways = function(req, res, next) {
        "use strict";
        subway.find().toArray(function(err, items) {
            geoJ.features = [];
            geoJ.features = items;
            res.send(JSON.stringify(geoJ));
        });
    }
}

module.exports = ApiHandler;
