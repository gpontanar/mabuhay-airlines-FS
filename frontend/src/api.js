const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:4000";

// Utility function to get the JWT token from localStorage or sessionStorage
const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

// User-side flight search
export const fetchFlightsData = async (
  departureCity,
  destinationCity,
  departureDate,
  cabinClass
) => {
  try {
    let query = "";

    if (departureCity && destinationCity && departureDate && cabinClass) {
      query = `?from=${departureCity}&to=${destinationCity}&date=${departureDate}&class=${cabinClass}`;
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/flights${query}`);
    if (!response.ok) throw new Error("Flight data fetch failed");

    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    return [];
  }
};

// Admin: Get all flights (returns an array directly)
export const getAllFlights = async () => {
  try {
    const token = getToken(); // Get the token
    if (!token) {
      throw new Error("No token available for authentication.");
    }

    // Fetch data from the API
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/flights/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to get flights. Status: ${res.status}`);
    }

    // Parse the response JSON
    const data = await res.json();

    // Handle case where no data is returned
    if (!Array.isArray(data)) {
      console.error("Unexpected API response format:", data);
      return [];
    }

    return data; // Return the flight data array
  } catch (err) {
    console.error("Admin API error (getAllFlights):", err);
    return []; // Fallback to empty array if error occurs
  }
};

// Admin: Create flight
export const createFlight = async (flightData) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/flights`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(flightData),
    });
    if (!res.ok) throw new Error("Failed to create flight");
    return await res.json();
  } catch (err) {
    console.error("Admin API error (createFlight):", err);
    return null;
  }
};

// Admin: Update flight
export const updateFlight = async (id, flightData) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/flights/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(flightData),
    });
    if (!res.ok) throw new Error("Failed to update flight");
    return await res.json();
  } catch (err) {
    console.error("Admin API error (updateFlight):", err);
    return null;
  }
};

// Admin: Delete flight
export const deleteFlight = async (id) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/flights/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error("Failed to delete flight");
    return await res.json();
  } catch (err) {
    console.error("Admin API error (deleteFlight):", err);
    return null;
  }
};
export const toggleArchiveFlight = async (id) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/flights/${id}/toggle-archive`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    if (!res.ok) throw new Error("Failed to toggle archive status");
    return await res.json();
  } catch (err) {
    console.error("Admin API error (toggleArchiveFlight):", err);
    return null;
  }
};
