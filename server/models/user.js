const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullname: String,
    email: String,
    username: String,
    password: String,
    passwordResetValue: String,
    profile_pic: { type: String, default: "" },

    chess: {
      rating: { type: Number, default: 1000 },
      game: { type: Number, default: 0 }, // Games played
      win: { type: Number, default: 0 },
      loss: { type: Number, default: 0 },
      draw: { type: Number, default: 0 },
      trophy: { type: Number, default: 0 },
      active: [{ type: Schema.Types.ObjectId, ref: "Tournament" }], // Open competions user is current active in. Not Closed Tournament
    },

    bank: {
      credit: { type: Number, default: 0 }, // Cash remaining from Deposits. `credit` cannot be withdrawn, only spent.
      winnings: { type: Number, default: 0 }, // Cash gotten from winnigs. `winnings` can be withdrawn or transferred to `credit`
      acc_name: { type: String, default: "empty" },
      acc_number: { type: String, default: "empty" },
      bank_name: { type: String, default: "empty" },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
