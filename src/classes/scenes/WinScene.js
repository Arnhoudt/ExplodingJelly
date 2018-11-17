export default class WinScene extends Phaser.Scene {
  constructor() {
    super({
      key: `win`
    });
  }

  init() {}

  preload() {}

  create() {
    this.add.image(307, 418, `bg_win`);
    this.goToStart = this.add.sprite(311, 664, `goToStart`).setInteractive();

    this.goToStart.on('pointerdown', () => {
      this.goToStart.setScale(1.03);
    });
    this.goToStart.on('pointerup', () => {
      this.scene.start(`start`);
      this.goToStart.setScale(1);
    });
  }

  update() {}
}
