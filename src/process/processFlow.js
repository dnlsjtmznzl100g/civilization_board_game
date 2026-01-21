// src/process/processFlow.js

import { PROCESS, PHASES, CIVILIZATIONS } from "../core/constants.js";
import { gameState, gameSetupState } from "../core/gameState.js";
import { render, renderCivSelection } from "../render/canvas/renderMap.js";

//* ============ process 전환 로직 ===========*
export function nextProcess() {
  switch (gameState.process) {
    case PROCESS.SELECT_PLAYERS:
      gameState.process = PROCESS.SELECT_NATION;
      render();
      renderCivSelection();
      break;

    case PROCESS.SELECT_NATION:
      gameSetupState.currentPlayerIndex = 0;
      gameState.process = PROCESS.SELECT_MAP;
      render();
      break;

    case PROCESS.SELECT_MAP:
      gameState.process = PROCESS.SELECT_CAPITAL;
      break;

    case PROCESS.SELECT_CAPITAL:
      gameSetupState.currentPlayerIndex = 0;
      gameState.process = PROCESS.GAME_START;
      startGame();
      return;

    case PROCESS.GAME_START:
      break;
  }

  render();
}

// *=========== 프로세스 이후 setup ============*
export function finalizePlayersFromSetup() {
  gameState.players = gameSetupState.players.map(p => ({
    id: p.id,
    civ: p.civ,
    color: CIVILIZATIONS[p.civ].color,

    capital: p.capital ? { ...p.capital } : null,

    gold: 0,
    science: 0,
    culture: 0,

    units: [],
    cities: [],

    government: {
      type: "DESPOTISM",
      changedThisTurn: false
    }
  }));
}

//* ========== startGame ================*
export function startGame() {
  finalizePlayersFromSetup();

  // setup 상태 폐기
  gameSetupState.players = [];
  gameSetupState.selectedCivs.clear();

  gameState.phaseIndex = 0;
  gameState.phase = PHASES[0];

  gameState.firstPlayerIndex = 0;
  gameState.activePlayerIndex = gameState.firstPlayerIndex;

  render();
}

import { gameState, gameSetupState } from "../core/gameState.js";

export function initPlayers(playerCount) {
  gameState.players = [];
  gameSetupState.players = [];
  gameSetupState.currentPlayerIndex = 0;

  for (let i = 0; i < playerCount; i++) {
    const playerObj = {
      id: i,
      civ: null,
      capital: null,
      isAI: false,
      selectedBlocks: new Set()
    };

    gameState.players.push(playerObj);
    gameSetupState.players.push(playerObj);
  }

  gameSetupState.selectedCivs.clear();
}
