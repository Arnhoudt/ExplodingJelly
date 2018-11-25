export default class WinScene extends Phaser.Scene {
  constructor() {
    super({
      key: `win`
    });
  }

  init(data) {
    console.log("win");
    this.color = data.color;
  }

  preload() {}

  create() {
    this.add.image(307, 418, `bg_win`);
    this.particles = this.add.particles(`star`);
    this.particles.createEmitter({
      x: 310,
      y: 420,
      speed: 140,
      lifespan: 1400,
      quantity: 1,
      scale: {start: 0.1, end: 1}
    });
    this.anims.remove(`${this.color}Animatie`);
    this.animation = this.anims.create({
      key: `${this.color}Animatie`,
      frames: this.anims.generateFrameNames(`${this.color}Jelly's`, {
        prefix: `${this.color}Jelly`,
        start: 0,
        end: 88,
        suffix: `.png`
      }),
      frameRate: 20,
      repeat: - 1
    });
    this.add
      .sprite(307, 418, `${this.color}Jelly's`)
      .setScale(0.55)
      .play(`${this.color}Animatie`);

    this.goToStart = this.add.sprite(190, 710, `goToStart`).setInteractive();
    this.goToStart.on('pointerdown', () => this.goToStart.setScale(1.03));
    this.goToStart.on('pointerup', () => {
      this.scene.start(`start`);
      this.goToStart.setScale(1);
    });
    this.scoresButton = this.add
      .sprite(430, 710, `scoresButton`)
      .setInteractive();
    this.scoresButton.on('pointerdown', () => this.scoresButton.setScale(1.03));
    this.scoresButton.on('pointerup', () => {
      this.scene.start(`scores`);
      this.scoresButton.setScale(1);
    });
  }

  update() {}
}
