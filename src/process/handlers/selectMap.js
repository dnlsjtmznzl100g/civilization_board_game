// src/process/handlers/selectMap.js

import { gameState } from "../../core/gameState.js";
import { MAP_SIZE } from "../../core/config.js";
import { initMap } from "../../systems/map/mapInit.js";
import { nextProcess } from "../processFlow.js";

//* ================ 맵 크기 선택 ========== *
export function handleSelectMapClick(type, target) {
  if (type !== "ui") return true;
  if (target.action !== "selectMap") return true;

  const sizeKey = target.mapSize;
  const size = MAP_SIZE[sizeKey];

  if (!size) {
    console.warn("잘못된 맵 크기:", sizeKey);
    return true;
  }

  gameState.mapSizeKey = sizeKey;
  gameState.mapWidth = size;
  gameState.mapHeight = size;

  initMap(size, size);
  nextProcess();

  return true;
}
