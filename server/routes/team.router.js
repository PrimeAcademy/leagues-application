const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/all', (req, res) => {
  console.log('in teams GET router');
  let queryText = `
    SELECT "user".name as userName, "usersTeams"."userId", "usersTeams"."teamId", "teams".name as "teamName"
    FROM "user"
    JOIN "usersTeams" ON "user".id = "usersTeams"."userId"
    JOIN "teams" ON "teams".id = "usersTeams"."teamId"`
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error in Team GET', err);
      res.sendStatus(500)
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  let queryText = `
    BEGIN;
    INSERT INTO "teams" ("name", "captainId", "accessCode")
    VALUES ('Unicorns', 1, '6D43QW')
    RETURNING "teams".id;
    INSERT INTO "leagueTeams"("teamId", "leagueId")
    VALUES (3, 1);
    COMMIT;
  `
});

module.exports = router;
