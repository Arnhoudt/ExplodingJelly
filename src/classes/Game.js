import BootScene from './scenes/BootScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import StartScene from './scenes/StartScene.js';
import GameScene from './scenes/GameScene.js';
import ChooseScene from './scenes/ChooseScene.js';
import WinScene from './scenes/WinScene.js';
import ScoresScene from './scenes/ScoresScene.js';
import TutorialScene from './scenes/TutorialScene.js';

class Game extends Phaser.Game {
  constructor() {
    super({
      type: Phaser.AUTO,
      width: 620,
      height: 820,
      title: `Exploding jelly's`,
      scene: [
        BootScene,
        PreloadScene,
        StartScene,
        ChooseScene,
        GameScene,
        WinScene,
        ScoresScene,
        TutorialScene
      ],
      backgroundColor: 0xffffff,
      version: `1.0`,
      physics: {
        default: `arcade`,
        arcade: {
          gravity: {y: 0},
          debug: false
        }
      }
    });
  }
}
export default Game;
