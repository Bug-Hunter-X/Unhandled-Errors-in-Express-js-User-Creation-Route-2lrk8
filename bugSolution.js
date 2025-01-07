const express = require('express');
const app = express();
app.use(express.json());
app.post('/users', (req, res) => {
  const user = req.body;
  // Validate request body
  if (!user || !user.name || !user.email) {
    return res.status(400).send({ error: 'Missing required fields (name, email)' });
  }

  db.createUser(user)
    .then(() => res.status(201).send({ message: 'User created successfully' }))
    .catch(err => {
      console.error('Error creating user:', err); // Log the error for debugging
      if (err.code === 'ER_DUP_ENTRY') { //Example database specific error
        return res.status(409).send({ error: 'User already exists' });
      }
      res.status(500).send({ error: 'Failed to create user' });
    });
});
// ... more routes