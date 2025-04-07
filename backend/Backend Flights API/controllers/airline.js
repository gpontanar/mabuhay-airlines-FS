const Airline = require('../models/Airline');

exports.getAllAirlines = async (req, res) => {
  try {
    const airlines = await Airline.find();  
    console.log('Airlines fetched:', airlines); 
    if (airlines.length === 0) {
      return res.status(404).json({ message: 'No airlines found' });  
    }
    res.status(200).json(airlines);  
  } catch (error) {
    console.error('Error fetching airlines:', error); 
    res.status(500).json({ message: 'Failed to fetch airlines', error });
  }
};


exports.getAirlineById = async (req, res) => {
  try {
    const airline = await Airline.findById(req.params.id);
    if (!airline) return res.status(404).json({ error: "Airline not found" });
    res.json(airline);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createAirline = async (req, res) => {
  try {
    const { name, country, logo, contact } = req.body;  

   
    if (!name || !country || !contact) {
      return res.status(400).json({ message: 'Name, country, and contact are required' });
    }

    
    const newAirline = new Airline({
      name,
      country,
      logo,
      contact
    });

   
    await newAirline.save();

    res.status(201).json({
      message: 'Airline created successfully!',
      airline: newAirline
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create airline', error });
  }
};