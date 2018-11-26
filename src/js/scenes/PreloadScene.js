import './../../assets/bg_start.png';
import './../../assets/back.png';
import './../../assets/bg_choose.png';
import './../../assets/play.png';
import './../../assets/start.png';
import './../../assets/bg_game.png';
import './../../assets/bg_win.png';
import './../../assets/goToStart.png';
import './../../assets/purpleVakje.png';
import './../../assets/redJelly\'s.png';
import './../../assets/redJelly\'s.json';
import './../../assets/svg/redJelly1.svg';
import './../../assets/svg/redJelly2.svg';
import './../../assets/svg/redJelly3.svg';
import './../../assets/purpleJelly\'s.png';
import './../../assets/purpleJelly\'s.json';
import './../../assets/blueJelly\'s.png';
import './../../assets/blueJelly\'s.json';
import './../../assets/orangeJelly\'s.png';
import './../../assets/orangeJelly\'s.json';
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
import './../../assets/bg_scores.png';
import './../../assets/scoresButton.png';
import './../../assets/tutorialButton.png';
import './../../assets/mask1.png';
import './../../assets/shadow.png';
import './../../assets/hiJelly.png';
import './../../assets/highlight.png';
import './../../assets/orangeScore.png';
import './../../assets/redScore.png';
import './../../assets/purpleScore.png';
import './../../assets/blueScore.png';

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
    this.load.audio('themeSong', `./assets/themeSong.mp3`);
    this.load.audio('splash1', `./assets/splash1.mp3`);
    this.load.audio('splash2', `./assets/splash2.mp3`);
    this.load.audio('splash3', `./assets/splash3.mp3`);
    this.load.audio('splash4', `./assets/splash4.mp3`);
    this.load.audio('splash5', `./assets/splash5.mp3`);
    this.load.image(`mute_game`, `./assets/soundOn.png`);
    this.load.image(`unmute_game`, `./assets/soundOff.png`);
    this.load.image(`bg`, `./assets/bg_start.png`);
    this.load.image(`bg_choose`, `./assets/bg_choose.png`);
    this.load.image(`play`, `./assets/play.png`);
    this.load.image(`growMechanic1`, `./assets/growMechanic1.png`);
    this.load.image(`growMechanic2`, `./assets/growMechanic2.png`);
    this.load.image(`growMechanic3`, `./assets/growMechanic3.png`);
    this.load.image(`start`, `./assets/start.png`);
    this.load.image(`back`, `./assets/back.png`);
    this.load.image(`bg_game`, `./assets/bg_game.png`);
    this.load.image(`bg_win`, `./assets/bg_win.png`);
    this.load.image(`goToStart`, `./assets/goToStart.png`);
    this.load.image(`purpleVakje`, `./assets/purpleVakje.png`);
    this.load.image(`star`, `./assets/star.png`);
    this.load.image(`reload_game`, `./assets/reload_game.png`);
    this.load.image(`redVakje`, `./assets/redVakje.png`);
    this.load.image(`blueVakje`, `./assets/blueVakje.png`);
    this.load.image(`redTextEntry`, `./assets/redTextEntry.png`);
    this.load.image(`orangeTextEntry`, `./assets/orangeTextEntry.png`);
    this.load.image(`purpleTextEntry`, `./assets/purpleTextEntry.png`);
    this.load.image(`blueTextEntry`, `./assets/blueTextEntry.png`);
    this.load.image(`orangeVakje`, `./assets/orangeVakje.png`);
    this.load.image(`bg_scores`, `./assets/bg_scores.png`);
    this.load.image(`scoresButton`, `./assets/scoresButton.png`);
    this.load.image(`tutorialButton`, `./assets/tutorialButton.png`);
    this.load.image('mask', './assets/mask1.png');
    this.load.image('shadow', './assets/shadow.png');
    this.load.image('hiJelly', './assets/hiJelly.png');
    this.load.image('highlight', './assets/highlight.png');
    this.load.image('redScore', './assets/redScore.png');
    this.load.image('orangeScore', './assets/orangeScore.png');
    this.load.image('purpleScore', './assets/purpleScore.png');
    this.load.image('blueScore', './assets/blueScore.png');
    this.load.atlas(
      `redJelly's`,
      `./assets/redJelly's.png`,
      `./assets/redJelly's.json`
    );
    this.load.atlas(
      `purpleJelly's`,
      `./assets/purpleJelly's.png`,
      `./assets/purpleJelly's.json`
    );
    this.load.atlas(
      `blueJelly's`,
      `./assets/blueJelly's.png`,
      `./assets/blueJelly's.json`
    );
    this.load.atlas(
      `orangeJelly's`,
      `./assets/orangeJelly's.png`,
      `./assets/orangeJelly's.json`
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
      scale: 4
    });
    this.load.svg(`purpleJelly`, `./assets/svg/purpleJelly1.svg`, {
      scale: 4
    });
    this.load.svg(`orangeJelly`, `./assets/svg/orangeJelly1.svg`, {
      scale: 4
    });
    this.load.svg(`blueJelly`, `./assets/svg/blueJelly1.svg`, {
      scale: 4
    });
  }

  onProgress(value) {
    console.log(`Loading: ${Math.round(value * 100)}%`);

    this.preloader.clear();
    this.preloader.fillStyle(0xeb8766, 1);
    this.preloader.fillRect(
      this.game.config.width / 2 - 150,
      this.game.config.height / 2 - 20,
      (this.game.config.width / 2) * value,
      20
    );
  }

  onComplete() {
    this.preloader.destroy();
    this.scene.start(`start`);
  }

  create() {}

  update() {}
}
