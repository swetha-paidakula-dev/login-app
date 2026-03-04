// 1️⃣ Load environment variables and required packages
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');

// 2️⃣ Create Express app
const app = express();
app.use(express.json()); // parse JSON body
app.use(cors());        // allow requests from frontend

// 3️⃣ Setup rate limiter for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,                   // allow max 5 attempts
  message: { message: 'Too many login attempts. Try again later.' },
});

// 4️⃣ Users array (mock database)
let users = [];

// 5️⃣ Generate hashed password for our test user
(async () => {
  const plainPassword = 'admin'; // your test password
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  users = [
    { username: 'admin', passwordHash: hashedPassword }
  ];

  
})();

// 6️⃣ Login route
app.post('/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body;

  // Find the user in our array
  const user = users.find(u => u.username === username);

  // Check password
  if (user && await bcrypt.compare(password, user.passwordHash)) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// 7️⃣ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});