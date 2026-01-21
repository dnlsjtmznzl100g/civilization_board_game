import { gameState } from "../../core/gameState.js";


export function calculateTradeIncome(player) {
  let total = 0;

  player.cities.forEach(({ x, y }) => {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;

        const tile = gameState.map[y + dy]?.[x + dx];
        if (!tile) continue;

        total += tile.yield.trade || 0;
      }
    }
  });

  return total;
}
