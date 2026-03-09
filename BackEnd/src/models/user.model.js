const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: [true, "username must be unique"]
    },
    email: {
        type: String,
        require: [true, "email is required"],
        unique: [true, "email is must be unique"]
    },
    password: {
        type: String,
        require: [true, "password is required"],
        select: false
    }, 
    profilePic: {
        type: String,
        default: "https://ik.imagekit.io/rushipatel2401/default_profile.jpg"
    },
    bio: {
        type: String
    },
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe"
        }
    ]

})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel;