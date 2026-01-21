// src/process/handlers/selectPlayers.js

import { gameState } from "../../core/gameState.js";
import { initPlayers } from "../../systems/player/playerSystem.js";
import { nextProcess } from "../processFlow.js";

//* ========= 플레이어 수 선택 ========*
export function handleSelectPlayersClick(type, dataset) {
  if (type !== "ui") return false;
  if (dataset.action !== "selectPlayers") return false;

  const playerCount = Number(dataset.value);

  if (playerCount < 2 || playerCount > 4) {
    console.warn("잘못된 플레이어 수:", playerCount);
    return true;
  }

  gameState.playerCount = playerCount;
  initPlayers(playerCount);
  nextProcess();
  return true;
}
