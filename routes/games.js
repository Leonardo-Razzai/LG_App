const express = require('express');
const path = require('path');

module.exports = (db, PATHS) => {
  const router = express.Router();

  // Dynamic user routes
  router.get('/:user', (req, res) => {
    res.sendFile(path.join(PATHS.LOGIC_GAMES, 'index.html'));
  });

  // Skyscrapers game routes
  router.get('/:user/SkyScrapers', (req, res) => {
    res.sendFile(path.join(PATHS.SKYSCRAPERS, 'index.html'));
  });

  // Skyscrapers static files
  const skyscrapersFiles = ['Clues.js', 'Grid.js', 'GameCreation.js', 'Interaction.js'];
  skyscrapersFiles.forEach(file => {
    router.get(`/:user/SkyScrapers/${file.replace('.js', '')}`, (req, res) => {
      res.sendFile(path.join(PATHS.SKYSCRAPERS, file));
    });
  });

  // Battleship game routes
  router.get('/:user/BattleShip', (req, res) => {
    res.sendFile(path.join(PATHS.BATTLESHIP, 'index.html'));
  });

  // Battleship static files
  const battleshipFiles = ['Elements.js', 'Grid.js', 'Indizi.js', 'Interaction.js', 'Navi.js'];
  battleshipFiles.forEach(file => {
    router.get(`/:user/BattleShip/${file.replace('.js', '')}`, (req, res) => {
      res.sendFile(path.join(PATHS.BATTLESHIP, file));
    });
  });

  // Game data endpoints
  router.post('/:user/select', (req, res) => {
    res.json({
      user: req.params.user,
      status: 'success'
    });
  });

  // Skyscrapers data management
  router.post('/:user/SkyScrapers/data', async (req, res) => {
    try {
      const { user } = req.params;

      await new Promise((resolve, reject) => {
        db.update(
          { user },
          {
            $set: {
              "skyscrapers.grid": req.body.grid,
              "skyscrapers.cluegrid": req.body.cluegrid,
              "skyscrapers.solution": req.body.solution,
              "skyscrapers.usage": req.body.usage
            }
          },
          {},
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });

      console.log(`${user} updated skyscrapers data`);
      res.json({ status: 'done' });
    } catch (error) {
      console.error('Error saving skyscrapers data:', error);
      res.status(500).json({ status: 'error' });
    }
  });

  router.post('/:user/SkyScrapers/get_data', async (req, res) => {
    try {
      const { user } = req.params;

      const userData = await new Promise((resolve, reject) => {
        db.find({ user }, (err, docs) => {
          if (err) reject(err);
          else resolve(docs[0]);
        });
      });

      if (!userData || !userData.skyscrapers) {
        return res.json({ status: 'empty' });
      }

      const { grid, cluegrid, solution, usage } = userData.skyscrapers;
      res.json({
        status: 'done',
        grid,
        cluegrid,
        solution,
        usage
      });
    } catch (error) {
      console.error('Error retrieving skyscrapers data:', error);
      res.status(500).json({ status: 'error' });
    }
  });

  // Battleship data management
  router.post('/:user/BattleShip/data', async (req, res) => {
    try {
      const { user } = req.params;

      await new Promise((resolve, reject) => {
        db.update(
          { user },
          {
            $set: {
              "battleship.grid": req.body.grid,
              "battleship.naviPosizionate": req.body.naviPosizionate,
              "battleship.elements": req.body.elements
            }
          },
          {},
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });

      console.log(`${user} updated battleship data`);
      res.json({ status: 'done' });
    } catch (error) {
      console.error('Error saving battleship data:', error);
      res.status(500).json({ status: 'error' });
    }
  });

  router.post('/:user/BattleShip/get_data', async (req, res) => {
    try {
      const { user } = req.params;

      const userData = await new Promise((resolve, reject) => {
        db.find({ user }, (err, docs) => {
          if (err) reject(err);
          else resolve(docs[0]);
        });
      });

      if (!userData || !userData.battleship) {
        return res.json({ status: 'empty' });
      }

      const { grid, naviPosizionate, elements } = userData.battleship;
      res.json({
        status: 'done',
        grid,
        naviPosizionate,
        elements
      });
    } catch (error) {
      console.error('Error retrieving battleship data:', error);
      res.status(500).json({ status: 'error' });
    }
  });

  return router;
};