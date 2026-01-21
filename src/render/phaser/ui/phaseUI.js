import { gameState } from "../../core/gameState.js";
import { GOVERNMENTS } from "../../core/constants.js";

export default class PhaseUI {
  constructor(scene) {
    this.scene = scene;
    this.texts = [];
  }

  
  render() {
    // 기존 Phaser Text 삭제
    this.texts.forEach(t => t.destroy());
    this.texts = [];

    // Phase 표시
    const phaseText = this.scene.add.text(10, 10, `Phase: ${gameState.phase}`, { fontSize: '16px', color: '#fff' }).setDepth(100);
    this.texts.push(phaseText);

    // TURN_START일 경우 정치체제 버튼
    if (gameState.phase === "TURN_START") {
      const player = gameState.players[gameState.activePlayerIndex];
      Object.entries(GOVERNMENTS).forEach(([govId, gov], idx) => {
        const btn = this.scene.add.text(10, 40 + idx * 30, gov.name, { fontSize: '14px', backgroundColor: '#333', color: '#fff', padding: {x:4,y:2} })
          .setInteractive()
          .setDepth(100)
          .on('pointerdown', () => {
            import("../../input/inputRouter.js").then(m => m.handleChangeGovernment(govId));
          });
        this.texts.push(btn);
      });
    }
  }
}
