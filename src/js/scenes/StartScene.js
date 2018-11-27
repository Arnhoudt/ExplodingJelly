export default class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: `start`
    });
  }

  init() {}

  preload() {}

  create() {
    this.add.image(317.6, 404, `bg`).setScale(1.005);
    this.play = this.add.sprite(311, 584, `play`).setInteractive();
    this.play.on('pointerdown', () => this.play.setScale(1.03));
    this.play.on('pointerup', () => {
      this.scene.start(`choose`);
      this.play.setScale(1);
    });
    this.tutorial = this.add
      .sprite(311, 690, `tutorialButton`)
      .setInteractive();
    this.tutorial.on('pointerdown', () => this.tutorial.setScale(1.03));
    this.tutorial.on('pointerup', () => {
      this.scene.start(`tutorial`);
      this.tutorial.setScale(1);
    });
  }

  update() {}
}
