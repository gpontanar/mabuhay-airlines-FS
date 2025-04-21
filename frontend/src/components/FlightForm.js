import React, { useState, useEffect } from "react";

const FlightForm = ({ onSubmit, flight, clearForm }) => {
  const [formData, setFormData] = useState({
    airline: "",
    departure: "",
    arrival: "",
    from: "",
    to: "",
    availableSeats: 0,
    cabinClasses: [],
    price: 0,
  });

  useEffect(() => {
    if (flight) {
      setFormData(flight);
    } else {
      setFormData({
        airline: "",
        departure: "",
        arrival: "",
        from: "",
        to: "",
        availableSeats: 0,
        cabinClasses: [],
        price: 0,
      });
    }
  }, [flight]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cabinClasses") {
      setFormData({ ...formData, [name]: value.split(",") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (flight) {
      onSubmit(flight._id, formData);
    } else {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="airline" placeholder="Airline ID" value={formData.airline} onChange={handleChange} />
      <input name="departure" type="datetime-local" value={formData.departure} onChange={handleChange} />
      <input name="arrival" type="datetime-local" value={formData.arrival} onChange={handleChange} />
      <input name="from" placeholder="From" value={formData.from} onChange={handleChange} />
      <input name="to" placeholder="To" value={formData.to} onChange={handleChange} />
      <input name="availableSeats" type="number" value={formData.availableSeats} onChange={handleChange} />
      <input name="cabinClasses" placeholder="Cabin Classes (comma-separated)" value={formData.cabinClasses.join(",")} onChange={handleChange} />
      <input name="price" type="number" value={formData.price} onChange={handleChange} />
      <button type="submit">{flight ? "Update" : "Create"} Flight</button>
      {flight && <button type="button" onClick={clearForm}>Cancel</button>}
    </form>
  );
};

export default FlightForm;
