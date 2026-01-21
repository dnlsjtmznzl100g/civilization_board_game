import { TILE_SIZE } from "../../core/config.js";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.image("tile_plain", "assets/tiles/plain.png");
    this.load.image("tile_water", "assets/tiles/water.png");
    this.load.image("city", "assets/cities/city.png");
    this.load.image("capital", "assets/cities/capital.png");
    // ... 추가 asset preload
  }

  create() {
    this.scene.start("SetupScene");
  }
}
