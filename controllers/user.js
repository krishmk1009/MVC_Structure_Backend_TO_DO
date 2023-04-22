
import User from "../models/user.js";

import bcrypt, { hash } from "bcrypt"

import { sendCookie } from "../utils/features.js";
import Errorhandler from "../middleware/error.js";


export const test = (req, res) => {
    res.send(" hello how are you")
}



export const register = async (req, res, next) => {

    try {
        const { name, email, password } = req.body;


        let user = await User.findOne({ email });

        if (user) {
            return next(new Errorhandler("user alredy existed", 404))

        };

        const hashedPassword = await bcrypt.hash(password, 10)

        user = await User.create({ name, email, password: hashedPassword });
        sendCookie(user, res, "registerd succesfully ", 201)
    } catch (error) {
        next(error)
    }

}


export const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new Errorhandler("invalid email or password", 404))

        }

        const isMatchPass = await bcrypt.compare(password, user.password)

        if (!isMatchPass) {

            return next(new Errorhandler("invalid email or password", 404))

        }

        sendCookie(user, res, `welcome back ${user.name}`, 201)
    } catch (error) {
        next(error)
    }


}


export const logout = async (req, res) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",

        secure: process.env.NODE_ENV === "Development" ? false : true
    }).json({
        success: true,


    })
}


export const getMyProfile = async (req, res) => {


    res.status(200).json({
        success: true,
        user: req.user
    })

}
export const getAllUsers = async (req, res) => {

}

export const getUserById = async (req, res) => {



}





