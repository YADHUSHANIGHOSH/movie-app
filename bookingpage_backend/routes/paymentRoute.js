import express from "express"
import { createOrder,verifyOrder } from "../controller/paymentController.js"

const payrouter = express.Router()

payrouter.post("/order",createOrder);
payrouter.post("/verify",verifyOrder);


export default payrouter
