import { gameState } from "../core/gameState.js";
import { handleTradeClick } from "../systems/trade/tradeSystem.js";


export function handlePhaseInput(type, x, y, target) {
  switch (gameState.phase) {
    case "TURN_START":
      handleTurnStartClick(type, x, y, target);
      break;
    case "TRADE":
      handleTradeClick(type, target);
      break;
    case "CITY_ACTION":
      handleCityActionClick(type, x, y);
      break;
    case "MOVE":
      handleMoveClick(type, x, y);
      break;
    case "TECH":
      handleTechClick(type, target);
      break;
  }
}

