import express from 'express';
import {getShips,  getShipsdata,getShipsmarkerdata,getallmmsi,getdetails }from '../controllers/shipControllers.js';

const router = express.Router();
console.log("hitting hete ")
// GET /ships route
router.get('/ships',  getShips
);
router.get('/ships/data',  getShipsdata
);
router.get('/ships/markerdata',  getShipsmarkerdata
);
router.get('/ships/getallmmsi',  getallmmsi
);

router.get('/ships/:mmsi',  getdetails
);

export default router;
