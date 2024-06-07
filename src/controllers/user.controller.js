
// const { body } = require("express-validator");
const { body } = require("express-validator");
const db = require("../../config/db.connection");
const { UserNotFound } = require("../handlers/UserNotFound");
const { where } = require("sequelize");
const User = db.users

//--------------------------save user------------------------------------------------------
exports.saveUser = async (req, res, next) => {
    const user = req.body;
    try {
        const result = await User.create(user)
        if (result != null) {
            return res.status(201).json({ message: "User has been Saved", body: result, status: "success" })
        }
    } catch (err) {
        next(err)
    }
}



//----------------------------------update user-------------------------------------------------
exports.updateUser = async (req, res, next) => {
    const id = req.params.id;
    const user = req.body;
    try {
        const u1=await User.findByPk(id,{include:"products"});
         User.update(user, { where: { id: id } });
        if (u1 != null)
            return res.status(202).json({ message: "User has been updated", body: user, status: "success" });
        throw new UserNotFound("User Not found with entered Id")
    }
    catch (err) {
        next(err);
    }
}


//------------------------------------find User by id--------------------------------------
exports.findUserById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await User.findByPk(id,{include:"products"})
        if (result != null)
            {
            return res.status(200).json({ message: "User Found with Entered Id", body: result, status: "success" });
            }
        throw new UserNotFound("User Not Found with entered id");
    }
    catch (err) {
        next(err)
    }
}


//--------------------------------find users----------------------------------------------
exports.findAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({include:"products"});
        if (users.length != 0)
            return res.status(200).json({ message: "User Data Found", body: users, success: true })
        throw new UserNotFound("No User Data Found")
    }
    catch (err) {
        next(err)
    }
}



//--------------------------------delete user by Id---------------------------------------------
exports.deleteUserById = async (req, res,next) => {
    const id = req.params.id;
    try {
        const user = await User.findByPk(id,{include:"products"})
        if (user != null) {
            User.destroy({ where: { id: id } })
            return res.status(202).json({ message: "User Has been deleted",body:user, status: "success" })
        }
        throw new UserNotFound("Invalid User Id")
    }
    catch (err) {
        next(err)
    }
}



//------------------------------------validation----------------------------------------
exports.verifyByEmailAndPassword=async(req,res,next)=>{
    const email=req.query.email;
    const password=req.query.password;
    try{
        const user=await User.findAll({email:email,password:password})
        if(user.length!=0)
            return res.status(200).json({message:"User verified successfully",body:user[0],status:"success"})
        throw new UserNotFound("Invalid Email or password")
    }
    catch(err)
    {
        next(err)
    }
}