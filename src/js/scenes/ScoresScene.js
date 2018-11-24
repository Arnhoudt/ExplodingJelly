export default class ScoresScene extends Phaser.Scene {
  constructor() {
    super({
      key: `scores`
    });
  }

  init() {}

  preload() {}

  create() {
    this.add.image(292, 434, `bg_scores`);

    this.goToStart = this.add.sprite(310, 750, `goToStart`).setInteractive();
    this.goToStart.on('pointerdown', () => this.goToStart.setScale(1.03));
    this.goToStart.on('pointerup', () => {
      this.scene.start(`start`);
      this.goToStart.setScale(1);
    });
  }

  update() {}
}
