import { gameState } from "../../core/gameState.js";
import { calculateTradeIncome } from "./tradeRules.js";


export function startTradePhase() {
  if (gameState.trade.collectedThisPhase) return;

  gameState.players.forEach(player => {
    const income = calculateTradeIncome(player);
    player.trade = (player.trade || 0) + income;
  });

  gameState.trade.collectedThisPhase = true;
  gameState.trade.playersEnded = new Set();
}

export function confirmTrade() {
  const fromPlayer = gameState.players[gameState.activePlayerIndex];
  const toPlayerId = gameState.ui.selectedTradeTarget;

  if (!toPlayerId) return;

  if (fromPlayer.trade < gameState.ui.offerTradeAmount) {
    alert("교역 수치 부족");
    return;
  }

  gameState.trade.currentOffer = {
    from: fromPlayer.id,
    to: toPlayerId,
    give: { trade: gameState.ui.offerTradeAmount },
    receive: { luxury: gameState.ui.requestLuxury },
    acceptedByFrom: true,
    acceptedByTo: false
  };
}

export function rejectTrade(playerId) {
  const offer = gameState.trade.currentOffer;
  if (!offer) return;
  if (playerId !== offer.to) return;

  console.log("교역 거절:", offer);
  gameState.trade.currentOffer = null;
}

export function confirmTrade() {
  const fromPlayer = gameState.players[gameState.activePlayerIndex];
  const toPlayerId = gameState.ui.selectedTradeTarget;

  if (!toPlayerId) return;

  if (fromPlayer.trade < gameState.ui.offerTradeAmount) {
    alert("교역 수치 부족");
    return;
  }

  gameState.trade.currentOffer = {
    from: fromPlayer.id,
    to: toPlayerId,
    give: { trade: gameState.ui.offerTradeAmount },
    receive: { luxury: gameState.ui.requestLuxury },
    acceptedByFrom: true,
    acceptedByTo: false
  };

}

export function executeTrade(offer) {
  const from = gameState.players.find(p => p.id === offer.from);
  const to = gameState.players.find(p => p.id === offer.to);

  from.trade -= offer.give.trade;
  to.trade += offer.give.trade;

  from.luxury.push(offer.receive.luxury);
  to.luxury = to.luxury.filter(l => l !== offer.receive.luxury);
}

export function endTradePhase(playerId) {
  gameState.trade.playersEnded.add(playerId);

  if (gameState.trade.playersEnded.size === gameState.players.length) {
    const currentPhaseIndex = PHASES.indexOf(gameState.phase);
    gameState.phase = PHASES[currentPhaseIndex + 1];

    gameState.trade.collectedThisPhase = false;
    gameState.trade.currentOffer = null;
    gameState.trade.playersEnded = new Set();
  }

}