import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";

// Create a rate limiter
export const registerLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 6, // limit each IP to 4 requests per windowMs
  handler: (req, res, next) => {
    // Use the ApiError class to create a custom error
    next(
      new ApiError(
        429,
        "Too many registration requests. Please try again later."
      )
    );
  },
  keyGenerator: (req) => req.ip, // Use IP address for rate limiting
});


export const jwtVerify = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized no token !");
    }

    // decode the token
    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // find user by id in decoded token
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken -uniqueCode"
    );

    if (!user) {
      throw new ApiError(401, "invalid access token !");
    }

    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "invalid access token !");
  }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user?.role !== "admin") {
    throw new ApiError(403, "forbidden Access Denied !");
  }
  next();
});

export const BothTeacherAdmin = asyncHandler(async (req, res, next) => {
  if (req.user?.role !== "admin" && req.user?.role !== "teacher") {
    throw new ApiError(403, "forbidden Access Denied !");
  }
  next();
});

export const isTeacher = asyncHandler(async (req, res, next) => {
  if (req.user?.role !== "teacher") {
    throw new ApiError(403, "forbidden Access Denied !");
  }
  next();
});

export const isStudent = asyncHandler(async (req, res, next) => {
  if (req.user?.role !== "student") {
    throw new ApiError(403, "forbidden Access Denied !");
  }
  next();
});
