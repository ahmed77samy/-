const Colds = require("../models/cold");
const Hearts = require("../models/heart");
const Bones = require("../models/bones");
const Eyes = require("../models/eyes");

const homeController = {};

homeController.getHome = (req, res, next) => {
    Promise.all([
        Colds.getIndications(),
        Hearts.getIndications(),
        Bones.getIndications(),
        Eyes.getIndications(),
    ])
    .then((values) => {
        res.render("index", {
            coldsIndications: values[0],
            heartsIndications: values[1],
            bonesIndications: values[2],
            eyesIndications: values[3],
            page_name: "home"
        });
    });
};

module.exports = homeController;
