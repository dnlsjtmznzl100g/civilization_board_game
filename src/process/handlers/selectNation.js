// src/process/handlers/selectNation.js
import { gameSetupState } from "../../core/gameState.js";
import { CIVILIZATIONS } from "../../core/constants.js";
import { nextProcess } from "../processFlow.js";
import { render } from "../../render/canvas/renderMap.js";

//* ======== 문명 선택 로직 (중복 차단) =================
export function selectCivilization(civId) {
  const player =
    gameSetupState.players[gameSetupState.currentPlayerIndex];

  if (gameSetupState.selectedCivs.has(civId)) {
    alert("이미 선택된 국가입니다.");
    return;
  }

  const civName = CIVILIZATIONS[civId].name;
  const ok = confirm(`"${civName}" 국가를 선택하시겠습니까?`);
  if (!ok) return;

  if (player.civ) {
    gameSetupState.selectedCivs.delete(player.civ);
  }

  player.civ = civId;
  gameSetupState.selectedCivs.add(civId);

  if (
    gameSetupState.currentPlayerIndex <
    gameSetupState.players.length - 1
  ) {
    gameSetupState.currentPlayerIndex++;
  } else {
    nextProcess();
  }

  render();
}
