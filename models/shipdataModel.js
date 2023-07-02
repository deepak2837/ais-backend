import mongoose from 'mongoose';

const ShipsdataSchema = new mongoose.Schema({
  mmsi: { type: String, default: null },
  crawlurl: { type: String, default: null },
  imoNumber: { type: String, default: null },
  ShipsdataName: { type: String, default: null },
  shipType: { type: String, default: null },
  flag: { type: String, default: null },
  grossTonnage: { type: String, default: null },
  summerDeadweight: { type: String, default: null },
  lengthOverall: { type: String, default: null },
  beam: { type: String, default: null },
  yearOfBuilt: { type: String, default: null },
  registeredOwner: { type: String, default: null },
  year: { type: String, default: null },
  image: { type: String, default: null },
});

const Shipsdata = mongoose.model('Shipsdata', ShipsdataSchema);

export default Shipsdata;
