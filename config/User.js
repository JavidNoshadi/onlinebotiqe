const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    password: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    role:{
        type: String,
        default: "user",
        enum: ["user","admin"]
    }
})
const User = mongoose.model('USERS', UserSchema);

module.exports = User