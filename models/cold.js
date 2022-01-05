const mongoose = require('mongoose')

const DB_URL = "mongodb+srv://admin:PASSword@cluster0.sityi.mongodb.net/medical?retryWrites=true&w=majority"

mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    indications: {
        type: Array,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
})

const Cold = mongoose.model('cold' ,Schema )


Array.prototype.diff = function(arr2) {
    var ret = [];
    for(var i in this) {   
        if(arr2.indexOf(this[i]) > -1){
            ret.push(this[i]);
        }
    }
    return ret;
};

////////////getIndications////////////
exports.getIndications = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Cold.find()
        }).then(colds => {
            mongoose.disconnect()
            let indications = new Set()
            colds.forEach(item => {
                item.indications.forEach(indication => {
                    indications.add(indication)
                })
            })
            resolve(indications)
        }).catch(err => reject(err))
    })
}

////////////getDisease////////////
exports.getDisease = (category) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Cold.find({ indications: { $in: category } });
        }).then(disease => {
            mongoose.disconnect()
            function Diseases () {
                let arr = []
                disease.forEach((e , i) => {
                    arr.push({
                        e,
                        c: category.diff(e.indications).length,
                    })
                })
                let max = Math.max(...(arr.map(el => el.c)));
                return arr.filter((e) => e.c === max)
            }            
            resolve(Diseases())
        }).catch(err => reject(err))
    })
}