import Phaser from "phaser";
import PhaseUI from "../ui/PhaseUI.js";
import NationBoardUI from "../ui/NationBoardUI.js";
import TradeUI from "../ui/TradeUI.js";

export default class UIScene extends Phaser.Scene {
  constructor() {
    super("UIScene");

  
  }
  create() {
    // Phaser UI 레이어 생성
    this.phaseUI = new PhaseUI(this);
    this.nationUI = new NationBoardUI(this);
    this.tradeUI = new TradeUI(this);

    // UI 업데이트 반복
    this.time.addEvent({
      delay: 100,
      callback: () => {
        this.phaseUI.render();
        this.nationUI.render();
        this.tradeUI.render();
      },
      loop: true
    });
  }
}
