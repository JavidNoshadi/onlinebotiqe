const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    role:{
        type: String,
        default: "user",
        enum: ["user","admin"]
    }
})
const User = mongoose.model('USERS', UserSchema);

module.exports = User