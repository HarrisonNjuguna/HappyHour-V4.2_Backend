const mongoose = require('mongoose')

const drinkSchema = new mongoose.Schema({

    title: {type: String, required: true},
    drinkTags: {type: Array, required: true},
    category: {type: String, required: true},
    code: {type: String, required: true},
    isAvailable: {type: Boolean, required: true, default: true},
    shop: {type: mongoose.Schema.Types.ObjectId, ref: 'Shop'},
    rating: {
        type: Number,
        min: 1, 
        max: 5,
        default: 5
    },
    ratingCount: {type: String},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    additives: {type: Array, required: true},
    imageUrl: {type: Array, required: true}

}, {timestamps: false});

module.exports = mongoose.model('Drink', drinkSchema) 