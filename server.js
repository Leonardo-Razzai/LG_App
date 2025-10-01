/*
Server for Logic Games Platform
Features:
- Host static files (HTML, CSS, JS)
- Communicate with clients via REST API
- Save user data to database
- User authentication and session management
*/

const express = require('express');
const path = require('path');
const Datastore = require('nedb');

const app = express();
const port = process.env.PORT || 3000;

// Database initialization
const db = new Datastore('database.db');
db.loadDatabase();

// Configuration constants
const PATHS = {
  HOME: path.join(__dirname, 'public/home'),
  REGISTER: path.join(__dirname, 'public/register'),
  LOGIC_GAMES: path.join(__dirname, 'LogicGames'),
  SKYSCRAPERS: path.join(__dirname, 'Grattacieli'),
  BATTLESHIP: path.join(__dirname, 'BattagliaNavale')
};

// Middleware
app.use(express.json());
app.use(express.text());
app.use(express.static('public'));

// Route handlers
const authRoutes = require('./routes/auth')(db, PATHS);
const gameRoutes = require('./routes/games')(db, PATHS);

// Mount routes
app.use('/', authRoutes);
app.use('/LogicGames', gameRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;