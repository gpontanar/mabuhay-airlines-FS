import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const BookingConfirmation = () => {
  const { state } = useLocation();
  const { passenger, flight, flightId, ticket, passengerCount, cabinClass, price, tax} = state || {};
  const count = passengerCount || 1; 
  const pricePerPassenger = price && count ? (price / count) : (flightDetails?.price || 0);
  const [flightDetails, setFlightDetails] = useState(flight || null);
  const pdfRef = useRef();
  
  useEffect(() => {
    if (!flightDetails && flightId) {
      fetch(`${process.env.REACT_APP_API_URL}/api/flights/${flightId}`)
        .then(res => res.json())
        .then(data => setFlightDetails(data))
        .catch(() => setFlightDetails(null));
    }
  }, [flightDetails, flightId]);

  const handleDownloadPdf = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('ticket.pdf'); 
  };

  if (!passenger || !ticket || !flightDetails) {
    return <div>Loading booking details...</div>;
  }
  const basePrice = Number(flightDetails.price) || 0;
  const taxAmount = Math.round(basePrice * 0.12);
  const totalPrice = basePrice + taxAmount;
    

  return (
    <div className="container my-5 text-center">
      <h2>Booking Confirmed!</h2>
      <p className="text-success">Your flight has been successfully booked.</p>
      <p className="text-info">Please find your ticket details below:</p>
      <div ref={pdfRef} className="border p-4 my-4 shadow" style={{ display: 'inline-block', backgroundColor: '#fff' }}>
        <h4>Passenger Information</h4>
        <p><strong>Name:</strong> {passenger.firstName} {passenger.lastName}</p>
        <p><strong>Gender:</strong> {passenger.gender}</p>
        <p><strong>DOB:</strong> {new Date(passenger.dateOfBirth).toLocaleDateString()}</p>

        <h4 className="mt-4">Flight Details</h4>
        <p><strong>From:</strong> {flightDetails.from}</p>
        <p><strong>To:</strong> {flightDetails.to}</p>
        <p><strong>Departure:</strong> {new Date(flightDetails.departure).toLocaleString()}</p>
        <p><strong>Arrival:</strong> {new Date(flightDetails.arrival).toLocaleString()}</p>

        <h4 className="mt-4">Ticket</h4>
        <p><strong>Seat Number:</strong> {ticket.seatNumber}</p>
        <p><strong>Flight Price:</strong> ₱{flightDetails.price}</p>
    
        <p><strong>Tax (12% VAT):</strong> ₱{taxAmount.toLocaleString()}</p>
        <p><strong>Total Price:</strong> ₱{totalPrice.toLocaleString()}</p>
        <p><strong>Issue Date:</strong> {ticket.issueDate ? new Date(ticket.issueDate).toLocaleString() : 'N/A'}</p>

        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?data=${ticket._id}&size=150x150`}
          alt="QR Code"
          className="mt-3"
        />
      </div>

      <button className="btn btn-primary mt-3" onClick={handleDownloadPdf}>
        Download Ticket as PDF
      </button>
    </div>
  );
};

export default BookingConfirmation;