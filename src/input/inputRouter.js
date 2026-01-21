// src/input/inputRouter.js

import { PROCESS } from "../core/constants.js";
import { gameState } from "../core/gameState.js";

import { handleSelectPlayersClick } from "../process/handlers/selectPlayers.js";
import { handleSelectMapClick } from "../process/handlers/selectMap.js";
import { handleSelectCapitalClick } from "../process/handlers/selectCapital.js";
import { handlePhaseClick } from "./handlePhaseInput.js";
import { handlePhaseInput } from "./handlePhaseInput.js";

export function dispatch(input) {
  handlePhaseInput(input.type, input.x, input.y, input.data);
}

//* ========== 메인 onClick 엔트리 포인트 *
export function onClick(event) {
  const { type, x, y, data } = event;

  if (handleProcessClick(type, x, y, data)) {
    return;
  }

  if (gameState.process === PROCESS.GAME_START) {
    handlePhaseClick(type, x, y, data);
  }
}

//* ========== PROCESS 기준 분기 처리 *
function handleProcessClick(type, x, y, target) {
  switch (gameState.process) {
    case PROCESS.SELECT_PLAYERS:
      return handleSelectPlayersClick(type, target);

    case PROCESS.SELECT_MAP:
      return handleSelectMapClick(type, target);

    case PROCESS.SELECT_CAPITAL:
      return handleSelectCapitalClick(type, x, y);

    case PROCESS.GAME_START:
      return false;
  }

  return false;
}
