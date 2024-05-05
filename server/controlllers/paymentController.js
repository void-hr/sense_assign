const User = require("../models/userSchema");
const { v4: uuidv4 } = require('uuid');

const newOrderId = async (req, res) => {
    try {
        const { bill, userID } = req.body;
        const userDetails = await User.findOne({_id: userID});
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'x-api-version': '2023-08-01',
                'content-type': 'application/json',
                'x-client-id': process.env.CASHFREE_APP_ID,
                'x-client-secret': process.env.CASHFREE_SECRET_KEY,
            },
            body: JSON.stringify({
                customer_details: {
                    customer_id: userDetails?._id,
                    customer_name: userDetails?.firstName + userDetails?.lastName ,
                    customer_email: userDetails?.email,
                    customer_phone: '9025484452'
                },
                order_id: uuidv4(),
                order_amount: bill,
                order_currency: 'INR'
            })
        };

        fetch('https://sandbox.cashfree.com/pg/orders', options)
            .then(response => response.json())
            .then(response => res.status(200).json({sessionID:response.payment_session_id}))
            .catch(err => console.error(err));
           
    } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', status: 'ERROR' });

    }
}

module.exports = { newOrderId }