// backend/routes/users.js
import express from 'express';
import User from '../models/users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // To hash passwords
import dotenv from 'dotenv'
// import crypto from 'crypto'

dotenv.config();

const router = express.Router();
// const secretKey = crypto.randomBytes(64).toString('hex');
// console.log(secretKey)

// POST /api/signup - Register a new user
router.post('/signup', async (req, res) => {
  const { name, email, password, calorieIntake } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    user = new User({
      name,
      email,
      password: hashedPassword,
      calorieIntake,
    });

    // Save the user to the database
    await user.save();

    // Create and sign JWT token
    const token = jwt.sign({ userId: user._id }, (process.env.JWT_SECRET || secretKey), { expiresIn: '2h' });

    // Respond with the token
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    // Create and sign JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    // Send token and calorieIntake in response
    res.json({ success: true, token, calorieIntake: user.calorieIntake });  // Also send calorieIntake
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}); 


export default router;
