// Phaser import
import Phaser from "https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.esm.js";

// 씬 불러오기
import GameScene from "./render/phaser/scenes/GameScene.js";
import UIScene from "./render/phaser/scenes/UIScene.js";

// 초기 설정
const CHUNK_COUNT = 6;
const PLAYER_COUNT = 4;

// Phaser 게임 config
const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 800,
    height: 600,
    backgroundColor: 0x222222,
    scene: [GameScene, UIScene],
    physics: { default: 'arcade', arcade: { debug: false } }
};

new Phaser.Game(config);
