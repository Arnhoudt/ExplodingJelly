import './../../assets/bg_start.png';
import './../../assets/back.png';
import './../../assets/bg_choose.png';
import './../../assets/play.png';
import './../../assets/start.png';
import './../../assets/bg_game.png';
import './../../assets/bg_win.png';
import './../../assets/goToStart.png';
import './../../assets/purpleVakje.png';
import "./../../assets/redJelly's.png";
import "./../../assets/redJelly's.json";
import './../../assets/svg/redJelly1.svg';
import './../../assets/svg/redJelly2.svg';
import './../../assets/svg/redJelly3.svg';
import "./../../assets/purpleJelly's.png";
import "./../../assets/purpleJelly's.json";
import "./../../assets/blueJelly's.png";
import "./../../assets/blueJelly's.json";
import "./../../assets/orangeJelly's.png";
import "./../../assets/orangeJelly's.json";
import './../../assets/svg/purpleJelly1.svg';
import './../../assets/svg/purpleJelly2.svg';
import './../../assets/svg/purpleJelly3.svg';
import './../../assets/reload_game.png';
import './../../assets/redVakje.png';
import './../../assets/svg/blueJelly1.svg';
import './../../assets/svg/blueJelly2.svg';
import './../../assets/svg/blueJelly3.svg';
import './../../assets/blueVakje.png';
import './../../assets/svg/orangeJelly1.svg';
import './../../assets/svg/orangeJelly2.svg';
import './../../assets/svg/orangeJelly3.svg';
import './../../assets/orangeVakje.png';
import './../../assets/redTextEntry.png';
import './../../assets/orangeTextEntry.png';
import './../../assets/purpleTextEntry.png';
import './../../assets/blueTextEntry.png';
import './../../assets/star.png';
import './../../assets/specialButton.png';

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
    this.load.image(`star`, `./assets/star.png`);
    this.load.image(`specialButton`, `./assets/specialButton.png`);
    this.load.image(`reload_game`, `./assets/reload_game.png`);
    this.load.image(`redVakje`, `./assets/redVakje.png`);
    this.load.image(`blueVakje`, `./assets/blueVakje.png`);
    this.load.image(`redTextEntry`, `./assets/redTextEntry.png`);
    this.load.image(`orangeTextEntry`, `./assets/orangeTextEntry.png`);
    this.load.image(`purpleTextEntry`, `./assets/purpleTextEntry.png`);
    this.load.image(`blueTextEntry`, `./assets/blueTextEntry.png`);
    this.load.image(`orangeVakje`, `./assets/orangeVakje.png`);
    this.load.atlas(
      `redJelly's`,
      `./assets/redJelly's.png`,
      `./src/assets/redJelly's.json`
    );
    this.load.atlas(
      `purpleJelly's`,
      `./assets/purpleJelly's.png`,
      `./src/assets/purpleJelly's.json`
    );
    this.load.atlas(
      `blueJelly's`,
      `./assets/blueJelly's.png`,
      `./src/assets/blueJelly's.json`
    );
    this.load.atlas(
      `orangeJelly's`,
      `./assets/orangeJelly's.png`,
      `./src/assets/orangeJelly's.json`
    );
    this.load.svg(`redJelly1`, `./assets/svg/redJelly1.svg`, {
      width: 33,
      height: 31.5
    });
    this.load.svg(`redJelly2`, `./assets/svg/redJelly2.svg`, {
      width: 44.2,
      height: 41.5
    });
    this.load.svg(`redJelly3`, `./assets/svg/redJelly3.svg`, {
      width: 48,
      height: 35.5
    });
    this.load.svg(`purpleJelly1`, `./assets/svg/purpleJelly1.svg`, {
      width: 33,
      height: 31.5
    });
    this.load.svg(`purpleJelly2`, `./assets/svg/purpleJelly2.svg`, {
      width: 44.2,
      height: 41.5
    });
    this.load.svg(`purpleJelly3`, `./assets/svg/purpleJelly3.svg`, {
      width: 48,
      height: 35.5
    });
    this.load.svg(`blueJelly1`, `./assets/svg/blueJelly1.svg`, {
      width: 33,
      height: 31.5
    });
    this.load.svg(`blueJelly2`, `./assets/svg/blueJelly2.svg`, {
      width: 44.2,
      height: 41.5
    });
    this.load.svg(`blueJelly3`, `./assets/svg/blueJelly3.svg`, {
      width: 48,
      height: 35.5
    });
    this.load.svg(`orangeJelly1`, `./assets/svg/orangeJelly1.svg`, {
      width: 33,
      height: 31.5
    });
    this.load.svg(`orangeJelly2`, `./assets/svg/orangeJelly2.svg`, {
      width: 44.2,
      height: 41.5
    });
    this.load.svg(`orangeJelly3`, `./assets/svg/orangeJelly3.svg`, {
      width: 48,
      height: 35.5
    });
    this.load.svg(`redJelly`, `./assets/svg/redJelly1.svg`, {
      scale: 3
    });
    this.load.svg(`purpleJelly`, `./assets/svg/purpleJelly1.svg`, {
      scale: 3
    });
    this.load.svg(`orangeJelly`, `./assets/svg/orangeJelly1.svg`, {
      scale: 3
    });
    this.load.svg(`blueJelly`, `./assets/svg/blueJelly1.svg`, {
      scale: 3
    });
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
