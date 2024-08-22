import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Teacher } from "../models/teacher.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { isValidUsername } from "../utils/userNameValidation.js";
import { isValidGmailAddress } from "../utils/validGmail.js";
import {
  RemovecloudinaryExistingImg,
  cloudinaryUploadImg,
} from "../utils/cloudinary.js";
import { extractId } from "../utils/extractCloudinaryId.js";
import { Student } from "../models/student.model.js";

// generate tokens
const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Failed to generate access and refresh tokens");
  }
};

// cookie oprions
const cookieOptions = {
  httpOnly: true,
  secure: true, // false because i don't have https ssl
  // secure: true, // false because i don't have https ssl
  sameSite: "None",
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};

// register
const registerUser = asyncHandler(async (req, res) => {
  // get data from frontend
  // check data empty ?
  // check email and username exists ?
  // check unique code matches the role
  // upload image to cloudinary
  // check if image uploaded?
  // create user in db
  // check user created ?
  // remove refreshToken and password from res
  // return a user

  const { username, email, password, fullName, firstName, role, uniqueCode } =
    req.body;

  if (
    [username, email, password, fullName, firstName, role, uniqueCode].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required"); // dont forget to call this ApiError with New Keyword
  }

  const existedUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existedUser) {
    throw new ApiError(
      409,
      "User with this email or username already exists !"
    );
  }

  if (role !== "student" && role !== "admin" && role !== "teacher") {
    throw new ApiError(400, "Invalid role !");
  }

  if (
    (role?.toLowerCase() === "student" &&
      uniqueCode?.trim() !== process.env.UNIQUE_CODE_STUDENT) ||
    (role?.toLowerCase() === "admin" &&
      uniqueCode?.trim() !== process.env.UNIQUE_CODE_ADMIN) ||
    (role?.toLowerCase() === "teacher" &&
      uniqueCode?.trim() !== process.env.UNIQUE_CODE_TEACHER)
  ) {
    throw new ApiError(400, `Invalid unique code for ${role} !`);
  }

  if (!isValidUsername(username)) {
    throw new ApiError(
      400,
      "Invalid username ! must contains one uppercase and 4 digits numbers "
    );
  }

  if (firstName?.length > 8) {
    throw new ApiError(
      400,
      "firstName Must be at least 8 characters or short ! "
    );
  } else if (fullName?.length > 21) {
    throw new ApiError(
      400,
      "fullName Must be at least 21 characters or short ! "
    );
  }

  if (!isValidGmailAddress(email)) {
    throw new ApiError(400, "Invalid email !");
  }

  const avatarLocalPath = req.file?.path;
  console.log(avatarLocalPath);
  if (!avatarLocalPath) {
    throw new ApiError(400, "Image is required !");
  }

  const avatar = await cloudinaryUploadImg(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Image is required !");
  }

  const user = await User.create({
    fullName,
    firstName,
    avatar: avatar.url,
    email,
    role,
    uniqueCode,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -uniqueCode"
  ); // remove these from res

  if (!createdUser) {
    throw new ApiError(400, "failed to create user !");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully !"));
});

// login
const loginUser = asyncHandler(async (req, res) => {
  // get data
  // check data empty ?
  // check user exists ?
  // check password matches ?

  const { username, email, password } = req.body;

  if (!username || !email) {
    throw new ApiError(400, "username and email  are required !");
  }

  if (!password) throw new ApiError(400, "password is required !");

  // find user email or username if any one is avaliable accepted
  // const user = await User.findOne({$or: [{email}, {username}]})

  const emailCheckUser = await User.findOne({
    email: email,
    username: username,
  });

  if (!emailCheckUser) {
    throw new ApiError(404, "invalid email or username !");
  }

  const validPassword = await emailCheckUser.comparePassword(password);

  if (!validPassword) {
    throw new ApiError(400, "Invalid password !");
  }
  //grenerate tokens
  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(emailCheckUser?._id); // dont forget to add await

  // retrieve and remove some fields
  const logedinUser = await User.findById(emailCheckUser?._id).select(
    "-password -refreshToken -uniqueCode"
  );

  if (!logedinUser) {
    throw new ApiError(400, "failed to loged in !");
  }
  // set isActive True
  const user = await User.findByIdAndUpdate(emailCheckUser?._id, {
    $set: {
      isActive: true,
    },
  });

  //set tokens in cookie

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { user: logedinUser, accessToken },
        "user loged in successfully"
      )
    );
});

