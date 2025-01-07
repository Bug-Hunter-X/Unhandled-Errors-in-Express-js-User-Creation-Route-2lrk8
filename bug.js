const express = require('express');
const app = express();
app.use(express.json());
app.post('/users', (req, res) => {
  const user = req.body;
  // Missing crucial error handling here! 
  // What if req.body is malformed or missing data?
  db.createUser(user) // Assuming a database interaction
    .then(() => res.status(201).send())
    .catch(err => {
      // This is a very generic error handler.
      // Does not give helpful info to the client or log properly for debugging.
      console.error('Error creating user:', err);
      res.status(500).send('Internal Server Error');
    });
});

// ... more routes