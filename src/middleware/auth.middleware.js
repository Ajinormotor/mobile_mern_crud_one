import jwt from "jsonwebtoken"
import UserModel from "../models/user.model.js"


export const protectRoute = async(req,res,next) => {

    try {
        
    
   const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith('Bearer')){
       return res.status(401).json({ message: "No token provided or bad format" });
  }

const token = authHeader.split(" ")[1]

    // console.log("token valueL:", token)
    if(!token){
        return res.status(401).json({
            message: 'No authentication token, access denied'
        })
    }

    const decoded = jwt.verify(token, process.env.SEC)
     
      const user = await UserModel.findById(decoded.id).select('-password')
     req.user = user


     next()

     } catch (error) {
        console.error("Authentication error:", error.message)
        return res.status(401).json({
            message: "Token is not valid"
        })
        
    }


}
