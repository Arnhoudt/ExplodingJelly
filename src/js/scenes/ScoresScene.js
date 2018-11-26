import {getScoresAsync} from './../functions/scores.js';

export default class ScoresScene extends Phaser.Scene {
  constructor() {
    super({
      key: `scores`
    });
  }

  init() {}

  preload() {}

  create() {
    this.add.image(354, 410, `bg_scores`);
    getScoresAsync().then(scores => {
      scores.forEach((score, index) => {
        let i = 1;
        const placex = - 20;
        const placex2 = 130;
        const height = 90 * index;
        this.add.image(310, 637 - height, `${score.winner_color}Score`);
        if (score.name1 !== 'undefined') {
          this.addPlayerScore(
            score.name1,
            score.color1,
            placex,
            placex2,
            i,
            height
          );
          i ++;
        }
        if (score.name2 !== 'undefined') {
          this.addPlayerScore(
            score.name2,
            score.color2,
            placex,
            placex2,
            i,
            height
          );
          i ++;
        }
        if (score.name3 !== 'undefined') {
          this.addPlayerScore(
            score.name3,
            score.color3,
            placex,
            placex2,
            i,
            height
          );
          i ++;
        }
        this.particles = this.add.particles(`star`);
        this.particles.createEmitter({
          x: placex + i * placex2,
          y: 620 - height,
          angle: {min: - 190, max: 10},
          speed: 50,
          lifespan: 800,
          quantity: 1,
          scale: {start: 0.1, end: 0.3}
        });
        this.addPlayerScore(
          score.winner_name,
          score.winner_color,
          placex,
          placex2,
          i,
          height
        );
      });
    });

    this.goToStart = this.add.sprite(310, 750, `goToStart`).setInteractive();
    this.goToStart.on('pointerdown', () => this.goToStart.setScale(1.03));
    this.goToStart.on('pointerup', () => {
      this.scene.start(`start`);
      this.goToStart.setScale(1);
    });
  }

  addPlayerScore(name, color, placex, placex2, i, height) {
    this.add
      .text(
        placex + i * placex2,
        625 - height,
        `${name}`,
        this.textConfig(color)
      )
      .setOrigin(0.5, 0);
  }

  textConfig(color) {
    return {
      fontFamily: 'Ubuntu',
      fontStyle: 'Bold',
      fontSize: 20,
      color: `${color}`
    };
  }

  update() {}
}
