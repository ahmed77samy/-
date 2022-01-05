const Hospital = require("../models/hospitals")

const mapController = {};

mapController.getMap = (req, res, next) => {
    Hospital.getHospitals()
    .then((hospitals) => {
        if(req.query.location) {
            res.render("map-list", {
                location: JSON.parse(req.query.location),
                hospitals,
                page_name: "report"
            });
        } else {
            res.redirect('/');
        }
    })
};

module.exports = mapController;
