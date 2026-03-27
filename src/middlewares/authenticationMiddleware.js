import 'dotenv/config'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
export const authenticationMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: `Token must be provided`
            })
        }
        const token = authHeader.split(" ")[1];
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();


    } catch (error) {
        
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }
}

export const authorizationMiddleware =async (req,res,next)=>{
    try {
        const requestedId = parseInt(req.params.id);
        const userId = req.user.id;
        const userToUpdate = await User.findByPk(requestedId)
        if(!userToUpdate){
            return res.status(404).json({
                message:'User not found'
            })
        }
        if(userId !== requestedId){
            return res.status(403).json({
                message:'Access denied you can only update your own profile'
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}