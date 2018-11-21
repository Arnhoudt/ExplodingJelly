export default class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: `start`
    });
  }

  init() {}

  preload() {}

  create() {
    this.add.image(318, 382, `bg`);
    this.play = this.add.sprite(311, 664, `play`).setInteractive();
    this.play.on('pointerdown', () => this.play.setScale(1.03));
    this.play.on('pointerup', () => {
      this.scene.start(`choose`);
      this.play.setScale(1);
    });
    this.tutorial = this.add
      .sprite(311, 765, `tutorialButton`)
      .setInteractive();
    this.tutorial.on('pointerdown', () => this.tutorial.setScale(1.03));
    this.tutorial.on('pointerup', () => {
      this.scene.start(`tutorial`);
      this.tutorial.setScale(1);
    });
  }

  update() {}
}
