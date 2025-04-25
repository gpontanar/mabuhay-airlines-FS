import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const BookingConfirmation = () => {
  const { state } = useLocation();
  const { passenger, flight, ticket } = state;

  const pdfRef = useRef();

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

  return (
    <div className="container my-5 text-center">
      <h2>Booking Confirmed!</h2>
      <p className="text-success">Your ticket has been successfully booked.</p>

      <div ref={pdfRef} className="border p-4 my-4 shadow" style={{ display: 'inline-block', backgroundColor: '#fff' }}>
        <h4>Passenger Information</h4>
        <p><strong>Name:</strong> {passenger.firstName} {passenger.lastName}</p>
        <p><strong>Gender:</strong> {passenger.gender}</p>
        <p><strong>DOB:</strong> {new Date(passenger.dateOfBirth).toLocaleDateString()}</p>

        <h4 className="mt-4">Flight Details</h4>
        <p><strong>From:</strong> {flight.from}</p>
        <p><strong>To:</strong> {flight.to}</p>
        <p><strong>Departure:</strong> {new Date(flight.departure).toLocaleString()}</p>
        <p><strong>Arrival:</strong> {new Date(flight.arrival).toLocaleString()}</p>

        <h4 className="mt-4">Ticket</h4>
        <p><strong>Seat:</strong> {ticket.seatNumber}</p>
        <p><strong>Price:</strong> ${ticket.price}</p>
        <p><strong>Issue Date:</strong> {new Date(ticket.issueDate).toLocaleDateString()}</p>

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