// logout
const logoutUser = asyncHandler(async (req, res) => {
  // get the id of user from req body as we have saved it in auth middleware
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { new: true }
  );

  const setactiveFalse = await User.findOneAndUpdate(
    {
      _id: req.user?._id,
    },
    {
      $set: {
        isActive: false,
      },
    }
  );

  if (!user) {
    throw new ApiError(400, "failed to logout !");
  }

  return res
    .status(200)
    .clearCookie("refreshToken")
    .clearCookie("accessToken")
    .json(new ApiResponse(200, {}, "user loged out successfully !"));
});

// refresh accessToken
const refreshAccessToken = asyncHandler(async (req, res) => {
  // get refresh token stored in cookie
  const incommingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;

  // if token is not found
  if (!incommingRefreshToken) {
    throw new ApiError(401, "Unauthorized !");
  }

  // if it is found simply decode it
  const decodedToken = jwt.verify(
    incommingRefreshToken,
    process.env.JWT_REFRESH_SECRET
  );

  // find user by id stored in decoded token
  const findedUser = await User.findById(decodedToken?._id);

  if (!findedUser) {
    throw new ApiError(401, "invalid refresh token !");
  }

  // check wethere the provided access token matches the stored refresh token in db doc of user

  if (incommingRefreshToken !== findedUser?.refreshToken) {
    throw new ApiError(401, "invalid refresh token or expired !");
  }

  // now generate a tokens new accessToken and RefreshToken
  const { accessToken, newRefreshToken } =
    await generateAccessTokenAndRefreshToken(findedUser?._id);

  return res
    .status(200)
    .cookie("refreshToken", newRefreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken: newRefreshToken },
        "access token refreshed successfully !"
      )
    );
});

// get current user details
const getCurrentUser = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.user?._id).select("-password -refreshToken -uniqueCode")

  if (!req?.user) {
    throw new ApiError(404, "User not found !");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, req?.user, "user details fetched successfully !")
    );
});

// change user password
const changePassword = asyncHandler(async (req, res) => {
  const { newPassword, oldPassword } = req.body;

  if (!newPassword || !oldPassword) {
    throw new ApiError(400, "All fields are required !");
  }

  const user = await User.findById(req.user?._id);

  const validPassword = await user.comparePassword(oldPassword);

  if (!validPassword) {
    throw new ApiError(400, "Invalid old password !");
  }
  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "password updated successfully !"));
});

// update user profile
const updateProfile = asyncHandler(async (req, res) => {
  const { fullName, email, username } = req.body;

  if ((!fullName && !email) || !username) {
    throw new ApiError(400, "All fields are required !");
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email,
        username,
      },
    },
    { new: true }
  ).select("-password -uniqueCode");

  if (!user) {
    throw new ApiError(404, "failed to update user profile !");
  }

  // find teacher
  const findTeacherWithFullNameAndEmail = await Teacher.findOne({
    fullName: req?.user?.fullName,
    email: req?.user?.email,
  });

  if (findTeacherWithFullNameAndEmail !== null) {
    const updateTeacher = await Teacher.findByIdAndUpdate(
      findTeacherWithFullNameAndEmail?._id,
      {
        $set: {
          fullName: fullName,
          email: email,
        },
      }
    );

    if (!updateTeacher) {
      throw new ApiError(404, "failed to update user profile !");
    }
  }

  // find student
  const findStudentWithFullNameAndEmail = await Student.findOne({
    fullName: req?.user?.fullName,
    email: req?.user?.email,
  });

  if (findStudentWithFullNameAndEmail !== null) {
    const updateStudent = await Student.findByIdAndUpdate(
      findStudentWithFullNameAndEmail?._id,
      {
        $set: {
          fullName: fullName,
          email: email,
        },
      }
    );

    if (!updateStudent) {
      throw new ApiError(404, "failed to update user profile !");
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "user profile updated successfully !"));
});

// update user avatar
const updateAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file ? req.file?.path : null;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Image is required !");
  }

  const avatar = await cloudinaryUploadImg(avatarLocalPath);

  if (!avatar?.url) {
    throw new ApiError(400, "Image is required !");
  }

  if (req.user?.avatar !== "") {
    const publicId = extractId(req.user?.avatar);
    await RemovecloudinaryExistingImg(publicId);
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password -uniqueCode");

  if (!user) {
    throw new ApiError(404, "failed to update user avatar !");
  }

  const getUserAgain = await User.findById(req.user?._id).select("-password -uniqueCode");;
  if (!getUserAgain) {
    throw new ApiError(404, "failed to update user avatar !");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, getUserAgain, "user avatar updated successfully !"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  changePassword,
  updateProfile,
  updateAvatar,
};
