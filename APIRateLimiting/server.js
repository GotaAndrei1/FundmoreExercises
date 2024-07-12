const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const port = 3000;

// Configure rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again after 1 minute'
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
