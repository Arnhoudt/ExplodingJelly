export default class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: `choose`
    });
  }

  init() {}

  preload() {}

  create() {
    this.add.image(318, 382, `bg_choose`);
    this.start = this.add.sprite(311, 750, `start`).setInteractive();

    this.start.on('pointerdown', () => {
      this.start.setScale(1.03);
    });
    this.start.on('pointerup', () => {
      this.scene.start(`game`);
      this.start.setScale(1);
    });
  }

  update() {}
}
