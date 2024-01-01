import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken';
//@desc Auth user & get token
//@route POST /api/users/auth
//@access Public
export const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        const token = jwt.sign(
            {userId: user._id}, 
            process.env.JWT_SECRET,
            {expiresIn:'30d'});
        
        res.cookie('jwt', token,{
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }else {
        res.status(401);
        throw new Error('Invalid email or password')
    }

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