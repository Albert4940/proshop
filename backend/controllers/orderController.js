import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//@desc Fetch all products
//@route GET /api/products
//@access Public
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error('No order items');
    }else{
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
        
});

//@desc Fetch all products
//@route GET /api/products
//@access Public
const getMyOrders = asyncHandler(async (req, res) => {
   const orders = await Order.find({user: req.user._id})
   res.status(200).json(orders);
});

//@desc Fetch all products
//@route GET /api/products
//@access Public
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order){
        res.status(200).json(order);
    }else{
        res.status(404);
        throw new Error('Order not found');
    }
    
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