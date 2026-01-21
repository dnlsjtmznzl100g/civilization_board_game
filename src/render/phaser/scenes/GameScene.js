import Phaser from "phaser";
import { gameState } from "../../core/gameState.js";
import { TILE_SIZE, TILE_PER_CHUNK } from "../../core/config.js";
import { CIVILIZATIONS, TILE_TYPES } from "../../core/constants.js";
import { inputRouter } from "../../input/inputRouter.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }
  preload() {
    //this.load.image('tile_plain', 'assets/tiles/plain.png');
    //this.load.image('tile_water', 'assets/tiles/water.png');
    //this.load.image('capital', 'assets/cities/capital.png');
  }
  
  create() {
    // 그룹 생성
    this.add.rectangle(100, 100, 64, 64, 0xff0000);

    this.tileGroup = this.add.group();
    this.cityGroup = this.add.group();

    // 맵 렌더
    this.renderMap();

    // 이벤트: 타일 클릭
    this.input.on("gameobjectdown", (pointer, gameObject) => {
      const { tileX, tileY } = gameObject;
      inputRouter.handleTileClick(tileX, tileY);
    });

    // 초기 도시 렌더
    this.renderCities();
  }
/*
  renderMap() {
    for (let y = 0; y < gameState.mapHeight; y++) {
      for (let x = 0; x < gameState.mapWidth; x++) {
        const tile = gameState.map[y][x];
        const key = tile.terrain === TILE_TYPES.WATER ? "tile_water" : "tile_plain";

        const sprite = this.add.sprite(x * TILE_SIZE, y * TILE_SIZE, key)
          .setOrigin(0)
          .setInteractive();

        // 좌표 저장
        sprite.tileX = x;
        sprite.tileY = y;

        // Fog 처리
        if (!tile.fog.visible) {
          const fog = this.add.rectangle(
            x * TILE_SIZE + TILE_SIZE / 2,
            y * TILE_SIZE + TILE_SIZE / 2,
            TILE_SIZE,
            TILE_SIZE,
            0x000000,
            tile.fog.explored ? 0.4 : 0.8
          );
          fog.setDepth(5);
        }

        this.tileGroup.add(sprite);

        // 타일 생산량 텍스트
        this.renderTileYield(tile, x, y);
      }
    }

    // Chunk 경계
    this.renderChunkBorders();
  }

  renderTileYield(tile, x, y) {
    if (!tile.fog.visible) return;

    let offsetY = 0;
    const baseX = x * TILE_SIZE + 4;

    // 생산
    if (tile.yield.production > 0) {
      this.add.text(baseX, y * TILE_SIZE + 4 + offsetY, `⚒ ${tile.yield.production}`, {
        font: "10px Arial",
        color: "#ffffff"
      }).setDepth(10);
      offsetY += 12;
    }

    // 교역
    if (tile.yield.trade > 0) {
      this.add.text(baseX, y * TILE_SIZE + 4 + offsetY, `💰 ${tile.yield.trade}`, {
        font: "10px Arial",
        color: "#ffffff"
      }).setDepth(10);
      offsetY += 12;
    }

    // 사치품
    if (tile.yield.luxury.length > 0) {
      this.add.text(baseX, y * TILE_SIZE + 4 + offsetY, `🎁 ${tile.yield.luxury.length}`, {
        font: "10px Arial",
        color: "#ffffff"
      }).setDepth(10);
    }
  }

  renderCities() {
    this.cityGroup.clear(true, true);

    gameState.players.forEach(player => {
      player.cities.forEach(city => {
        const tile = gameState.map[city.y][city.x];
        if (!tile.fog.visible) return;

        const key = city.isCapital ? "capital" : "city";
        const citySprite = this.add.sprite(
          city.x * TILE_SIZE + TILE_SIZE / 2,
          city.y * TILE_SIZE + TILE_SIZE / 2,
          key
        ).setDepth(20);

        // 테두리 색
        const color = Phaser.Display.Color.HexStringToColor(CIVILIZATIONS[player.civ].color);
        citySprite.setTint(color.color);

        this.cityGroup.add(citySprite);
      });
    });
  }

  renderChunkBorders() {
    gameState.blocks.forEach(block => {
      const graphics = this.add.graphics();
      graphics.lineStyle(3, 0x000000);
      graphics.strokeRect(
        block.cx * TILE_PER_CHUNK * TILE_SIZE,
        block.cy * TILE_PER_CHUNK * TILE_SIZE,
        TILE_PER_CHUNK * TILE_SIZE,
        TILE_PER_CHUNK * TILE_SIZE
      );
    });
  }
}
*/

