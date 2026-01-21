import { gameState } from "../core/gameState.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    this.add.text(20, 20, "Codespaces + Phaser", {
      fontSize: "20px",
      color: "#ffffff",
    });

    this.add.text(20, 60, "Phase: " + gameState.phase, {
      fontSize: "16px",
      color: "#aaaaaa",
    });

    this.input.on("pointerdown", () => {
      gameState.nextPhase();
      this.scene.restart();
    });
  }
}