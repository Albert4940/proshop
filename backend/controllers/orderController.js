import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//@desc Fetch all products
//@route GET /api/products
//@access Public
const addOrderItems = asyncHandler(async (req, res) => {
    res.send("add order items");
});

//@desc Fetch all products
//@route GET /api/products
//@access Public
const getMyOrders = asyncHandler(async (req, res) => {
    res.send("get My order");
});

//@desc Fetch all products
//@route GET /api/products
//@access Public
const getOrderById = asyncHandler(async (req, res) => {
    res.send("get order by Id");
});

//@desc Fetch all products
//@route GET /api/products
//@access Public
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send("update order to paid");
});

//@desc Fetch all products
//@route GET /api/products
//@access Public
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send("update order to delivered");
});

//@desc Fetch all products
//@route GET /api/products
//@access Public
const getOrders = asyncHandler(async (req, res) => {
    res.send("get All Orders");
});

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
}