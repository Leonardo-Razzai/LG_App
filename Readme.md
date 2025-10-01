# Logic Games Server

A Node.js/Express server for hosting logic games including Skyscrapers and Battleship with user authentication and data persistence.

## Features

- **User Authentication**: Register and login system
- **Game Hosting**: Multiple logic games (Skyscrapers, Battleship)
- **Data Persistence**: Save and load game progress using NeDB
- **Static File Serving**: Host HTML, CSS, and JavaScript files
- **REST API**: Communicate with client applications

## Project Structure

```
server/
├── routes/
│   ├── auth.js          # Authentication routes
│   └── games.js         # Game-related routes
├── public/
│   ├── home/            # Homepage files
│   └── register/        # Registration page
├── LogicGames/          # Main games directory
├── Grattacieli/         # Skyscrapers game files
├── BattagliaNavale/     # Battleship game files
├── server.js           # Main server file
└── database.db         # NeDB database file
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install express nedb
   ```
3. Start the server:
   ```bash
   node server.js
   ```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `GET /` - Home page
- `GET /register` - Registration page
- `POST /register` - Register new user
- `POST /access` - User login

### Games
- `GET /LogicGames/:user` - User's game dashboard
- `GET /LogicGames/:user/SkyScrapers` - Skyscrapers game
- `GET /LogicGames/:user/BattleShip` - Battleship game

### Data Management
- `POST /LogicGames/:user/SkyScrapers/data` - Save Skyscrapers game data
- `POST /LogicGames/:user/SkyScrapers/get_data` - Load Skyscrapers game data
- `POST /LogicGames/:user/BattleShip/data` - Save Battleship game data
- `POST /LogicGames/:user/BattleShip/get_data` - Load Battleship game data

## Games

### Skyscrapers
- Logic puzzle game where players place buildings of different heights
- Saves grid state, clues, and solutions
- Features game creation and interaction

### Battleship
- Classic naval combat game
- Tracks ship positions and game state
- Includes hint system and grid management

## Database

Uses NeDB (Node.js embedded database) with the following user schema:
```javascript
{
  user: String,
  skyscrapers: {
    grid: Array,
    cluegrid: Array,
    solution: Array,
    usage: Object
  },
  battleship: {
    grid: Array,
    naviPosizionate: Array,
    elements: Object
  }
}
```

## Development

The server is built with:
- **Express.js** - Web framework
- **NeDB** - Embedded database
- **Node.js** - Runtime environment

## Configuration

- Port: 3000 (configurable via PORT environment variable)
- Database: `database.db` (auto-created)
- Static files served from `public/` directory

## Future Enhancements

- HTTPS support
- Session management
- Password encryption
- More logic games
- Multiplayer functionality
```