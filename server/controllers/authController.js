const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');


// Register user
exports.register = async (req, res) => {
  const { firstName, middleName, lastName, mobile, email, password, confirmPassword } = req.body;

  try {
    // Validate passwords
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const fullName = [firstName, middleName, lastName].filter(Boolean).join(' ');
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      middleName,
      lastName,
      fullName,
      mobile,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ message: 'Login successful', token });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.loginUser = async (req, res) => {
  const { username, password, captchaToken } = req.body;

  // ✅ 1. Verify captcha
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const captchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;

  try {
    const response = await axios.post(captchaUrl);
    if (!response.data.success) {
      return res.status(400).json({ error: 'Captcha verification failed' });
    }

    // ✅ 2. Continue with login
    // ...existing login logic

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during captcha check' });
  }
};