import GameScene from "./scenes/GameScene.js";

new Phaser.Game({
  type: Phaser.AUTO,
  width: 960,
  height: 640,
  backgroundColor: "#1d1d1d",
  scene: [GameScene],
});