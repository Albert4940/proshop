import express from "express";
import { authUser, deleteUser, getUserById, getUserProfile, getUsers, logoutUser, registerUser, updateUser, updateUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.route('/').get(getUsers).post(registerUser)
router.post('/auth',authUser);
router.post('/logout',logoutUser)
router
    .route('/profile')
    .get(getUserProfile)
    .put(updateUserProfile)
router
    .route("/:id")
    .delete(deleteUser)
    .get(getUserById)
    .put(updateUser)

export default router;