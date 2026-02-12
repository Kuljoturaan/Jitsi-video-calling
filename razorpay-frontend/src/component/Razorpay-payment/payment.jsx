import React from "react";
import "./styles/payment.css";

const Payment = () => {
  const checkoutHandler = async () => {
    const API_URL = process.env.REACT_APP_API_URL;
    try {
      const response = await fetch(`${API_URL}/api/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 10 }),
      });

      const resData = await response.json();
      if (resData.success) {
        const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY_ID;
        const options = {
          key: razorpayKey,
          amount: resData.data.amount,
          currency: resData.data.currency,
          name: "My Test Store",
          description: "Testing Razorpay",
          order_id: resData.data.id,
          handler: async function (response) {
            console.log("---------- PAYMENT SUCCESS DATA ----------");
            console.log("1. Order ID: ", response.razorpay_order_id);
            console.log("2. Payment ID: ", response.razorpay_payment_id);
            console.log("3. Signature: ", response.razorpay_signature);
            console.log("------------------------------------------");
            alert(`Order ID: ${response.razorpay_order_id}`);
            alert(`Payment ID: ${response.razorpay_payment_id}`);
            alert(`Signature: ${response.razorpay_signature}`);
            const verifyRes = await fetch(`${API_URL}/api/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: 10,
              }),
            });
            const verifyData = await verifyRes.json();
            alert(verifyData.message);
          },
          theme: { color: "#3399cc" },
          config: {
            display: {
              hide: [
                {
                  method: "wallet",
                },
                {
                  method: "paylater",
                },
                {
                  method: "emi",
                },
              ],
            },
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (response) {
          console.error("Payment Failed Logic Hit:", response.error);
          alert("Payment Failed! Reason: " + response.error.description);
        });
        rzp.open();
      } else {
        alert("Order not created: " + resData.message);
      }
    } catch (error) {
      console.error("popup open error:", error);
      alert("Something error check console");
    }
  };

  return (
    <div className="pay-box">
      <h3>Razorpay Payment</h3>
      <p>Total: ₹10</p>
      <button className="btn-pay" onClick={checkoutHandler}>
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
