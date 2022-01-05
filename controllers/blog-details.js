const Blogs = require("../models/blogs");

const blogDetailsController = {};

blogDetailsController.getItem = (req, res, next) => {
    let id = req.params.id
    Blogs.getLatstBlogs().then((latestBlogs) => {
        Blogs.getDetailsBlogs(id).then((item) => {
            res.render("blog-details", {
                item,
                latestBlogs,
                page_name: "blog"
            });
        });
    })
};

module.exports = blogDetailsController;
