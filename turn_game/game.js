// ===== 페이즈 정의 =====
const PHASES = [
  "차례시작",
  "교역",
  "도시행동",
  "이동",
  "기술개발"
];

const MOVE_PHASE_INDEX = PHASES.indexOf("이동");

// ===== 게임 상태 =====
const gameState = {
  phase: "select", // select | play
  currentPlayer: 1,
  turn: 1,
  phaseIndex: 0,
  boardSize: null,
  selectedUnit: null,
  hasMoved: false,
  playerCountries: {}
};

// ===== 유닛 =====
const units = [];

function initUnits() {
  const max = gameState.boardSize - 1;
  units.length = 0;
  units.push(
    { id: 1, owner: 1, x: 0, y: 0 },
    { id: 2, owner: 2, x: max, y: max }
  );
}

// ===== DOM =====
const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const endTurnBtn = document.getElementById("endTurnBtn");
const nextPhaseBtn = document.getElementById("nextPhaseBtn");
const countrySelectEl = document.getElementById("countrySelect");
const mapSizeSelectEl = document.getElementById("mapSizeSelect");
const titleEl = document.getElementById("title");
const phaseEl = document.getElementById("phase");

// ===== 국가 / 맵 선택 =====
function selectCountry(country) {
  gameState.playerCountries[1] = country;
  gameState.playerCountries[2] =
    country === "USA" ? "RUSSIA" : "USA";
  tryStartGame();
}

function selectBoardSize(size) {
  gameState.boardSize = size;
  tryStartGame();
}

function tryStartGame() {
  if (
    gameState.phase === "select" &&
    gameState.playerCountries[1] &&
    gameState.boardSize
  ) {
    startGame();
  }
}

// ===== 게임 시작 =====
function startGame() {
  gameState.phase = "play";

  titleEl.style.display = "none";
  countrySelectEl.style.display = "none";
  mapSizeSelectEl.style.display = "none";
  statusEl.style.display = "block";

  boardEl.style.display = "grid";
  boardEl.style.gridTemplateColumns =
    `repeat(${gameState.boardSize}, 60px)`;
  boardEl.style.gridTemplateRows =
    `repeat(${gameState.boardSize}, 60px)`;

  initUnits();

  endTurnBtn.style.display = "inline-block";
  nextPhaseBtn.style.display = "inline-block";

  render();
}

// ===== 타일 클릭 =====
function onTileClick(x, y) {
  const clickedUnit = getUnitAt(x, y);

  // 유닛 선택
  if (clickedUnit && clickedUnit.owner === gameState.currentPlayer) {
    gameState.selectedUnit = clickedUnit;
    render();
    return;
  }

  // 이동 단계에서만 이동 가능
  if (
    gameState.phaseIndex === MOVE_PHASE_INDEX &&
    gameState.selectedUnit &&
    !gameState.hasMoved
  ) {
    const unit = gameState.selectedUnit;
    const distance =
      Math.abs(unit.x - x) + Math.abs(unit.y - y);

    if (distance === 1 && !getUnitAt(x, y)) {
      unit.x = x;
      unit.y = y;
      gameState.hasMoved = true;
      gameState.selectedUnit = null;
      render();
    }
  }
}

// ===== 렌더 =====
function render() {
  if (gameState.phase !== "play") return;

  boardEl.innerHTML = "";
  updateStatus();

  const size = gameState.boardSize;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.onclick = () => onTileClick(x, y);

      const unit = getUnitAt(x, y);
      if (unit) {
        const unitDiv = document.createElement("div");
        unitDiv.className = `unit player${unit.owner}`;
        unitDiv.textContent =
          gameState.playerCountries[unit.owner];

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
  const country =
    gameState.playerCountries[gameState.currentPlayer];

  statusEl.textContent =
    `턴 ${gameState.turn} | ${country} 차례`;
  phaseEl.textContent =
    `현재 단계: ${PHASES[gameState.phaseIndex]}`;
}

function getUnitAt(x, y) {
  return units.find(u => u.x === x && u.y === y);
}

// ===== 페이즈 관리 =====
function nextPhase() {
  gameState.phaseIndex++;

  // 이동 단계 진입 시 이동 초기화
  if (gameState.phaseIndex === MOVE_PHASE_INDEX) {
    gameState.hasMoved = false;
  }

  if (gameState.phaseIndex >= PHASES.length) {
    endTurn();
  } else {
    render();
  }
}

nextPhaseBtn.onclick = nextPhase;

function endTurn() {
  gameState.phaseIndex = 0;
  gameState.currentPlayer =
    gameState.currentPlayer === 1 ? 2 : 1;

  gameState.turn++;
  gameState.selectedUnit = null;
  gameState.hasMoved = false;

  render();
}

endTurnBtn.onclick = endTurn;
