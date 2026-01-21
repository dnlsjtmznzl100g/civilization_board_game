import { attemptChangeGovernment } from "../../systems/government/governmentSystem.js";
import { canFoundCityAt, foundCityAt } from "../../systems/city/citySystem.js";
import { endTurnStart } from "../../process/phaseFlow.js";

export function handleTurnStartInput(type, x, y, data) {
  // UI 입력
  if (type === "ui") {
    if (data.action === "changeGovernment") {
      attemptChangeGovernment(data.governmentId);
      return;
    }

    if (data.action === "endTurnStart") {
      endTurnStart();
      return;
    }
  }

  // Tile 입력 (도시 건설 시도)
  if (type === "tile") {
    if (!canFoundCityAt(x, y)) return;

    if (!confirm("개척자를 희생해 이곳에 도시를 건설하시겠습니까?")) return;

    foundCityAt(x, y);
    return;
  }
}

import { changeGovernment } from "../../systems/government/governmentSystem.js";

export function attemptChangeGovernment(governmentId) {
  const player = gameState.players[gameState.activePlayerIndex];

  const success = changeGovernment(player, governmentId);

  if (!success) {
    alert("이번 턴에는 정치체제를 변경할 수 없습니다.");
    return;
  }

  // Phaser 기준이라면 render 직접 호출 대신 이벤트 권장
}