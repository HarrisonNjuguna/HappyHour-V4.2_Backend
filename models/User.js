const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    uid: {type: String, required: true},
    password: {type: String, required: true},
    address: {type: Array, required: false},
    phone: {type: String, required: false},
    userType: {type: String, required: true, deftault: "Client", enum: ['Admin', 'Driver', 'Client', 'Vendor']},
    profile: {
        type: String,
        required: true,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/768px-Windows_10_Default_Profile_Picture.svg.png?20221210150350'
    },
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema) 