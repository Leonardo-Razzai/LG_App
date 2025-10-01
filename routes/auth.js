const express = require('express');
const path = require('path');

module.exports = (db, PATHS) => {
  const router = express.Router();

  // Serve static pages
  router.get('/', (req, res) => {
    res.sendFile(path.join(PATHS.HOME, 'index.html'));
  });

  router.get('/register', (req, res) => {
    res.sendFile(path.join(PATHS.REGISTER, 'register.html'));
  });

  // Authentication endpoints
  router.post('/register', async (req, res) => {
    try {
      const { user } = req.body;

      const existingUsers = await new Promise((resolve, reject) => {
        db.find({ user }, (err, docs) => {
          if (err) reject(err);
          else resolve(docs);
        });
      });

      if (existingUsers.length > 0) {
        return res.json({
          status: 'error',
          message: 'User already exists'
        });
      }

      await new Promise((resolve, reject) => {
        db.insert(req.body, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      res.json({
        status: 'success',
        user: user
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  });

  router.post('/access', async (req, res) => {
    try {
      const { user } = req.body;

      const userData = await new Promise((resolve, reject) => {
        db.find({ user }, (err, docs) => {
          if (err) reject(err);
          else resolve(docs);
        });
      });

      if (userData.length === 0) {
        return res.json({
          status: 'failed',
          message: 'User not registered'
        });
      }

      res.json({
        status: 'success',
        user: user
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  });

  return router;
};