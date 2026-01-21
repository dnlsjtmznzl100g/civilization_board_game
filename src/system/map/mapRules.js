// src/systems/map/mapRules.js
import { TILE_TYPES } from "./mapRules.js";
import { gameState } from "../../core/gameState.js";

export const RESOURCE_TYPES = {
  PRODUCTION: "PRODUCTION",
  TRADE: "TRADE",
  LUXURY: "LUXURY"
};

export const LUXURY_RESOURCES = {
  SILK: "SILK"
};

export const TILE_TYPES = {
  WATER: "water",
  PLAIN: "plain"
};

export const BLOCK_SIZE = 4;

export function isValidCapitalTile(x, y) {
  return canPlaceCapitalAt(x, y);
}

export function allCapitalsSelected(players) {
  return players.every(p => p.capital);
}

export function canPlaceCapitalAt(x, y, placingPlayerId) {
  // ===== 기본 좌표 체크 =====
  if (
    x <= 0 || y <= 0 ||
    x >= gameState.mapWidth - 1 ||
    y >= gameState.mapHeight - 1
  ) {
    return false;
  }

  const tile = gameState.map[y][x];
  if (!tile) return false;

  if (tile.terrain === TILE_TYPES.WATER) return false;
  if (tile.city) return false;

  const block = gameState.blocks.find(
    b => b.cx === tile.chunkX && b.cy === tile.chunkY
  );
  if (!block) return false;

  const isChunkVisible = block.tiles
    .flat()
    .every(t => t.fog.visible);
  if (!isChunkVisible) return false;

  // ===== 인접 상대 수도 =====
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;

      const neighbor = gameState.map[y + dy]?.[x + dx];
      if (!neighbor || !neighbor.city) continue;

      if (
        neighbor.city.isCapital === true &&
        neighbor.city.owner !== placingPlayerId
      ) {
        return false;
      }
    }
  }

  // ===== 주변 시야 =====
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;

      const neighbor = gameState.map[y + dy]?.[x + dx];
      if (!neighbor || !neighbor.fog.visible) {
        return false;
      }
    }
  }

  return true;
}
