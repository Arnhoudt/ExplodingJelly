import BootScene from './scenes/BootScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import StartScene from './scenes/StartScene.js';
import GameScene from './scenes/GameScene.js';

class Game extends Phaser.Game {
  constructor() {
    super({
      type: Phaser.AUTO,
      width: 620,
      height: 820,
      title: `Exploding jelly's`,
      scene: [BootScene, PreloadScene, StartScene, GameScene],
      backgroundColor: 0xffffff,
      version: `1.0`,
      physics: {
        default: `arcade`,
        arcade: {
          gravity: {y: 300},
          debug: false
        }
      }
    });
  }
}
export default Game;