renderMap() {
    for (let y = 0; y < gameState.mapHeight; y++) {
      for (let x = 0; x < gameState.mapWidth; x++) {
        const tile = gameState.map[y][x];

        const graphics = this.add.graphics();

        // 타일 색상: 물=파랑, 평지=회색
        if (tile.terrain === TILE_TYPES.WATER) {
          graphics.fillStyle(0x3366ff, 1);
        } else {
          graphics.fillStyle(0x999999, 1);
        }
        graphics.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);

        // 좌표 저장용 임시 게임오브젝트
        const hitbox = this.add.rectangle(
          x * TILE_SIZE + TILE_SIZE / 2,
          y * TILE_SIZE + TILE_SIZE / 2,
          TILE_SIZE,
          TILE_SIZE,
          0x000000,
          0
        ).setInteractive();
        hitbox.tileX = x;
        hitbox.tileY = y;
        this.tileGroup.add(hitbox);

        // Fog 처리
        if (!tile.fog.visible) {
          graphics.fillStyle(0x000000, tile.fog.explored ? 0.4 : 0.8);
          graphics.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }

        // 타일 생산량 텍스트
        this.renderTileYield(tile, x, y);
      }
    }

    // Chunk 경계
    this.renderChunkBorders();
  }

  renderTileYield(tile, x, y) {
    if (!tile.fog.visible) return;

    let offsetY = 0;
    const baseX = x * TILE_SIZE + 4;

    // 생산
    if (tile.yield.production > 0) {
      this.add.text(baseX, y * TILE_SIZE + 4 + offsetY, `⚒ ${tile.yield.production}`, {
        font: "10px Arial",
        color: "#ffffff"
      }).setDepth(10);
      offsetY += 12;
    }

    // 교역
    if (tile.yield.trade > 0) {
      this.add.text(baseX, y * TILE_SIZE + 4 + offsetY, `💰 ${tile.yield.trade}`, {
        font: "10px Arial",
        color: "#ffffff"
      }).setDepth(10);
      offsetY += 12;
    }

    // 사치품
    if (tile.yield.luxury.length > 0) {
      this.add.text(baseX, y * TILE_SIZE + 4 + offsetY, `🎁 ${tile.yield.luxury.length}`, {
        font: "10px Arial",
        color: "#ffffff"
      }).setDepth(10);
    }
  }

  renderCities() {
    this.cityGroup.clear(true, true);

    gameState.players.forEach(player => {
      player.cities.forEach(city => {
        const tile = gameState.map[city.y][city.x];
        if (!tile.fog.visible) return;

        const graphics = this.add.graphics();
        graphics.fillStyle(city.isCapital ? 0xffff00 : 0xff0000, 1); // 수도: 노랑, 도시: 빨강
        graphics.fillRect(
          city.x * TILE_SIZE + 8,
          city.y * TILE_SIZE + 8,
          TILE_SIZE - 16,
          TILE_SIZE - 16
        );

        // 테두리 색 (선택용)
        const color = Phaser.Display.Color.HexStringToColor(CIVILIZATIONS[player.civ].color);
        graphics.lineStyle(2, color.color);
        graphics.strokeRect(
          city.x * TILE_SIZE + 8,
          city.y * TILE_SIZE + 8,
          TILE_SIZE - 16,
          TILE_SIZE - 16
        );
      });
    });
  }

  renderChunkBorders() {
    gameState.blocks.forEach(block => {
      const graphics = this.add.graphics();
      graphics.lineStyle(3, 0x000000);
      graphics.strokeRect(
        block.cx * TILE_PER_CHUNK * TILE_SIZE,
        block.cy * TILE_PER_CHUNK * TILE_SIZE,
        TILE_PER_CHUNK * TILE_SIZE,
        TILE_PER_CHUNK * TILE_SIZE
      );
    });
  }
}