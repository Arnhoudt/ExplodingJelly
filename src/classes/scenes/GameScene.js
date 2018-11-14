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

    this.anims.create({
      key: `player1Animatie`,
      frames: this.anims.generateFrameNames(`player1`, {
        prefix: `assets_`,
        start: 900,
        end: 989,
        zeroPad: 0,
        suffix: `.png`
      }),
      frameRate: 22,
      repeat: - 1
    });
    this.anims.create({
      key: `player2Animatie`,
      frames: this.anims.generateFrameNames(`player2`, {
        prefix: `assets_`,
        start: 1000,
        end: 1089,
        zeroPad: 0,
        suffix: `.png`
      }),
      frameRate: 23,
      repeat: - 1
    });
    this.add
      .sprite(160, 160, `player1`, `assets_900.png`)
      .play('player1Animatie');
    this.add
      .sprite(460, 160, `player2`, `assets_1000.png`)
      .play('player2Animatie');

    this.reload = this.add.sprite(600, 20, `reload_game`).setInteractive();

    this.createVakjes();
    this.createReload();
  }

  update() {}

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
        this.vakje = this.add
          .sprite(100 + i * 60, 315 + j * 60, `vakje`)
          .setInteractive()
          .on(`pointerup`, () => this.addJelly(100 + i * 60, 315 + j * 60));
      }
    }
  }

  addJelly(x, y) {
    this.jelly = this.add.sprite(x, y, `player1_jelly1`);
    //this.updatePlayer();
  }

  createReload() {
    this.reload.on(`pointerdown`, () => {
      this.reload.setScale(1.1);
    });

    this.reload.on(`pointerup`, () => {
      this.reload.setScale(1);
      this.scene.restart();
    });
  }
}
