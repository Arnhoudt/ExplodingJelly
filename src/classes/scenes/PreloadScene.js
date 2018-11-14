import './../../assets/bg_start.jpg';
import './../../assets/start.png';
import './../../assets/bg_game.png';
import './../../assets/vakje.png';
import './../../assets/player1.png';
import './../../assets/player1.json';
import './../../assets/player1_jelly1.png';
import './../../assets/player1_jelly2.png';
import './../../assets/player1_jelly3.png';
import './../../assets/player2.png';
import './../../assets/player2.json';
import './../../assets/player2_jelly1.png';
import './../../assets/player2_jelly2.png';
import './../../assets/player2_jelly3.png';
import './../../assets/reload_game.png';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: `preload`
    });
  }

  preload() {
    this.preloader = this.add.graphics();
    this.load.on(`progress`, this.onProgress, this);
    this.load.on(`complete`, this.onComplete, this);
    this.load.image(`bg`, `./assets/bg_start.jpg`);
    this.load.image(`start`, `./assets/start.png`);
    this.load.image(`bg_game`, `./assets/bg_game.png`);
    this.load.image(`vakje`, `./assets/vakje.png`);
    this.load.atlas(
      'player1',
      './assets/player1.png',
      './src/assets/player1.json'
    );
    this.load.image(`player1_jelly1`, `./assets/player1_jelly1.png`);
    this.load.image(`player1_jelly2`, `./assets/player1_jelly2.png`);
    this.load.image(`player1_jelly3`, `./assets/player1_jelly3.png`);
    this.load.atlas(
      'player2',
      './assets/player2.png',
      './src/assets/player2.json'
    );
    this.load.image(`player2_jelly1`, `./assets/player2_jelly1.png`);
    this.load.image(`player2_jelly2`, `./assets/player2_jelly2.png`);
    this.load.image(`player2_jelly3`, `./assets/player2_jelly3.png`);
    this.load.image(`reload_game`, `./assets/reload_game.png`);
  }

  onProgress(value) {
    console.log(`Loading: ${Math.round(value * 100)}%`);

    this.preloader.clear();
    this.preloader.fillStyle(0xff0000, 1);
    this.preloader.fillRect(
      this.game.config.width / 2 - 100,
      this.game.config.height / 2,
      (this.game.config.width / 3) * value,
      6
    );
  }

  onComplete() {
    this.preloader.destroy();
  }

  completed() {
    this.scene.start(`start`);
  }

  create() {
    this.add.image(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      `player1`
    );
    this.time.delayedCall(600, this.completed, [], this);
  }

  update() {}
}
