import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt  from "jsonwebtoken";

export const jwtVerify = asyncHandler(async (req, res, next) => {
try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if(!token){
            throw new ApiError(401, "Unauthorized no token !")
        }
    
        // decode the token 
        const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    
        // find user by id in decoded token
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken -uniqueCode")
    
        if(!user){
            throw new ApiError(401, "invalid access token !")
        }
    
        req.user = user
    
       next()
} catch (error) {
        throw new ApiError(401, error?.message || "invalid access token !")
}
})


export const isAdmin = asyncHandler(async (req, res, next) => {
    if(req.user?.role !== "admin"){
        throw new ApiError(403, "forbidden Access Denied !")
    }
    next()

})


export const BothTeacherAdmin = asyncHandler(async (req, res, next) => {
    if(req.user?.role !== "admin" && req.user?.role !== "teacher"){
        throw new ApiError(403, "forbidden Access Denied !")
    }
    next()

})


export const isTeacher = asyncHandler(async (req, res, next) => {
    if(req.user?.role !== "teacher"){
        throw new ApiError(403, "forbidden Access Denied !")
    }
    next()

})



export const isStudent = asyncHandler(async (req, res, next) => {
    if(req.user?.role !== "student"){
        throw new ApiError(403, "forbidden Access Denied !")
    }
    next()

})