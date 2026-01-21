import { gameState } from "../../core/gameState.js";


export default class TradeUI {
  constructor(scene) {
    this.scene = scene;
    this.texts = [];
  }

  render() {
    this.texts.forEach(t => t.destroy());
    this.texts = [];

    if (gameState.phase !== "TRADE") return;

    const offer = gameState.trade.currentOffer;
    let text = offer ? `교역: ${offer.give.trade} ↔ ${offer.receive.luxury}` : "진행 중인 교역 없음";
    const txt = this.scene.add.text(500, 10, text, { fontSize: '14px', color: '#fff' }).setDepth(100);
    this.texts.push(txt);
  }
}
