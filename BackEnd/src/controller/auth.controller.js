const userModel = require("../models/user.model")
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {

    const {username,email,password,bio,profilePic} = req.body


    const isAlreadyRegister = await userModel.findOne({
        $or: [
            { email },
            { password }
        ]
    })

    if (isAlreadyRegister) {
        return res.status(400).json({
            message: "User with the same name or email already exists"
        })
    }

    const hash = await bycrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profilePic
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET,
        {
            expiresIn: "3d"
        }
    )

    res.cookie("token",token);

    return res.status(201).json({
        message: "User Rergister Successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            profilePic: user.profilePic 
        }
    })
}

async function loginUser(req,res) {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    }).select("+password")

    if (!user) {
        return res.status(400).json({
            message: "invalid credentials"
        })
    }

    const isPasswordValid = await bycrypt.compare(password,user.password);

     if (!isPasswordValid) {
        return res.status(400).json({
            message: "invalid credentials"
        })
    }

     const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET,
        {
            expiresIn: "3d"
        }
    )

    res.cookie("token",token);

    return res.status(200).json({
        message: "User loged in Successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            profilePic: user.profilePic  
        }
    })
}

module.exports = { registerUser,loginUser } 