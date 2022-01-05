const mongoose = require('mongoose')

const DB_URL = "mongodb+srv://admin:PASSword@cluster0.sityi.mongodb.net/medical?retryWrites=true&w=majority"

mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    }, 
    img: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    doctor: {
        type: String,
        required: true,
    }, 
    category: {
        type: String,
        required: true,
    },
    description: {
        type: Object,
        required: true,
    },
})

const Blog = mongoose.model('blog' ,Schema )

////////////getBlogs////////////
exports.getBlogs = () => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Blog.find().sort([["_id", 1]])
        }).then(Blogs => {
            mongoose.disconnect()
            resolve(Blogs)
        }).catch(err => reject(err))
    })
}

////////////getLatstBlogs////////////
exports.getLatstBlogs = () => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Blog.find().limit(3).sort([["_id", -1]])
        }).then(blogs => {
            mongoose.disconnect()
            resolve(blogs)
        }).catch(err => reject(err))
    })
}

////////////getDetailsBlogs////////////
exports.getDetailsBlogs = (id) => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Blog.findById(id)
        }).then(blog => {
            mongoose.disconnect()
            resolve(blog)
        }).catch(err => reject(err))
    })
}