import { gameState } from "../../core/gameState.js";
import {
  openTradeDialog,
  confirmTrade,
  rejectTrade,
  endTradePhase
} from "../../systems/trade/tradeSystem.js";


export function handleTradeInput(type, data) {
  if (type !== "ui") return;

  const currentPlayerId =
    gameState.players[gameState.activePlayerIndex]?.id;

  switch (data.action) {
    case "openTrade":
      openTradeDialog();
      break;

    case "confirmTrade":
      confirmTrade();
      break;

    case "rejectTrade":
      rejectTrade(currentPlayerId);
      break;

    case "endTrade":
      endTradePhase(currentPlayerId);
      break;
  }
}
