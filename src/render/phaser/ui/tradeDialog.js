import { confirmTrade } from "../../systems/trade/tradeSystem.js";
import { gameState } from "../../state/gameState.js";


export function openTradeDialog() {
  const offerAmount = prompt("줄 교역 수치를 입력하세요");
  const luxury = prompt("받을 사치품을 입력하세요 (예: SILK, GOLD)");
  const targetId = prompt("상대 플레이어 ID를 입력하세요");

  if (!offerAmount || !luxury || !targetId) return;

  gameState.ui.selectedTradeTarget = Number(targetId);
  gameState.ui.offerTradeAmount = Number(offerAmount);
  gameState.ui.requestLuxury = luxury;

  confirmTrade();
}
