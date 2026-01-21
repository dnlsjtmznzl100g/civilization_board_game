import { gameState } from "../../core/gameState.js";
//*============초반 자원 배치 함수 =============
export function placeResources() {
  gameState.map.forEach(row => {
    row.forEach(tile => {
      // 물 타일 제외
      if (tile.terrain === TILE_TYPES.WATER) return;

      const roll = Math.random();

      // 생산력 자원 (약 10%)
      if (roll < 0.10) {
        tile.resources = [
          { type: RESOURCE_TYPES.PRODUCTION, amount: 2 },
          { type: RESOURCE_TYPES.LUXURY, name:LUXURY_RESOURCES.SILK, amount: 1 }
        ];
        return;
      }

      // 교역 자원 (약 8%)
      if (roll < 0.18) {
        tile.resource = {
          type: RESOURCE_TYPES.TRADE,
          name: null
        };
        return;
      }

      // 사치품 - 비단 (약 4%)
      if (roll < 0.22) {
        tile.resource = {
          type: RESOURCE_TYPES.LUXURY,
          name: LUXURY_RESOURCES.SILK
        };
      }
    });
  });
}

//* ========== 사치품 랜덤 배치 함수 =========
export function placeLuxuryResources() {
  gameState.map.forEach(row => {
    row.forEach(tile => {
      if (tile.terrain !== TILE_TYPES.PLAIN) return;

      if (Math.random() < 0.15) {
        tile.yield.luxury.push(LUXURY_RESOURCES.SILK);
      }
    });
  });
}