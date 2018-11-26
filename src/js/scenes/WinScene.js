import {saveScore} from './../functions/scores.js';

export default class WinScene extends Phaser.Scene {
  constructor() {
    super({
      key: `win`
    });
  }

  init(data) {
    this.enabled = true;
    this.players = data.players;
    this.color = data.winner;
    this.index = 0;
    this.players.forEach((player, index) => {
      if (player.color > this.color) {
        this.index = index;
      }
    });
  }

  preload() {}

  create() {
    if (this.enabled) {
      this.winner = this.players.splice(this.index, 1);
      this.winner = this.winner[0];

      if (this.players[0]) {
        this.player1Name = this.players[0].name;
        this.player1Color = this.players[0].color;
      }
      if (this.players[1]) {
        this.player2Name = this.players[1].name;
        this.player2Color = this.players[1].color;
      }
      if (this.players[2]) {
        this.player3Name = this.players[2].name;
        this.player3Color = this.players[2].color;
      }
      saveScore(
        this.player1Name,
        this.player1Color,
        this.player2Name,
        this.player2Color,
        this.player3Name,
        this.player3Color,
        this.winner.name,
        this.winner.color
      ).then(data => {
        if (data.result === `ok`) {
          console.log('Score is goed doorgestuurd');
        } else {
          console.log('Score is NIET goed doorgestuurd');
        }
      });
      this.enabled = false;
    }

    this.add.image(307, 418, `bg_win`);
    this.particles = this.add.particles(`star`);
    this.particles.createEmitter({
      x: 310,
      y: 340,
      speed: 140,
      lifespan: 1000,
      quantity: 1,
      scale: {start: 0.1, end: 1}
    });

    this.anims.remove(`${this.winner.color}Animatie`);
    this.anims.create({
      key: `${this.winner.color}Animatie`,
      frames: this.anims.generateFrameNames(`${this.winner.color}Jelly's`, {
        prefix: `${this.winner.color}Jelly`,
        start: 0,
        end: 88,
        suffix: `.png`
      }),
      frameRate: 20,
      repeat: - 1
    });
    this.add
      .sprite(310, 325, `${this.winner.color}Jelly's`)
      .setScale(0.5)
      .play(`${this.winner.color}Animatie`);
    this.add
      .text(310, 390, `${this.winner.name}`, this.textConfig(this.winner))
      .setOrigin(0.5, 0);
    this.add
      .text(310, 425, `${this.winner.score}`, this.textConfig(this.winner))
      .setOrigin(0.5, 0);

    this.i = 0;
    this.placex = 0;
    this.placex2 = 0;
    if (this.players.length === 1) {
      this.placex = 310;
      this.placex2 = 260;
    }
    if (this.players.length === 2) {
      this.placex = 230;
      this.placex2 = 160;
    }
    if (this.players.length === 3) {
      this.placex = 180;
      this.placex2 = 130;
    }
    this.players.forEach((player, index) => {
      this.anims.remove(`${player.color}Animatie`);
      this.anims.create({
        key: `${player.color}Animatie`,
        frames: this.anims.generateFrameNames(`${player.color}Jelly's`, {
          prefix: `${player.color}Jelly`,
          start: 0,
          end: 88,
          suffix: `.png`
        }),
        frameRate: 18 + index,
        repeat: - 1
      });
      this.add
        .sprite(
          this.placex + this.i * this.placex2,
          575,
          `${player.color}Jelly's`
        )
        .setScale(0.35)
        .play(`${player.color}Animatie`);
      this.add
        .text(
          this.placex + this.i * this.placex2,
          625,
          `${player.name}`,
          this.textConfig(player)
        )
        .setOrigin(0.5, 0);
      this.add
        .text(
          this.placex + this.i * this.placex2,
          660,
          `${player.score}`,
          this.textConfig(player)
        )
        .setOrigin(0.5, 0);
      this.i ++;
    });

    this.goToStart = this.add.sprite(190, 760, `goToStart`).setInteractive();
    this.goToStart.on('pointerdown', () => this.goToStart.setScale(1.03));
    this.goToStart.on('pointerup', () => {
      this.scene.start(`start`);
      this.goToStart.setScale(1);
    });
    this.scoresButton = this.add
      .sprite(430, 760, `scoresButton`)
      .setInteractive();
    this.scoresButton.on('pointerdown', () => this.scoresButton.setScale(1.03));
    this.scoresButton.on('pointerup', () => {
      this.scene.start(`scores`);
      this.scoresButton.setScale(1);
    });
  }

  textConfig(player) {
    return {
      fontFamily: 'Ubuntu',
      fontStyle: 'Bold',
      fontSize: 24,
      color: `${player.color}`
    };
  }

  update() {}
}
