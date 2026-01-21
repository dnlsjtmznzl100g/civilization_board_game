import Phaser from "phaser";

// Core, Scenes, Input
import GameScene from "./render/phaser/scenes/GameScene.js";
import UIScene from "./render/phaser/scenes/UIScene.js";

import { initMap } from "./systems/map/mapInit.js";
import { initPlayers } from "./systems/city/capitalSystem.js";
import { TILE_PER_CHUNK, TILE_SIZE } from "./core/config.js";
import { gameState } from "./core/gameState.js";

// 초기화
const CHUNK_COUNT = 6;   // 예시: 6x6 chunk
const PLAYER_COUNT = 4;  // 플레이어 수 예시

initPlayers(PLAYER_COUNT);
initMap(CHUNK_COUNT);

// Phaser 게임 설정
const config = {
  type: Phaser.AUTO,
  width: gameState.mapWidth * TILE_SIZE + 300, // + UI 영역
  height: gameState.mapHeight * TILE_SIZE + 100,
  parent: "game-container", // <div id="game-container"></div> 필요
  backgroundColor: "#333333",
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  scene: [GameScene, UIScene]
};

// Phaser 게임 시작
const game = new Phaser.Game(config);

// 글로벌 Phaser 객체 저장 (선택)
window.phaserGame = game;

// ======================================================
// Phaser 내부에서 inputRouter 호출 예시
// (게임 씬, UI 씬이 inputRouter를 통해 action 처리 가능)
// ======================================================
