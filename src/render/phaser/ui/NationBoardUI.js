import { gameState } from "../../core/gameState.js";
import { CIVILIZATIONS } from "../../core/constants.js";

export default class NationBoardUI {
  constructor(scene) {
    this.scene = scene;
    this.boards = [];
  }

  render() {
    this.boards.forEach(b => b.destroy());
    this.boards = [];

    let x = 10, y = 200;
    gameState.players.forEach(player => {
      if (!player.capital) return;

      const board = this.scene.add.container(x, y);
      const bg = this.scene.add.rectangle(0, 0, 200, 100, 0x222222).setOrigin(0);
      board.add(bg);

      const name = this.scene.add.text(10, 10, CIVILIZATIONS[player.civ].name, { color: '#fff' });
      board.add(name);

      this.boards.push(board);
      y += 110;
    });
  }
}
