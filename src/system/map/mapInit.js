import { revealCornerChunks } from "./fogSystem.js";
import { placeResources, placeLuxuryResources } from "./resourceSystem.js";

// * =========== 타일 확률 함수 =========
function getRandomTerrain() {
  const roll = Math.random();

  if (roll < 0.25) {
    return TILE_TYPES.WATER; // 25%
  }

  return TILE_TYPES.PLAIN; // 75%
}

//* ================= 맵 init ==============
const TILE_PER_CHUNK = 4;

function initMap(chunkCount) {
  gameState.map = [];
  gameState.blocks = [];

  const width = chunkCount * TILE_PER_CHUNK;
  const height = chunkCount * TILE_PER_CHUNK;

  gameState.mapWidth = width;
  gameState.mapHeight = height;

  // map 배열 생성
  for (let y = 0; y < height; y++) {
    gameState.map.push(new Array(width));
  }

  // chunk(block) 단위 생성
  for (let cy = 0; cy < chunkCount; cy++) {
    for (let cx = 0; cx < chunkCount; cx++) {
      const blockTiles = [];

      for (let ty = 0; ty < TILE_PER_CHUNK; ty++) {
        const row = [];
        const mapY = cy * TILE_PER_CHUNK + ty;

        for (let tx = 0; tx < TILE_PER_CHUNK; tx++) {
          const mapX = cx * TILE_PER_CHUNK + tx;

          const tile = { // 타일객체 생성
              x: mapX,
              y: mapY,
              chunkX: cx,
              chunkY: cy,

              terrain: getRandomTerrain(),

              yield: {
                production: 0,
                trade: 0,
                luxury: []
              },

              unit: null,
              city: null,

              fog: {
                visible: false,
                explored: false
              }
           };
          // ===== 기본 지형 수확 고정 =====
          if (tile.terrain === TILE_TYPES.PLAIN) {
            tile.yield.production = 1;
          }

          if (tile.terrain === TILE_TYPES.WATER) {
            tile.yield.trade = 1;
          }


          gameState.map[mapY][mapX] = tile;
          row.push(tile);
        }

        blockTiles.push(row);
      }

      gameState.blocks.push({
        cx,
        cy,
        tiles: blockTiles,
        hasCapital: false
      });
    }
  }

  // 시작 시 코너 Chunk Fog 제거
  revealCornerChunks(chunkCount);
  
  // 자원 배치
  placeResources();
  // 사치품 배치
  placeLuxuryResources();
}