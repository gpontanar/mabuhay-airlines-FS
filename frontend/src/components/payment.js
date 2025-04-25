import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { passenger, flightId, userId, price } = state;

  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cardNumber || !expiryDate || !cvv) {
      alert('Please fill in all payment details');
      return;
    }

    try {
      const paymentData = {
        ticketId: passenger._id,     
        amount: price,
        paymentStatus: 'completed',
      };

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const data = await res.json();

      if (res.ok) {
        setIsPaymentSuccessful(true);

        
        setTimeout(() => {
          navigate('/booking-confirmation', {
            state: {
              passenger,
              flightId,
              userId,
              price,
              payment: data.payment,
              ticket: data.ticket,
            },
          });
        }, 1500);
      } else {
        alert(data.error || 'Payment failed. Please try again.');
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="container my-5">
      <h2>Payment Information</h2>
      <div className="row">
        <div className="col-md-6">
          {isPaymentSuccessful ? (
            <div className="alert alert-success">
              Payment was successful! Redirecting to booking confirmation...
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  className="form-control"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Enter your card number"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                <input
                  type="month"
                  id="expiryDate"
                  className="form-control"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cvv" className="form-label">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  className="form-control"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="Enter CVV"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                <select
                  id="paymentMethod"
                  className="form-select"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit Payment
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
