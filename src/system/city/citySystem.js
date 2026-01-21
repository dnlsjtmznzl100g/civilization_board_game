import { gameState, gameSetupState } from "../../core/gameState.js";
import { removeUnit } from "../map/mapUtils.js";
/* ================= 수도 배치 ================= */

export function placeCapital(playerId, x, y) {
  const tile = gameState.map[y]?.[x];
  if (!tile) return false;

  tile.city = {
    owner: playerId,
    isCapital: true,
    name: "수도"
  };

  const setupPlayer =
    gameSetupState.players.find(p => p.id === playerId);

  if (setupPlayer) {
    setupPlayer.capital = { x, y };
  }

  return true;
}

/* ================= 도시 건설 ================= */

export function canFoundCityAt(x, y) {
  const player = gameState.players[gameState.activePlayerIndex];
  const tile = gameState.map[y]?.[x];

  if (!tile) return false;
  if (gameState.turnStartActions.settlerConsumed) return false;
  if (!tile.unit || tile.unit.type !== "SETTLER") return false;
  if (tile.unit.owner !== player.id) return false;

  return true;
}

export function foundCityAt(x, y) {
  const player = gameState.players[gameState.activePlayerIndex];
  const tile = gameState.map[y][x];

  removeUnit(tile.unit);

  tile.city = {
    owner: player.id,
    isCapital: false,
    name: "도시"
  };

  player.cities.push({ x, y });
  gameState.turnStartActions.settlerConsumed = true;

  return true;
}
