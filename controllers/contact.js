const contactController = {}

contactController.getContact = (req , res , next) => {
    res.render('contact-us' , {
        page_name: "contact"
    })
}


module.exports = contactController