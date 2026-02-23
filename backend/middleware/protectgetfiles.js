import jwt from "jsonwebtoken";
import {User} from "../models/User.models.js";

export const protectgetfiles=async(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization;
        if(!authHeader){
            return next();
        }
        const params=authHeader.split(" ");
        if(params.length<2||params[0]!="Bearer"){
            return next();
        }
        const token=params[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        res.user=await User.findById(decoded.id).select("-password");
        next();
    }catch(error){
        next();
    }
}