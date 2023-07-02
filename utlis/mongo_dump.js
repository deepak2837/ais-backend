

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

    const stream = fs.createReadStream('file5.csv')
      .pipe(csv());

    for await (const row of stream) {
      const messageType = parseInt(row['Type']);
      if (messageType === 5) {
        const data = row;

        const {
          Date_Time,
          Type,
          MMSI,
          IMO,
          CallSign,
          Name,
          TypeOfShipAndCargoType,
          DimensionToBow,
          DimensionToStern,
          DimensionToPort,
          DimensionToStarboard,
          TypeOfElectronicPositionFixingDevice,
          ETAMonthUTC,
          ETADayUTC,
          ETAHourUTC,
          ETAMinuteUTC,
          Destination,
        } = data;

        const existingShip = await Ship.findOne({ imo: IMO, mmsi: parseInt(MMSI) });

        if (existingShip) {
          // Ship already exists, update the aisMessagesType5 array
          existingShip.aisMessagesType5.push({
            TypeOfShipAndCargoType,
            DimensionToBow,
            DimensionToStern,
            DimensionToPort,
            DimensionToStarboard,
            TypeOfElectronicPositionFixingDevice,
            ETAMonthUTC,
            ETADayUTC,
            ETAHourUTC,
            ETAMinuteUTC,
            Destination,
            CallSign,
            timestamp: new Date(Date_Time),
          });

          await existingShip.save();
          console.log('AIS message added to existing ship');
        } else {
          // Ship does not exist, create a new ship document
          const shipData = {
            name: Name.replace(/'/g, ''),
            imo: IMO,
            mmsi: parseInt(MMSI),
            timestamp: new Date(Date_Time),
            aisMessagesType3: [],
            aisMessagesType5: [
              {
                TypeOfShipAndCargoType,
                DimensionToBow,
                DimensionToStern,
                DimensionToPort,
                DimensionToStarboard,
                TypeOfElectronicPositionFixingDevice,
                ETAMonthUTC,
                ETADayUTC,
                ETAHourUTC,
                ETAMinuteUTC,
                Destination,
                CallSign,
                timestamp: new Date(Date_Time),
              }
            ]
          };

          const ship = new Ship(shipData);
          await ship.save();
          console.log('New ship created with AIS message');
        }
      }
    }

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error:', error);
  }
})(); 


