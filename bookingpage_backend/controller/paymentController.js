
import Razorpay from 'razorpay';
import crypto from 'crypto';
import 'dotenv/config';
import paymentModel from '../model/paymentModel.js';


const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});


export const createOrder = async(req,res)=>{
    const { amount } = req.body;

    try {
        const options = {
            amount: Number(amount *100 ),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json({ data: order });
            console.log(order)
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
}


export const verifyOrder = async(req,res)=>{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;


    try {
        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSign = crypto.createHmac("sha256", ({}).RAZORPAY_SECRET)
            .update(sign.toString())
            .digest("hex");


        const isAuthentic = expectedSign === razorpay_signature;

        if (isAuthentic) {
            const payment = new paymentModel({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            });

            await payment.save();

            res.json({
                message: "Payement Successfully"
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
}
