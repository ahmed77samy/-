const Colds = require("../models/cold");
const Hearts = require("../models/heart");
const Bones = require("../models/bones");
const Eyes = require("../models/eyes");

const helpController = {}

helpController.gethelp = (req , res , next) => {
    Promise.all([
        Colds.getIndications(),
        Hearts.getIndications(),
        Bones.getIndications(),
        Eyes.getIndications(),
    ])
    .then((values) => {
        res.render("find-help", {
            coldsIndications: values[0],
            heartsIndications: values[1],
            bonesIndications: values[2],
            eyesIndications: values[3],
            page_name: "find-help"
        });
    });
}


module.exports = helpController