const aboutController = {}

aboutController.getAbout = (req , res , next) => {
    res.render('about-us' , {
        page_name: "about"
    })
}


module.exports = aboutController