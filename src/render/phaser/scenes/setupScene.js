import { gameState } from "../../core/gameState.js";

export default class SetupScene extends Phaser.Scene {
  constructor() { super("SetupScene"); }

  create() {
    // 문명 선택 UI
    this.add.text(100, 50, "문명 선택", { fontSize: '24px', color: '#fff' });

    Object.values(CIVILIZATIONS).forEach((civ, idx) => {
      const btn = this.add.text(100, 100 + idx * 40, civ.name, { fontSize: '20px', backgroundColor: civ.color })
        .setInteractive()
        .on('pointerdown', () => this.selectCivilization(civ.id));
    });
  }

  
  selectCivilization(civId) {
    // inputRouter 또는 시스템 호출
    import("../../input/phases/handleTurnStartInput.js")
      .then(module => module.selectCivilization(civId));
  }
}
