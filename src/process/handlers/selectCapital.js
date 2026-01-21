// src/process/handlers/selectCapital.js
import { gameSetupState, gameState } from "../../core/gameState.js";
import { nextProcess } from "../processFlow.js";
import { confirmCapitalPlacement } from "../../systems/map/mapInit.js";
import { getCurrentSetupPlayer } from "../../core/gameState.js";
import { isValidCapitalTile } from "../../systems/map/mapRules.js";
import { placeCapital } from "../../systems/map/mapInit.js";
import { BLOCK_SIZE } from "../../config/constants.js";

export function handleSelectCapitalClick(type, x, y) {
  if (type !== "tile") return false;
  requestCapitalPlacement(x, y);
  return true;
}

export const player = getCurrentSetupPlayer();

export function handleCapitalConfirmed(player, x, y, blockX, blockY, blockKey) {
  player.selectedBlocks.add(blockKey);

  confirmCapitalPlacement(player.id, x, y, blockKey);

  if (allCapitalsSelected()) {
    nextProcess();
  } else {
    gameSetupState.currentPlayerIndex++;
  }
}

export function requestCapitalPlacement(x, y) {
  const player = getCurrentSetupPlayer();
  if (!player) return;

  if (!isValidCapitalTile(x, y)) {
    showInvalidCapitalAlert();
    return;
  }

  const blockX = Math.floor(x / BLOCK_SIZE);
  const blockY = Math.floor(y / BLOCK_SIZE);
  const blockKey = `${blockX},${blockY}`;

  if (player.selectedBlocks.has(blockKey)) {
    showDuplicateBlockAlert();
    return;
  }

  if (!confirmCapitalDialog(player.id, x, y)) return;

  handleCapitalConfirmed(player, x, y, blockX, blockY, blockKey);
}