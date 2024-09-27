
 'use client'


import React, { ChangeEvent, FormEvent, useState } from 'react';
import Styles from './payment.module.css'

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    alert(`Payment method selected: ${paymentMethod}`);
  };

  const handlePayment = async () => {
    try {
        const res = await fetch(`http://localhost:8000/api/payment/order`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                
            })
        });

        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

  return (
    <div className={Styles.container}>
      <h1>Payment Page</h1>
      <form onSubmit={handleSubmit} className={Styles.paymentForm}>
        <div className={Styles.field}>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="Cash on Delivery"
              checked={paymentMethod === 'Cash on Delivery'}
              onChange={handlePaymentChange}
            />
            Cash on Delivery
          </label>
        </div>
        <div className={Styles.field}>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="UPI"
              checked={paymentMethod === 'UPI'}
              onChange={handlePaymentChange}
            />
            UPI
          </label>
        </div>
        {paymentMethod === 'UPI' && (
          <div className={Styles.field}>
            <label>
              UPI ID:
              <input type="text" name="upiId" placeholder="Enter your UPI ID" required />
            </label>
          </div>
        )}
        <button type="submit" className={Styles.submitButton} onClick={handlePayment}>Submit</button>
      </form>
    </div>
  );
};

export default Payment;
