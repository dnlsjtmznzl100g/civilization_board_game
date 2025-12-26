const BOARD_SIZE = 5;

const gameState = {
  currentPlayer: 1,
  turn: 1,
  selectedUnit: null,
  hasMoved: false
};

const units = [
  { id: 1, owner: 1, x: 0, y: 0 },
  { id: 2, owner: 2, x: 4, y: 4 }
];

const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const endTurnBtn = document.getElementById("endTurnBtn");

function init() {
  render();
  endTurnBtn.addEventListener("click", endTurn);
}

function render() {
  boardEl.innerHTML = "";
  updateStatus();

  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.dataset.x = x;
      tile.dataset.y = y;

      tile.addEventListener("click", () => onTileClick(x, y));

      const unit = getUnitAt(x, y);
      if (unit) {
        const unitDiv = document.createElement("div");
        unitDiv.className = `unit player${unit.owner}`;
        unitDiv.textContent = `P${unit.owner}`;

        if (gameState.selectedUnit === unit) {
          tile.classList.add("selected");
        }

        tile.appendChild(unitDiv);
      }

      boardEl.appendChild(tile);
    }
  }
}

function updateStatus() {
  statusEl.textContent =
    `턴 ${gameState.turn} | 현재 플레이어: Player ${gameState.currentPlayer}`;
}

function getUnitAt(x, y) {
  return units.find(u => u.x === x && u.y === y);
}

function onTileClick(x, y) {
  const clickedUnit = getUnitAt(x, y);

  // 유닛 선택
  if (clickedUnit && clickedUnit.owner === gameState.currentPlayer) {
    gameState.selectedUnit = clickedUnit;
    render();
    return;
  }

  // 이동
  if (gameState.selectedUnit && !gameState.hasMoved) {
    const unit = gameState.selectedUnit;
    const distance =
      Math.abs(unit.x - x) + Math.abs(unit.y - y);

    if (distance === 1 && !getUnitAt(x, y)) {
      unit.x = x;
      unit.y = y;
      gameState.hasMoved = true;
      render();
    }
  }
}

function endTurn() {
  gameState.currentPlayer =
    gameState.currentPlayer === 1 ? 2 : 1;

  gameState.turn++;
  gameState.selectedUnit = null;
  gameState.hasMoved = false;

  render();
}

init();
