// src/process/phaseFlow.js

import { PHASES,PROCESS } from "../core/constants.js";
import { gameState } from "../core/gameState.js";
import { startTradePhase } from "../systems/trade/tradeSystem.js";
import { onTurnStart, endTurn } from "./phaseFlowHelpers.js";
import { render } from "../render/canvas/renderMap.js";
import { renderTradeUI } from "../render/phaser/ui/TradeUI.js";

//* ========== phase 전환 로직 =========*
export function nextPhase() {
  gameState.phaseIndex++;

  if (gameState.phaseIndex >= PHASES.length) {
    endTurn();
    return;
  }

  gameState.phase = PHASES[gameState.phaseIndex];

  // Phase 공통
  gameState.activePlayerIndex = gameState.firstPlayerIndex;

  // TURN_START
  if (gameState.phase === "TURN_START") {
    gameState.players.forEach(onTurnStart);
  }

  // TRADE
  if (gameState.phase === "TRADE") {
    startTradePhase();
    renderTradeUI();
  }

  render();
}

// * == 플레이어 행동 종료 ==*
export function endPlayerAction() {
  const next =
    (gameState.activePlayerIndex + 1) % gameState.players.length;

  if (next !== gameState.firstPlayerIndex) {
    gameState.activePlayerIndex = next;
    render();
    return;
  }

  nextPhase();
}

//* ======== 턴종료 및 다음 플레이어 ======*
export function endTurn() {
  gameState.phaseIndex = 0;
  gameState.phase = PHASES[0];

  gameState.firstPlayerIndex =
    (gameState.firstPlayerIndex + 1) % gameState.players.length;

  gameState.activePlayerIndex = gameState.firstPlayerIndex;

  checkGameEnd();
  render();
}

//* ========= 게임 종료 ===============*
export function checkGameEnd() {
  if (gameState.isGameOver) {
    gameState.process = PROCESS.GAME_END;
  }
}

// * ====== 차례시작 시작 =====*
// src/process/phaseFlow.js
export function onTurnStart(player) {
  player.government.changedThisTurn = false;
  gameState.turnStartActions.settlerConsumed = false;
}

//* ====== 차례시작 종료 =========*
export function endTurnStart() {
  if (gameState.activePlayerIndex < gameState.players.length - 1) {
    gameState.activePlayerIndex++;
  } else {
    gameState.activePlayerIndex = 0;
    gameState.phase = "TRADE";
  }

  // render 호출 ❌ 제거
}

// * ======== 교역 종료 ======*
export function endPlayerTrade() {
  if (gameState.activePlayerIndex < gameState.players.length - 1) {
    gameState.activePlayerIndex++;
    return;
  }
  // 마지막 플레이어
  gameState.activePlayerIndex = 0;

  const currentPhaseIndex = PHASES.indexOf(gameState.phase);
  gameState.phase = PHASES[currentPhaseIndex + 1];

  if (gameState.phase === "TRADE") {
    startTradePhase();
  }

  renderPhaseUI();
}
