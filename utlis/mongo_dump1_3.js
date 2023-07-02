


// // for pushing message fron file name 5 
import fs from 'fs';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import Ship from '../models/shipModel.js';
// for pushing the data from file(type3)



(async () => {
    try {
      await mongoose.connect('mongodb://localhost/ais', { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to the database');
  
      const filePath = 'file13.csv';
      let count = 0;
      let isFirstRow = true;
  
      const stream = fs.createReadStream(filePath)
        .pipe(csv({
          mapHeaders: ({ header }) => header.trim(),
          quote: "'",
          escape: "'",
        }));
  
      for await (const row of stream) {
        if (isFirstRow) {
          isFirstRow = false;
          continue; // Skip the header row
        }
  
        const messageType = parseInt(row['Type']); // Access the 'Type' column and convert to integer
        if (messageType === 1 || messageType === 3) {
          const data = row;
          const {
            Timestamp,
            Type,
            MMSI,
            NavigationStatus,
            TurnRate,
            SpeedOverGround,
            PositionAccuracy,
            Latitude,
            Longitude,
            COG,
            Heading,
            ROT,
            ManeuverIndicator
          } = data;
  
          const existingShip = await Ship.findOne({ mmsi: parseInt(MMSI) });
  
          if (existingShip) {
            existingShip.aisMessagesType1_3.push({
              "Timestamp": new Date(Timestamp) || null,
              "Type": parseInt(Type) || null,
              "MMSI": parseInt(MMSI) || null,
              "NavigationStatus": NavigationStatus || null,
              "TurnRate": String(TurnRate) || '0',
              "SpeedOverGround": parseFloat(SpeedOverGround) || 0,
              "PositionAccuracy": PositionAccuracy === "True",
              "lat": String(Latitude) || null,
              "lng":String(Longitude) || null,
              "COG": parseInt(COG) || 0,
              "Heading": parseInt(Heading) || 0,
              "ROT": parseInt(ROT) || 0,
              "ManeuverIndicator": ManeuverIndicator || null
            });
  
            await existingShip.save();
            console.log('AIS message added to existing ship');
          } else {
            // Ship does not exist, create a new ship document
            const shipData = {
              name: String(null),
              imo: String(null),
              mmsi: parseInt(MMSI),
              timestamp: new Date(Timestamp),
              aisMessagesType3: [{
                "Timestamp": new Date(Timestamp) || null,
                "Type": parseInt(Type) || null,
                "MMSI": parseInt(MMSI) || null,
                "NavigationStatus": NavigationStatus || null,
                "TurnRate": String(TurnRate) || '0',
                "SpeedOverGround": parseFloat(SpeedOverGround) || 0,
                "PositionAccuracy": PositionAccuracy === "True",
                "lat": String(Latitude) || null,
                "lng":String(Longitude) || null,
                "COG": parseInt(COG) || 0,
                "Heading": parseInt(Heading) || 0,
                "ROT": parseInt(ROT) || 0,
                "ManeuverIndicator": ManeuverIndicator || null
              }],
              aisMessagesType5: []
            };
  
            const ship = new Ship(shipData);
            await ship.save();
            console.log('New ship created with AIS message');
          }
        }
        count++;
      }
  
      console.log(`Count: ${count}`);
      mongoose.connection.close();
      console.log('Database connection closed');
    } catch (error) {
      console.error('Error:', error);
    }
  })();
  