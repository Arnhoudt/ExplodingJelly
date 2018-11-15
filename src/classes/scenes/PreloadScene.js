import './../../assets/bg_start.jpg';
import './../../assets/start.png';
import './../../assets/bg_game.png';
import './../../assets/vakje.png';
import './../../assets/redJellys.png';
import './../../assets/redJellys.json';
import './../../assets/redJelly1.png';
import './../../assets/redJelly2.png';
import './../../assets/redJelly3.png';
import './../../assets/purpleJellys.png';
import './../../assets/purpleJellys.json';
import './../../assets/purpleJelly1.png';
import './../../assets/purpleJelly2.png';
import './../../assets/purpleJelly3.png';
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
      'redJellys',
      './assets/redJellys.png',
      './src/assets/redJellys.json'
    );
    this.load.image(`redJelly1`, `./assets/redJelly1.png`);
    this.load.image(`redJelly2`, `./assets/redJelly2.png`);
    this.load.image(`redJelly3`, `./assets/redJelly3.png`);
    this.load.atlas(
      'purpleJellys',
      './assets/purpleJellys.png',
      './src/assets/purpleJellys.json'
    );
    this.load.image(`purpleJelly1`, `./assets/purpleJelly1.png`);
    this.load.image(`purpleJelly2`, `./assets/purpleJelly2.png`);
    this.load.image(`purpleJelly3`, `./assets/purpleJelly3.png`);
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
      `redJellys`
    );
    this.time.delayedCall(600, this.completed, [], this);
  }

  update() {}
}
