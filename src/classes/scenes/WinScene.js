export default class WinScene extends Phaser.Scene {
  constructor() {
    super({
      key: `win`
    });
  }

  init(data) {
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
    this.add.image(307, 418, `${this.color}Jelly`);

    this.goToStart = this.add.sprite(310, 710, `goToStart`).setInteractive();
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