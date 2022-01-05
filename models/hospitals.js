const mongoose = require('mongoose')

const DB_URL = "mongodb+srv://admin:PASSword@cluster0.sityi.mongodb.net/medical?retryWrites=true&w=majority"

mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema({
    hos_name: {
        type: String,
        required: true,
    }, 
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    lat: {
        type: String,
        required: true,
    },
    lng: {
        type: String,
        required: true,
    },
})

const Hospital = mongoose.model('hospital' ,Schema )


////////////getHospitals////////////
exports.getHospitals = () => {
    return new Promise((resolve , reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Hospital.find().sort([["_id", 1]])
        }).then(Hospitals => {
            mongoose.disconnect()
            resolve(Hospitals)
        }).catch(err => reject(err))
    })
}