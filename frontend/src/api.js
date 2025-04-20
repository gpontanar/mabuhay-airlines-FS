// src/api.js
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:4000";

export const fetchFlightsData = async (departureCity, destinationCity, departureDate, cabinClass) => {
  try {
    let query = "";

    if (departureCity && destinationCity && departureDate && cabinClass) {
      query = `?from=${departureCity}&to=${destinationCity}&date=${departureDate}&class=${cabinClass}`;
    }

    const response = await fetch(`${API_BASE}/api/flights${query}`);
    if (!response.ok) throw new Error("Flight data fetch failed");

    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    return [];
  }
};
