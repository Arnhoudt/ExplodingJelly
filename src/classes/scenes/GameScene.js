import Player from '../gameobjects/Player';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: `game`
    });
  }
  init() {
    this.vakjes = [];
  }
  preload() {}
  create() {
    this.add.image(
      this.sys.game.config.width / 2 + 9,
      this.sys.game.config.height - 181,
      `bg_game`
    );
    this.add.image(160, 160, `player1`);
    this.add.image(460, 160, `player2`);
    this.reload = this.add.sprite(600, 20, `reload_game`).setInteractive();

    this.createVakjes();
  }

  update() {
    for (let aantalVakjes = 0;aantalVakjes < 64;aantalVakjes ++) {
      this.vakjes[aantalVakjes].on(`pointerup`, () => {
        this.jelly = this.add.sprite(
          this.vakjes[aantalVakjes].x,
          this.vakjes[aantalVakjes].y,
          `player1_jelly1`
        );
      });
    }
    this.reload.on(`pointerdown`, () => {
      this.reload.setScale(1.1);
    });
    this.reload.on(`pointerup`, () => {
      this.scene.restart();
    });
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
}
