const express = require("express");
const router = express.Router();

const {
  getSingle,
  getAll,
  addPlayer,
  create,
  organize,
  deleteSingle,
  updateMatchWinner,
} = require("../controllers/tournament");

//// START
//// GENERAL ROUTES

// GET -  Single Tournaments
router.get("/single/:id", getSingle);

// GET -  All Tournaments
router.get("/all", getAll);

// POST - Add New Player To Already created Tournament
router.post("/player/add", addPlayer);

//// END
//// GENERAL ROUTES

//// START
//// ADMIN ROUTES

// POST - Create New Tournament
router.post("/create", create);

// POST - Organize matches of already created Tournament
router.post("/organize", organize);

// DELETE - Delete Single Tournament
router.delete("/single/:id", deleteSingle);

// POST - Update the winner of a match in a tournament
router.post("/match", updateMatchWinner);

//// END
//// ADMIN ROUTES

module.exports = router;
