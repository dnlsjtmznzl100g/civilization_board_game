//* ================= PROCESS 정의 =================*
export const PROCESS = Object.freeze({
  SELECT_PLAYERS: "process-select-players",
  SELECT_NATION: "process-select-nation",
  SELECT_MAP: "process-select-map",
  SELECT_CAPITAL: "process-select-capital",
  GAME_START: "process-game-start",
  GAME_END: "process-game-end"
});


// *================= PHASE 정의 =================*
export const PHASES = Object.freeze([
  "TURN_START",
  "TRADE",
  "CITY_ACTION",
  "MOVE",
  "TECH"
]);

//* ================ 국가 정의 =============== *
export const CIVILIZATIONS = {
  AMERICA: {
    id: "AMERICA",
    name: "미국",
    color: "#1f77b4",
    capitalBonus: { production: 1 },
    unitBonus: { ranged: 1 }
  },
  EGYPT: {
    id: "EGYPT",
    name: "이집트",
    color: "#e5c07b",
    capitalBonus: { wonder: 1 }
  },
  ROME: {
    id: "ROME",
    name: "로마",
    color: "#c0392b",
    capitalBonus: { road: 1 }
  },
  GERMANY: {
    id: "GERMANY",
    name: "독일",
    color: "#2c3e50",
    unitBonus: { melee: 1 }
  },
  RUSSIA: {
    id: "RUSSIA",
    name: "러시아",
    color: "#9b59b6",
    capitalBonus: { territory: 1 }
  },
  CHINA: {
    id: "CHINA",
    name: "중국",
    color: "#e74c3c",
    capitalBonus: { science: 1 }
  }
};
// * ============ 정치체제 =============
export const GOVERNMENTS = {
  DESPOTISM: {
    name: "전제정",
    unlockEra: 0,
    effects: {
      
    }
  },

  MONARCHY: {
    name: "군주정",
    unlockEra: 1,
    effects: {
      
    }
  },

  REPUBLIC: {
    name: "공화정",
    unlockEra: 2,
    effects: {
      
    }
  }
};