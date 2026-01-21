import { gameState } from "../../core/gameState.js";

//* ======= fog 함수 ================== *
export function revealCornerChunks(chunkCount) {
  const cornerChunks = [
    { cx: 0, cy: 0 },
    { cx: chunkCount - 1, cy: 0 },
    { cx: 0, cy: chunkCount - 1 },
    { cx: chunkCount - 1, cy: chunkCount - 1 }
  ];

  cornerChunks.forEach(({ cx, cy }) => {
    const block = gameState.blocks.find(
      b => b.cx === cx && b.cy === cy
    );

    if (!block) return;

    block.tiles.flat().forEach(tile => {
      tile.fog.visible = true;
      tile.fog.explored = true;
    });
  });
}