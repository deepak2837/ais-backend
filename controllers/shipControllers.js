import Ship from '../models/shipModel.js';
import Shipsdata from '../models/shipdataModel.js';
export  const getShips = async (req, res) => {
  try {
    const ships = await Ship.find(); // Retrieve all ships from the "ships" collection

    res.json(ships); // Send the ship data as a JSON response
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};




export const getShipsdata = async (req, res) => {
    try {
      const ships = await Shipsdata.find(); // Retrieve all ships from the "ships" collection
  
      res.json(ships); // Send the ship data as a JSON response
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  





  export const getShipsmarkerdata = async (req, res) => {
    try {
      const ships = await Ship.find(); // Retrieve all ships from the "ships" collection
      const formattedShips = ships
        .map((ship) => {
          const { aisMessagesType1_3 } = ship;
          const { lat, lng } = aisMessagesType1_3[0] || {};
  
          // Check if lat and lng are defined before including the ship in the formattedShips array
          if (lat !== undefined && lng !== undefined) {
            const { name, mmsi, timestamp } = ship;
            const truncatedTimestamp = timestamp.toString().slice(4, -34);
            // Check if the MMSI number is valid
            if (isValidMMSI(mmsi)) {
              return {
                name,
                lat,
                lng,
                mmsi,
                "timestamp": truncatedTimestamp,
              };
            }
          }
  
          return null; // Exclude the ship from the formattedShips array
        })
        .filter((ship) => ship !== null); // Remove null values from the array
  
      res.json(formattedShips); // Send the ship data as a JSON response
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Function to validate the MMSI number
  const isValidMMSI = (mmsi) => {
    // Perform your validation logic here
    // You can check the length, format, or perform additional checks as per your requirements
    return mmsi.toString().length === 9;
  };
  

  export const getallmmsi = async (req, res) => {
    try {
      const ships = await Shipsdata.find(); // Retrieve all ships from the "ships" collection
      const validMMSI = ships
        .map((ship) => ship.mmsi) // Extract the MMSI number from each ship object
        .filter((mmsi) => isValidMMSI(mmsi)); // Filter out only valid MMSI numbers
    
      res.json(validMMSI); // Send the valid MMSI numbers as a JSON response
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  export const getdetails = async (req, res) => {
    try {
      const { mmsi } = req.params; // Destructure the MMSI number from the URL parameters
  
      // Fetch the ship data based on the MMSI number
      const ship = await Shipsdata.findOne({ mmsi });
  console.log(ship)
      if (!ship) {
        // If no ship is found with the provided MMSI number, return a 404 error
        return res.status(404).json({ error: 'Ship not found' });
      }
  
      // Remove the specified fields from the ship data
      const { __v, ShipsdataName, ...shipWithoutFields } = ship._doc;
  
      res.json(shipWithoutFields);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  