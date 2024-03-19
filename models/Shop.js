const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema({
    title: {type: String, required: true},
    time: {type: String, required: true},
    imageUrl: {type: String, required: true},
    drinks: {type: Array},
    pickup: {type: Boolean, required: false, default: true},
    delivery: {type: Boolean, required: false, default: true},
    owner: {type: String, required: true},
    isAvailable: {type: Boolean, defaut: true},
    code: {type: String, required: true},

    logoUrl: {
        type: String,
        required: true,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/768px-Windows_10_Default_Profile_Picture.svg.png?20221210150350'
    },

    rating: { type: Number, min: 1, max:5 },
    ratingCount: {type: String},
    coords: {
        id: { type: String, required: true },
        latitude: { type: Number, required: true},
        longitude: { type: Number, required: true},
        latitudeDelta: { type: Number, required: true, default: 1.3165},
        longitudeDelta: { type: Number, required: true, default: 36.8219},
        address: { type: String, required: true },
        title: { type: String, required: true}
    }



}, {timestamps: true});

module.exports = mongoose.model('Shop', shopSchema) 