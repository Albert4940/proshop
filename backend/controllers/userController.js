import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'

//@desc Auth user & get token
//@route POST /api/users/auth
//@access Public
export const authUser = asyncHandler(async (req, res) => {
    res.send("Auth User");
})

//@desc Register a new user & get token
//@route POST /api/users/auth
//@access Public
export const registerUser = asyncHandler(async (req, res) => {
    res.send("register User");
})

//@desc Auth user & get token
//@route POST /api/users/auth
//@access Public
export const logoutUser = asyncHandler(async (req, res) => {
    res.send("Logout User");
})

//@desc Auth user & get token
//@route POST /api/users/auth
//@access Public
export const updateUserProfile = asyncHandler(async (req, res) => {
    res.send("Update User Profile");
})

//@desc Auth user & get token
//@route POST /api/users/auth
//@access Public
export const getUserProfile = asyncHandler(async (req, res) => {
    res.send("Get User Profile");
})

//@desc Auth user & get token
//@route POST /api/users/auth
//@access Public
export const getUsers = asyncHandler(async (req, res) => {
    res.send("Get Users");
})

//@desc Auth user & get token
//@route POST /api/users/auth
//@access Public
export const deleteUser = asyncHandler(async (req, res) => {
    res.send("Delete User");
})

//@desc Auth user & get token
//@route POST /api/users/auth
//@access Public
export const getUserById = asyncHandler(async (req, res) => {
    res.send("Get User By Id");
})

//@desc Auth user & get token
//@route POST /api/users/auth
//@access Public
export const updateUser = asyncHandler(async (req, res) => {
    res.send("Update User");
})