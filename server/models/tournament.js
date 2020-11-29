const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tournamentSchema = new Schema(
  {
    name: String,
    city: String, // Location e.g Jos
    prize: Number,
    type: {
      type: String,
      enum: ["blitz", "untimed", "classical"], // blitz (timed) === 3 minutes or less, untimed === no clock used, classical === 20, 30, 40 minutes
      default: "classical",
    },
    is_organized: { type: Boolean, default: false },
    status: { type: String, enum: ["open", "closed"], default: "open" },
    reg_type: { type: String, enum: ["paid", "free"], default: "paid" }, // Registeration type
    size: { type: Number, enum: [2, 4, 8, 16, 32], default: 8 }, // The maximum number of players this tournament can hold
    reg_fee: Number,
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }], // ID of players registered for this tournament
    matches: { type: Object, default: {} },
    position: {
      first: { type: String, default: "" },
      second: { type: String, default: "" },
      third: { type: String, default: "" },
    }, // `first` === Winner, `second` === Runner-up, `third` === Third Position
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tournament", tournamentSchema);
