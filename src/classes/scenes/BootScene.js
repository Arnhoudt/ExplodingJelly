export default class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: `boot`
    });
  }
  preload() {
    //Maybe load a preloader graphic...
  }
  create() {
    this.scene.start(`preload`);
  }
  update() {}
}
