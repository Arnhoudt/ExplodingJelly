export default class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: `start`
    });
  }

  init() {}

  preload() {}

  create() {
    this.add.image(310, 410, `bg`);
    this.start = this.add.sprite(310, 660, `start`).setInteractive();
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
