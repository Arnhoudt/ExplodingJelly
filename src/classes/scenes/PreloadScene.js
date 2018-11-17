import './../../assets/bg_start.png';
import './../../assets/back.png';
import './../../assets/bg_choose.png';
import './../../assets/play.png';
import './../../assets/start.png';
import './../../assets/bg_game.png';
import './../../assets/bg_win.png';
import './../../assets/goToStart.png';
import './../../assets/purpleVakje.png';
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
import './../../assets/redVakje.png';
import './../../assets/blueJelly1.png';
import './../../assets/blueJelly2.png';
import './../../assets/blueJelly3.png';
import './../../assets/blueVakje.png';
import './../../assets/orangeJelly1.png';
import './../../assets/orangeJelly2.png';
import './../../assets/orangeJelly3.png';
import './../../assets/orangeVakje.png';
import './../../assets/redJelly.png';
import './../../assets/purpleJelly.png';
import './../../assets/orangeJelly.png';
import './../../assets/blueJelly.png';
import './../../assets/redTextEntry.png';
import './../../assets/orangeTextEntry.png';
import './../../assets/purpleTextEntry.png';
import './../../assets/blueTextEntry.png';

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

    this.load.image(`bg`, `./assets/bg_start.png`);
    this.load.image(`bg_choose`, `./assets/bg_choose.png`);
    this.load.image(`play`, `./assets/play.png`);
    this.load.image(`start`, `./assets/start.png`);
    this.load.image(`back`, `./assets/back.png`);
    this.load.image(`bg_game`, `./assets/bg_game.png`);
    this.load.image(`bg_win`, `./assets/bg_win.png`);
    this.load.image(`goToStart`, `./assets/goToStart.png`);
    this.load.image(`purpleVakje`, `./assets/purpleVakje.png`);
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
    this.load.image(`redVakje`, `./assets/redVakje.png`);
    this.load.image(`blueJelly1`, `./assets/blueJelly1.png`);
    this.load.image(`blueJelly2`, `./assets/blueJelly2.png`);
    this.load.image(`blueJelly3`, `./assets/blueJelly3.png`);
    this.load.image(`blueVakje`, `./assets/blueVakje.png`);
    this.load.image(`orangeJelly1`, `./assets/orangeJelly1.png`);
    this.load.image(`orangeJelly2`, `./assets/orangeJelly2.png`);
    this.load.image(`orangeJelly3`, `./assets/orangeJelly3.png`);
    this.load.image(`orangeVakje`, `./assets/orangeVakje.png`);
    this.load.image(`redJelly`, `./assets/redJelly.png`);
    this.load.image(`purpleJelly`, `./assets/purpleJelly.png`);
    this.load.image(`orangeJelly`, `./assets/orangeJelly.png`);
    this.load.image(`blueJelly`, `./assets/blueJelly.png`);
    this.load.image(`redTextEntry`, `./assets/redTextEntry.png`);
    this.load.image(`orangeTextEntry`, `./assets/orangeTextEntry.png`);
    this.load.image(`purpleTextEntry`, `./assets/purpleTextEntry.png`);
    this.load.image(`blueTextEntry`, `./assets/blueTextEntry.png`);
  }

  onProgress(value) {
    console.log(`Loading: ${Math.round(value * 100)}%`);

    this.preloader.clear();
    this.preloader.fillStyle(0xff0000, 1);
    this.preloader.fillRect(
      this.game.config.width / 2 - 150,
      this.game.config.height / 2,
      (this.game.config.width / 2) * value,
      8
    );
  }

  onComplete() {
    this.preloader.destroy();
    this.scene.start(`start`);
  }

  create() {}

  update() {}
}
