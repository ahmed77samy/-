const Colds = require("../models/cold");
const Hearts = require("../models/heart");
const Bones = require("../models/bones");
const Eyes = require("../models/eyes");
const reportController = {};

reportController.getReport = (req, res, next) => {
    switch (req.query.maincategory) {

        case "colds":
            let cat = typeof req.query.coldscategory === "string" ? [req.query.coldscategory] : [...req.query.coldscategory]
            return Colds.getIndications().then((indications) => {
                Colds.getDisease(cat).then((disease) => {
                    res.render("report", {
                        indications,
                        category: cat,
                        title: "نزلات البرد",
                        disease,
                        notFound: false,
                        page_name: "report"
                    });
                })
            });

        case "hearts":
            let heart = typeof req.query.heartscategory === "string" ? [req.query.heartscategory] : [...req.query.heartscategory]
            return Hearts.getIndications().then((indications) => {
                Hearts.getDisease(heart).then((disease) => {
                    res.render("report", {
                        indications,
                        category: heart,
                        title: "امراض القلب",
                        disease,
                        notFound: false,
                        page_name: "report"
                    });
                })
            });

        case "bones":
            let bone = typeof req.query.bonescategory === "string" ? [req.query.bonescategory] : [...req.query.bonescategory]
            return Bones.getIndications().then((indications) => {
                Bones.getDisease(bone).then((disease) => {
                    res.render("report", {
                        indications,
                        category: bone,
                        title: "امراض العظام",
                        disease,
                        notFound: false,
                        page_name: "report"
                    });
                })
            });

        case "eyes":
            let eye = typeof req.query.eyescategory === "string" ? [req.query.eyescategory] : [...req.query.eyescategory]
            return Eyes.getIndications().then((indications) => {
                Eyes.getDisease(eye).then((disease) => {
                    res.render("report", {
                        indications,
                        category: eye,
                        title: "امراض العيون",
                        disease,
                        notFound: false,
                        page_name: "report"
                    });
                })
            });

        default:
            return res.render("report", {
                indications:[[]],
                category: [],
                title: "لا يوجد",
                disease: [],
                notFound: true,
                page_name: "report"
            });

    }
};

module.exports = reportController;