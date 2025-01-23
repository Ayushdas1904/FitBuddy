import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/users.js';  // Import user routes
import aiRoutes from './routes/ai.js';
import stripeRoutes from './routes/stripe.js';


// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Parse incoming JSON requests

// Connect to MongoDB (local instance)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected locally via Compass'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));
  
// Routes
app.use('/api/users', userRoutes);  // Use the user routes
app.use('/api/ai', aiRoutes);
app.use('/api/stripe', stripeRoutes);


// Example route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});