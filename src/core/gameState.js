// src/core/gameState.js

import { PROCESS } from "./constants.js";

//* =============== gameSetupState 정의 ==================*
export const gameSetupState = {
  players: [
    { id: 1, civ: null },
    { id: 2, civ: null }
  ],
  selectedCivs: new Set()
};

//* =============== gameState 정의 ==================*
export const gameState = {
  // PROCESS
  process: PROCESS.SELECT_PLAYERS,

  // PHASE
  phase: null,
  phaseIndex: 0,

  // 플레이어
  players: [],
  firstPlayerIndex: 0,
  activePlayerIndex: 0,

  // 설정 결과
  playerCount: null,
  selectedNations: [],
  mapSize: null,
  capitals: {},
  selectedBlocks: new Set(),

  // 상태 플래그
  isGameOver: false,

  // 맵
  mapSizeKey: null,   // "SMALL" | "MEDIUM" | "LARGE"
  mapWidth: null,
  mapHeight: null,
  map: [],
  blocks: [],

  // TURN_START
  turnStartActions: {
    settlerConsumed: false
  },

  // TRADE
  trade: {
    collectedThisPhase: false,
    currentOffer: null,
    playersEnded: new Set()
  }
};
