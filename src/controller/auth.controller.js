import UserModel from "../models/user.model.js"
import jwt from "jsonwebtoken"

const generateToken = (userId) => {
  return  jwt.sign({id:userId }, process.env.SEC, { expiresIn: "7d"})

}


export const register = async(req,res) => {


    try {

         const {username, email,password} = req.body
    if(!username || !email || !password){  return res.status(400).json({  message: "please fill in all form"}) }

    if(username.length < 4){  return res.status(400).json({  message: "Username should be at least 5 chaacters long "}) }
   if(password.length < 4){  return res.status(400).json({  message: "Password should be at least 5 chaacters long i"}) }

   const existingUser = await UserModel.findOne({ $or: [ {email}, {username}]})

         if(existingUser){  return res.status(400).json({  message: `User already exist `}) }

         const profileImage = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${username}`

         const  user = await UserModel.create({
            username, email,password,
            profileImage

         })
         const token = generateToken(user._id)

         return res.status(201).json({ success: true, message:
             'registered successful', data: user, token})

        
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server error'
        })
        
    }
}


export const login = async(req,res) => {

     try {

         const {email,password} = req.body

    if( !email || !password){  return res.status(400).json({  message: "please fill in all form"}) }


        if(password.length < 4){  return res.status(400).json({  message: "Password should be at least 5 chaacters long i"}) }

        const user = await UserModel.findOne({ email})

         if(!user){  return res.status(400).json({  message: `Invalid credentail `}) }

        const checkPassword = await user.comparePassword(password)
         if(!checkPassword){  return res.status(400).json({  message: `Invalid credentails`}) }



       
         const token = generateToken(user._id)

         return res.status(201).json({ success: true, message: 'registered successful', datal: user, token})

        
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server error'
        })
        
    }
    
}