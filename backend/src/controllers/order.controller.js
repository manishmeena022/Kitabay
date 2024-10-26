const Order = require("../models/order.model")

const createOrder = async (req, res) => {
    try {
        const { name, email, address, phone, productIds, totalPrice } = req.body;

        if (!name || !email || !address || !phone || !productIds || !totalPrice) {
            return res.status(400).json({ message: 'All Fields are required' })
        }

        const newOrder = new Order({
            name,
            email,
            address: {
                city: address.city,
                country: address.country,
                state: address.state,
                zipCode: address.zipCode
            },
            phone,
            productIds,
            totalPrice
        })

        const saveOrder = await newOrder.save();

        return res.status(201).json(saveOrder);
    } catch (error) {
        console.error('Error creating order :', error);
        return res.status(500).json({
            message: 'Server error',
            error: error.message
        })
    }
}


const getOrderByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' })
        }

        const orders = await Order.find({ email }).sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this email' })
        }

        return res.status(200).json(orders)

    } catch (error) {
        console.error("Error fetching order by email:", error);
        return res.status(500).json({
            message: 'Server error',
            error: error.message
        })
    }
}

module.exports = { createOrder, getOrderByEmail }