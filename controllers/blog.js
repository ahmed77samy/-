const Blogs = require("../models/blogs");

const blogController = {};

blogController.getBlog = (req, res, next) => {
    Blogs.getLatstBlogs().then((latestBlogs) => {
        Blogs.getBlogs().then((blogs) => {
            res.render("blog-list", {
                blogs,
                latestBlogs,
                page_name: "blog"
            });
        });
    });
};

module.exports = blogController;
