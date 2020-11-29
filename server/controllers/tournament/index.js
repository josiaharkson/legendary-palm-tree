const Tournament = require("../../models/tournament");
const User = require("../../models/user");
const organizeTournamentMatches = require("./organizeTournamentMatches");

module.exports = {
  //// START
  //// GENERAL FUNCTIONS

  getSingle: async (req, res, next) => {
    const { id } = req.params;

    if (!id.trim()) return res.status(400).json({ msg: "Bad Request 1001" });

    try {
      const tournament = await Tournament.findById(id);

      if (!tournament) {
        // if tournament_id is incorrect
        return res
          .status(400)
          .json({ msg: "Bad Request. Tournament does not exist!" });
      }

      return res.status(200).json({ msg: "Success", tournament });
    } catch (e) {
      return res.status(400).json({ msg: "Bad Request 1002" });
    }
  },

  getAll: async (req, res, next) => {
    try {
      const data = await Tournament.find();
      return res.status(200).json({ msg: "Success", data });
    } catch (e) {
      return res.status(400).json({ msg: "Bad Request 1002" });
    }
  },

  addPlayer: async (req, res, next) => {
    const { player_id, tournament_id, pay_from } = req.body;

    // pay_from === enum ["credit", "winnings"] === [player.bank.credit, player.bank.winnings]

    try {
      const player = await User.findById(player_id);
      const tournament = await Tournament.findById(tournament_id);

      if (!player || !tournament) {
        // if player_id or tournament_id is incorrect
        return res
          .status(400)
          .json({ msg: "Bad Request. User or Tournament does not exist!" });
      }

      if (tournament.participants.length >= parseInt(tournament.size)) {
        // the tournament players are already complete
        return res.status(400).json({
          msg:
            "Sorry, Registeration for this tournament is closed! All slots have been occupied. Please join another tournament.",
        });
      }

      // Check if player is already registered
      const check = tournament.participants.some(
        x => x.toString() === player._id.toString()
      );

      if (check) {
        // if player_id or tournament_id is incorrect
        return res.status(400).json({
          success: false,
          msg: "You have already registered for this competition",
        });
      }

      if (tournament.reg_type === "paid") {
        const { credit, winnings } = player.bank;

        if (
          pay_from === "credit" &&
          parseInt(credit) < parseInt(tournament.reg_fee)
        ) {
          // if the players credit is not enough to register for the tournament
          return res.status(400).json({
            success: false,
            msg:
              "Sorry, You do not have enough balance (credit) to register for this tournament. Kindly deposit and come back before the tournament slots are occupied.",
            for: "credit",
          });
        }

        if (
          pay_from === "winnings" &&
          parseInt(winnings) < parseInt(tournament.reg_fee)
        ) {
          // if the players winnings is not enough to register for the tournament
          return res.status(400).json({
            success: false,
            msg:
              "Sorry, You do not have enough balance (winnings) to register for this tournament. Kindly deposit and come back before the tournament slots are occupied.",
            for: "winnings",
          });
        }

        // Deduct registeration fee from player balance (winnings || credit)
        player.bank[pay_from] =
          parseInt(player.bank[pay_from]) - parseInt(tournament.reg_fee);
      }

      // Add player to tournament
      tournament.participants = [...tournament.participants, player_id];
      // Add tournament to player `active tournament` field;
      player.chess.active = [...player.chess.active, tournament._id];

      await tournament.save();
      await player.save();

      return res.status(200).json({
        success: true,
        msg: "Success. You have successfully Joined this tournament!",
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ msg: "Bad Request 1002" });
    }
  },
  //// END
  //// GENERAL FUNCTIONS

  //// START
  //// ADMIN FUNCTIONS
  create: async (req, res, next) => {
    const { name, city, prize, type, reg_type, size, reg_fee } = req.body;

    try {
      const newTournament = new Tournament({
        name,
        city,
        prize,
        type,
        reg_type,
        size,
        reg_fee,
        status: "open",
        participants: [],
      });

      const data = await newTournament.save();
      return res.status(200).json({ msg: "Success", data });
    } catch (e) {
      return res.status(400).json({ msg: "Bad Request 1002" });
    }
  },
  organize: async (req, res, next) => {
    const { id } = req.body;

    try {
      const tournament = await Tournament.findById(id);

      if (!tournament) {
        // if tournament_id is incorrect
        return res.status(400).json({
          success: false,
          msg: "Bad Request. Tournament does not exist!",
        });
      }

      if (tournament.is_organized) {
        // if tournament has alredy been organized_
        return res.status(400).json({
          success: false,
          msg: "Tournament has already been organized!",
        });
      }

      // Organize tournament matches and save to database
      const arrayOfPlayersID = tournament.participants;
      const result = organizeTournamentMatches(
        arrayOfPlayersID,
        tournament.size
      );
      const { error, msg, matches } = result;

      if (error) return res.status(400).json({ success: false, msg });

      // Assign values and save
      tournament.matches = matches;
      tournament.is_organized = true;
      const data = await tournament.save();
      return res.status(200).json({
        success: true,
        msg: "Tournament organized sucessfully!",
        data,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ msg: "Bad Request 1002" });
    }
  },
  deleteSingle: async (req, res, next) => {
    const { id } = req.params;

    if (!id.trim()) return res.status(400).json({ msg: "Bad Request 1001" });

    try {
      const data = await Tournament.deleteOne({ _id: id });
      return res.status(200).json({ msg: "Success", data });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ msg: "Bad Request 1002" });
    }
  },

  updateMatchWinner: async (req, res, next) => {},
  //// END
  //// ADMIN FUNCTIONS
};
