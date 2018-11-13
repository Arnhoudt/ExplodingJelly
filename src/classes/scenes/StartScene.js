export default class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: `start`
    });
  }
  init() {
    this.start = false;
  }
  preload() {}
  create() {
    this.add.image(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      `bg`
    );

    this.start = this.add
      .sprite(
        this.sys.game.config.width / 2,
        this.sys.game.config.height / 2 + 250,
        `start`
      )
      .setInteractive();
  }

  update() {
    this.start.on('pointerdown', () => {
      this.start.setScale(1.03);
    });
    this.start.on('pointerup', () => {
      this.scene.start(`game`);
      this.start.setScale(1);
    });
  }
}
