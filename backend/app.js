// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// server.js
// app.post('/signup', async (req, res) => {
//     try {
//       const { name, email, password, confirmPassword } = req.body;
//       if (password !== confirmPassword) {
//         return res.status(400).send('Passwords do not match');
//       }
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = new User({ name, email, password: hashedPassword });
//       await user.save();
//       res.status(201).send('User created successfully');
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('An error occurred');
//     }
//   });
  
app.post('/signup', async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body;
      if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
      }
      const user = new User({ name, email, password });
      await user.save();
      res.status(201).send('User created successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    }
  });
  

// app.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).send('User not found');
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).send('Invalid password');
//     }
//     const token = jwt.sign({ userId: user._id }, 'secret');
//     res.send({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred');
//   }
// });

app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send('User not found');
      }
      if (password !== user.password) {
        return res.status(401).send('Invalid password');
      }
      const token = jwt.sign({ userId: user._id }, 'secret');
      res.send({ token, userId: user._id, userName: user.name, userEmail: user.email});
      console.log(token);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    }
  });
  
  
mongoose
  .connect('')
  .then(() => { 
    app.listen(PORT, () => {
      console.log(`Server listening at ${PORT} and database connected successfully`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
