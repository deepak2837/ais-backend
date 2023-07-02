import mongoose from 'mongoose';

const shipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imo: { type: String, required: true },
  mmsi: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  aisMessagesType1_3: [{
    Timestamp: { type: Date, required: true },

    NavigationStatus: { type: String, required: true },
    TurnRate: { type: String, required: true },
    SpeedOverGround: { type: Number, required: true },
    PositionAccuracy: { type: Boolean, required: true },
    lat: { type: String, required: true },
    lng: { type: String, required: true },
    COG: { type: Number, required: true },
    Heading: { type: Number, required: true },
    ROT: { type: Number, required: true },
    ManeuverIndicator: { type: String, required: true }
  }],
  aisMessagesType5: [{ // Define aisMessagesType5 as an array of objects
    TypeOfShipAndCargoType: String,
    DimensionToBow: String,
    DimensionToStern: String,
    DimensionToPort: String,
    DimensionToStarboard: String,
    TypeOfElectronicPositionFixingDevice: String,
    ETAMonthUTC: String,
    ETADayUTC: String,
    ETAHourUTC: String,
    ETAMinuteUTC: String,
    Destination: String,
    CallSign: String,timestamp: {
      type: Date,
      default: Date.now
    }
  }]
});

const Ship = mongoose.model('Ship', shipSchema);

export default Ship;
