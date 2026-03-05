require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');


const app = express();
app.use(express.json()); 
app.use(cors());     

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5,                   
  message: { message: 'Too many login attempts. Try again later.' },
});


let users = [];

(async () => {
  const plainPassword = 'admin'; 
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  users = [
    { username: 'admin', passwordHash: hashedPassword }
  ];

  
})();

// Login route
app.post('/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);

  if (user && await bcrypt.compare(password, user.passwordHash)) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});