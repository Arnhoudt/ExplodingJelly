import Player from '../gameobjects/Player';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: `game`
    });
  }

  init() {
    this.vakjes = [];
    this.player1 = new Player(`Fredje`);
    this.player2 = new Player(`Anton`);
    this.playerName1 = this.add.text(125, 215, `${this.player1.name}`, {
      fontFamily: 'Ubuntu',
      fontSize: 24,
      color: '#000000'
    });
    this.playerName2 = this.add.text(425, 215, `${this.player2.name}`, {
      fontFamily: 'Ubuntu',
      fontSize: 24,
      color: '#000000'
    });
    this.player1.play();
    this.player2.standby();
  }

  preload() {}

  create() {
    this.add.image(
      this.sys.game.config.width / 2 + 9,
      this.sys.game.config.height - 181,
      `bg_game`
    );
    this.playerScore1 = this.add.text(
      130,
      10,
      `${this.player1.score} jelly's`,
      {
        fontFamily: 'Ubuntu',
        fontSize: 18,
        color: '#ffffff'
      }
    );
    this.playerScore2 = this.add.text(
      430,
      10,
      `${this.player2.score} jelly's`,
      {
        fontFamily: 'Ubuntu',
        fontSize: 18,
        color: '#ffffff'
      }
    );
    this.add.image(160, 160, `player1`);
    this.add.image(460, 160, `player2`);
    this.reload = this.add.sprite(600, 20, `reload_game`).setInteractive();
    this.createVakjes();
  }

  update() {
    this.updateVakjes();
    this.updateReload();
  }

  updatePlayer() {
    if (this.player2.active) {
      this.player1.play();
      this.player2.standby();
      console.log(this.player2.name);
    } else if (this.player1.active) {
      this.player2.play();
      this.player1.standby();
      console.log(this.player1.name);
    }
  }

  createVakjes() {
    for (let i = 0;i < 8;i ++) {
      for (let j = 0;j < 8;j ++) {
        this.vakjes.push(
          (this.vakje = this.add
            .sprite(100 + i * 60, 315 + j * 60, `vakje`)
            .setInteractive())
        );
      }
    }
  }

  updateVakjes() {
    for (let aantalVakjes = 0;aantalVakjes < 64;aantalVakjes ++) {
      this.vakjes[aantalVakjes].on(`pointerup`, () => {
        this.jelly = this.add.sprite(
          this.vakjes[aantalVakjes].x,
          this.vakjes[aantalVakjes].y,
          `player1_jelly1`
        );
        //this.updatePlayer();
      });
    }
  }

  updateReload() {
    this.reload.on(`pointerdown`, () => {
      this.reload.setScale(1.1);
    });

    this.reload.on(`pointerup`, () => {
      this.reload.setScale(1);
      this.scene.restart();
    });
  }
}
