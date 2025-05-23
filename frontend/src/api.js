const API_BASE = process.env.REACT_APP_API_URL 

// Utility function to get the JWT token from localStorage or sessionStorage
const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};



// Create a new booking
export const createBooking = async (bookingData) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(bookingData),
    });

    if (!res.ok) throw new Error("Failed to create booking");
    return await res.json();
  } catch (err) {
    console.error("API error (createBooking):", err);
    return null;
  }
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

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/flights/search${query}`);
    if (!response.ok) throw new Error("Flight data fetch failed");

    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    return [];
  }
};



// Fetch flight details by ID
export const fetchFlightDetails = async (flightId, token) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/flights/${flightId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) throw new Error("Failed to fetch flight details");

    return await res.json();
  } catch (err) {
    console.error("API error (fetchFlightDetails):", err);
    return null;
  }
};


export const getAllFlights = async () => {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/flights`, {
      headers,
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch flights. Status: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error fetching flights:", err);
    return [];
  }
};

// Get all flights (admin gets all, users get active flights)
// export const getAllFlights = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     const headers = token ? { Authorization: `Bearer ${token}` } : {};

//     const res = await fetch(`${process.env.REACT_APP_API_URL}/api/flights`, {
//       headers,
//     });

//     if (!res.ok) {
//       throw new Error(`Failed to fetch flights. Status: ${res.status}`);
//     }

//     const data = await res.json();
//     return data;
//   } catch (err) {
//     console.error("Error fetching flights:", err);
//     return [];
//   }
// };

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


// Create passenger
export const createPassenger = async (passengerData) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/passengers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(passengerData),
  });

  if (!res.ok) throw new Error('Failed to create passenger');
  return await res.json();
};

// Add an API Function to Fetch Passengers by Flight ID
export const getPassengersByFlight = async (flightId) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/passengers/flight/${flightId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch passengers');
    }

    return await res.json();
  } catch (err) {
    console.error('Error fetching passengers:', err);
    return [];
  }
};
