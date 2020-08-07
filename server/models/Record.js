const mongoose = require('mongoose')
const { Schema } = mongoose

const Record = new Schema({
    name: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
    address: String,
    gender: String
})

module.exports = mongoose.model('Record', Record)
