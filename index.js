import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// import { AISMessage } from './models/AISMessage.js';
// import { setupWebSocket } from './utils/websocket.js';
import routes from './routes/index.js';

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://deepak:deepak@cluster0.xdnvhh0.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });



// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
// Routes
app.use('/api', routes);


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
