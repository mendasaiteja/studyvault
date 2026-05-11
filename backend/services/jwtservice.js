import jwt from "jsonwebtoken";

const verifyToken=((token)=>{
    try{
        return jwt.verify(token,process.env.JWT_SECRET);
    }catch(error){
        console.log("Token verification failed",error.message);
    }
});

export default verifyToken;