// src/system/city/capitalSystem.js
//* ================= 수도 배치 ==================
// capitalSystem.js
export function placeCapital(playerId, x, y) {
  const tile = gameState.map[y][x];

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
}


//* ================= 모든 수도 선택 완료 체크 ==================
export function allCapitalsSelected() {
  return gameState.players.every(p => gameState.capitals[p.id]);
}

export function confirmCapitalPlacement(playerId, x, y, blockKey) {
  gameState.capitals[playerId] = { x, y };
}