import React from "react";
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";
import dotenv from "dotenv";
dotenv.config()
const stripePromise = loadStripe(process.env.REACT_APP_PK);
console.log(process.env.REACT_APP_PK)


function BookingsList({ name, time, mobile, artists, price, quantity }) {

    const handleClick = async (event) => {
        // Get Stripe.js instance
        const stripe = await stripePromise;
    
        // Call your backend to create the Checkout Session
        const response = await axios.post("http://localhost:4242/create-checkout-session", {name:name, price:price, quantity:quantity})
        /* ('/create-checkout-session', { method: 'POST' }); */
        console.log(response)
        const sessionId = response.data.id
    
        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
          sessionId: sessionId,
        });
    
        if (result.error) {
          <p>{result.error.message}</p>
        }
      };

  return (
      <>
    <div>
      <br />
      Name : {name}
      <br />
      Time : {time}
      <br />
      Phone Number : {mobile}
      <br />
      Artist : {artists}
      <br />
      Price : {price}
      <br/>
    </div>
    <button role="link" onClick={handleClick}>
      Checkout
    </button>
    </>
  );
}

export default BookingsList;
