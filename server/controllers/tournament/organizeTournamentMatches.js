"use strict";
const { shuffleArray } = require("../../custom");

const organizeTournamentMatches = function (arrayOfPlayersID, size) {
  // arrayOfPlayersID === competition.participants
  const num_players = arrayOfPlayersID.length;
  if (num_players < size) {
    return {
      msg: `Players not complete (${num_players} of ${size}). Total players for this tournament must be ${size} players.`,
      error: true,
    };
  }
  let matches;
  switch (num_players) {
    case 2:
      matches = arrangeFixtures2(arrayOfPlayersID);
      break;
    case 4:
      matches = arrangeFixtures4(arrayOfPlayersID);
      break;
    case 8:
      matches = arrangeFixtures8(arrayOfPlayersID);
      break;
    case 16:
      matches = arrangeFixtures16(arrayOfPlayersID);
      break;
    case 32:
      matches = arrangeFixtures32(arrayOfPlayersID);
      break;
    default:
      matches = {};
  }
  return {
    error: false,
    matches: matches,
  };
};
// Function to arrange tournament for two players - returns an object
const arrangeFixtures2 = function (arrayOfPlayersID) {
  const shuffle = shuffleArray(arrayOfPlayersID);
  let data = { final: {} };
  data.final = {
    name: "FINAL",
    white: shuffle[0],
    black: shuffle[1],
    venue: "",
    time: "",
    date: "",
    winner: "",
  };
  return data;
};
// Function to arrange tournament for four players - returns an object
const arrangeFixtures4 = function (arrayOfPlayersID) {
  const shuffle = shuffleArray(arrayOfPlayersID);
  let data = {
    final: {},
    roundOfFour: {},
  };
  data.roundOfFour = {
    1: {
      key: 1,
      name: "SEMI FINAL A",
      white: shuffle[0],
      black: shuffle[1],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    2: {
      key: 2,
      name: "SEMI FINAL B",
      white: shuffle[2],
      black: shuffle[3],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
  };
  data.final = {
    name: "FINAL",
    white: { slot: "Winner SEMI FINAL A", player: data.roundOfFour[1].winner },
    black: { slot: "Winner SEMI FINAL B", player: data.roundOfFour[2].winner },
    venue: "",
    time: "",
    date: "",
    winner: "",
  };
  return data;
};
// Function to arrange tournament for eight players - returns an object
const arrangeFixtures8 = function (arrayOfPlayersID) {
  const shuffle = shuffleArray(arrayOfPlayersID);
  let data = {
    final: {},
    roundOfFour: {},
    roundOfEight: {},
  };
  data.roundOfEight = {
    1: {
      key: 1,
      name: "QUARTER FINAL A",
      white: shuffle[0],
      black: shuffle[1],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    2: {
      key: 2,
      name: "QUARTER FINAL B",
      white: shuffle[2],
      black: shuffle[3],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    3: {
      key: 3,
      name: "QUARTER FINAL C",
      white: shuffle[4],
      black: shuffle[5],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    4: {
      key: 4,
      name: "QUARTER FINAL D",
      white: shuffle[6],
      black: shuffle[7],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
  };
  data.roundOfFour = {
    1: {
      key: 1,
      name: "SEMI FINAL A",
      white: {
        slot: "Winner QUARTER FINAL A",
        player: data.roundOfEight[1].winner,
      },
      black: {
        slot: "Winner QUARTER FINAL B",
        player: data.roundOfEight[2].winner,
      },
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    2: {
      key: 2,
      name: "SEMI FINAL B",
      white: {
        slot: "Winner QUARTER FINAL C",
        player: data.roundOfEight[3].winner,
      },
      black: {
        slot: "Winner QUARTER FINAL D",
        player: data.roundOfEight[4].winner,
      },
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
  };
  data.final = {
    name: "FINAL",
    white: {
      slot: "Winner SEMI FINAL A",
      player: data.roundOfFour[1].winner,
    },
    black: {
      slot: "Winner SEMI FINAL B",
      player: data.roundOfFour[2].winner,
    },
    venue: "",
    time: "",
    date: "",
    winner: "",
  };
  return data;
};
// Function to arrange tournament for eight players - returns an object
const arrangeFixtures16 = function (arrayOfPlayersID) {
  const shuffle = shuffleArray(arrayOfPlayersID);
  let data = {
    final: {},
    roundOfFour: {},
    roundOfEight: {},
    roundOfSixteen: {},
  };
  data.roundOfSixteen = {
    1: {
      key: 1,
      name: "ROUND OF 16 A",
      white: shuffle[0],
      black: shuffle[1],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    2: {
      key: 2,
      name: "ROUND OF 16 B",
      white: shuffle[2],
      black: shuffle[3],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    3: {
      key: 3,
      name: "ROUND OF 16 C",
      white: shuffle[4],
      black: shuffle[5],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    4: {
      key: 4,
      name: "ROUND OF 16 D",
      white: shuffle[6],
      black: shuffle[7],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    5: {
      key: 5,
      name: "ROUND OF 16 E",
      white: shuffle[8],
      black: shuffle[9],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    6: {
      key: 6,
      name: "ROUND OF 16 F",
      white: shuffle[10],
      black: shuffle[11],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    7: {
      key: 7,
      name: "ROUND OF 16 G",
      white: shuffle[12],
      black: shuffle[13],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    8: {
      key: 8,
      name: "ROUND OF 16 H",
      white: shuffle[14],
      black: shuffle[15],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
  };
  data.roundOfEight = {
    1: {
      key: 1,
      name: "QUARTER FINAL A",
      white: {
        slot: "Winner ROUND OF 16 A",
        player: data.roundOfSixteen[1].winner,
      },
      black: {
        slot: "Winner ROUND OF 16 B",
        player: data.roundOfSixteen[2].winner,
      },
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    2: {
      key: 2,
      name: "QUARTER FINAL B",
      white: {
        slot: "Winner ROUND OF 16 C",
        player: data.roundOfSixteen[3].winner,
      },
      black: {
        slot: "Winner ROUND OF 16 D",
        player: data.roundOfSixteen[4].winner,
      },
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    3: {
      key: 3,
      name: "QUARTER FINAL C",
      white: {
        slot: "Winner ROUND OF 16 E",
        player: data.roundOfSixteen[3].winner,
      },
      black: {
        slot: "Winner ROUND OF 16 F",
        player: data.roundOfSixteen[4].winner,
      },
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    4: {
      key: 4,
      name: "QUARTER FINAL D",
      white: {
        slot: "Winner ROUND OF 16 G",
        player: data.roundOfSixteen[3].winner,
      },
      black: {
        slot: "Winner ROUND OF 16 H",
        player: data.roundOfSixteen[4].winner,
      },
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
  };
  data.roundOfFour = {
    1: {
      key: 1,
      name: "SEMI FINAL A",
      white: {
        slot: "Winner QUARTER FINAL A",
        player: data.roundOfEight[1].winner,
      },
      black: {
        slot: "Winner QUARTER FINAL B",
        player: data.roundOfEight[2].winner,
      },
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    2: {
      key: 2,
      name: "SEMI FINAL B",
      white: {
        slot: "Winner QUARTER FINAL C",
        player: data.roundOfEight[3].winner,
      },
      black: {
        slot: "Winner QUARTER FINAL D",
        player: data.roundOfEight[4].winner,
      },
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
  };
  data.final = {
    name: "FINAL",
    white: {
      slot: "Winner SEMI FINAL A",
      player: data.roundOfFour[1].winner,
    },
    black: {
      slot: "Winner SEMI FINAL B",
      player: data.roundOfFour[2].winner,
    },
    venue: "",
    time: "",
    date: "",
    winner: "",
  };
  return data;
};
// Function to arrange tournament for eight players - returns an object
const arrangeFixtures32 = function (arrayOfPlayersID) {
  const shuffle = shuffleArray(arrayOfPlayersID);
  let data = {
    final: {},
    roundOfFour: {},
    roundOfEight: {},
    roundOfSixteen: {},
    roundOfThirtyTwo: {},
  };
  data.roundOfThirtyTwo = {
    1: {
      key: 1,
      name: "ROUND OF 32 A",
      white: shuffle[0],
      black: shuffle[1],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    2: {
      key: 2,
      name: "ROUND OF 32 B",
      white: shuffle[2],
      black: shuffle[3],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    3: {
      key: 3,
      name: "ROUND OF 32 C",
      white: shuffle[4],
      black: shuffle[5],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    4: {
      key: 4,
      name: "ROUND OF 32 D",
      white: shuffle[6],
      black: shuffle[7],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    5: {
      key: 5,
      name: "ROUND OF 32 E",
      white: shuffle[8],
      black: shuffle[9],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    6: {
      key: 6,
      name: "ROUND OF 32 F",
      white: shuffle[10],
      black: shuffle[11],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    7: {
      key: 7,
      name: "ROUND OF 32 G",
      white: shuffle[12],
      black: shuffle[13],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    8: {
      key: 8,
      name: "ROUND OF 32 H",
      white: shuffle[14],
      black: shuffle[15],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    9: {
      key: 9,
      name: "ROUND OF 32 I",
      white: shuffle[16],
      black: shuffle[17],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    10: {
      key: 10,
      name: "ROUND OF 32 J",
      white: shuffle[18],
      black: shuffle[19],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    11: {
      key: 11,
      name: "ROUND OF 32 K",
      white: shuffle[20],
      black: shuffle[21],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    12: {
      key: 12,
      name: "ROUND OF 32 L",
      white: shuffle[22],
      black: shuffle[23],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    13: {
      key: 13,
      name: "ROUND OF 32 M",
      white: shuffle[24],
      black: shuffle[25],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    14: {
      key: 14,
      name: "ROUND OF 32 N",
      white: shuffle[26],
      black: shuffle[27],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    15: {
      key: 15,
      name: "ROUND OF 32 O",
      white: shuffle[28],
      black: shuffle[29],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    16: {
      key: 16,
      name: "ROUND OF 32 P",
      white: shuffle[30],
      black: shuffle[31],
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
  };
  data.roundOfSixteen = {
    1: {
      key: 1,
      name: "ROUND OF 16 A",
      white: {
        slot: "Winner ROUND OF 32 A",
        player: data.roundOfThirtyTwo[1].winner,
      },
      black: {
        slot: "Winner ROUND OF 32 B",
        player: data.roundOfThirtyTwo[2].winner,
      },
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    2: {
      key: 2,
      name: "ROUND OF 16 B",
      white: {
        slot: "Winner ROUND OF 32 C",
        player: data.roundOfThirtyTwo[3].winner,
      },
      black: {
        slot: "Winner ROUND OF 32 D",
        player: data.roundOfThirtyTwo[4].winner,
      },
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    3: {
      key: 3,
      name: "ROUND OF 16 C",
      white: {
        slot: "Winner ROUND OF 32 E",
        player: data.roundOfThirtyTwo[5].winner,
      },
      black: {
        slot: "Winner ROUND OF 32 F",
        player: data.roundOfThirtyTwo[6].winner,
      },
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    4: {
      key: 4,
      name: "ROUND OF 16 D",
      white: {
        slot: "Winner ROUND OF 32 G",
        player: data.roundOfThirtyTwo[7].winner,
      },
      black: {
        slot: "Winner ROUND OF 32 H",
        player: data.roundOfThirtyTwo[8].winner,
      },
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    5: {
      key: 5,
      name: "ROUND OF 16 E",
      white: {
        slot: "Winner ROUND OF 32 I",
        player: data.roundOfThirtyTwo[9].winner,
      },
      black: {
        slot: "Winner ROUND OF 32 J",
        player: data.roundOfThirtyTwo[10].winner,
      },
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    6: {
      key: 6,
      name: "ROUND OF 16 F",
      white: {
        slot: "Winner ROUND OF 32 K",
        player: data.roundOfThirtyTwo[11].winner,
      },
      black: {
        slot: "Winner ROUND OF 32 L",
        player: data.roundOfThirtyTwo[12].winner,
      },
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    7: {
      key: 7,
      name: "ROUND OF 16 G",
      white: {
        slot: "Winner ROUND OF 32 M",
        player: data.roundOfThirtyTwo[13].winner,
      },
      black: {
        slot: "Winner ROUND OF 32 N",
        player: data.roundOfThirtyTwo[14].winner,
      },
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    8: {
      key: 8,
      name: "ROUND OF 16 H",
      white: {
        slot: "Winner ROUND OF 32 O",
        player: data.roundOfThirtyTwo[15].winner,
      },
      black: {
        slot: "Winner ROUND OF 32 P",
        player: data.roundOfThirtyTwo[16].winner,
      },
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
  };
  data.roundOfEight = {
    1: {
      key: 1,
      name: "QUARTER FINAL A",
      white: {
        slot: "Winner ROUND OF 16 A",
        player: data.roundOfSixteen[1].winner,
      },
      black: {
        slot: "Winner ROUND OF 16 B",
        player: data.roundOfSixteen[2].winner,
      },
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    2: {
      key: 2,
      name: "QUARTER FINAL B",
      white: {
        slot: "Winner ROUND OF 16 C",
        player: data.roundOfSixteen[3].winner,
      },
      black: {
        slot: "Winner ROUND OF 16 D",
        player: data.roundOfSixteen[4].winner,
      },
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    3: {
      key: 3,
      name: "QUARTER FINAL C",
      white: {
        slot: "Winner ROUND OF 16 E",
        player: data.roundOfSixteen[5].winner,
      },
      black: {
        slot: "Winner ROUND OF 16 F",
        player: data.roundOfSixteen[6].winner,
      },
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    4: {
      key: 4,
      name: "QUARTER FINAL D",
      white: {
        slot: "Winner ROUND OF 16 G",
        player: data.roundOfSixteen[7].winner,
      },
      black: {
        slot: "Winner ROUND OF 16 H",
        player: data.roundOfSixteen[8].winner,
      },
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
  };
  data.roundOfFour = {
    1: {
      key: 1,
      name: "SEMI FINAL A",
      white: {
        slot: "Winner QUARTER FINAL A",
        player: data.roundOfEight[1].winner,
      },
      black: {
        slot: "Winner QUARTER FINAL B",
        player: data.roundOfEight[2].winner,
      },
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
    2: {
      key: 2,
      name: "SEMI FINAL B",
      white: {
        slot: "Winner QUARTER FINAL C",
        player: data.roundOfEight[3].winner,
      },
      black: {
        slot: "Winner QUARTER FINAL D",
        player: data.roundOfEight[4].winner,
      },
      venue: "",
      time: "",
      date: "",
      winner: "",
    },
  };
  data.final = {
    name: "FINAL",
    white: {
      slot: "Winner SEMI FINAL A",
      player: data.roundOfFour[1].winner,
    },
    black: {
      slot: "Winner SEMI FINAL B",
      player: data.roundOfFour[2].winner,
    },
    venue: "",
    time: "",
    date: "",
    winner: "",
  };
  return data;
};
module.exports = organizeTournamentMatches;
