import Player from '../gameobjects/Player';
import Jelly from '../gameobjects/Jelly';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: `game`
    });
  }

  init() {
    this.vakjes = [];
    this.jellys = new Array(8);
    for (let i = 0;i < 8;i ++) {
      this.jellys[i] = new Array(8);
    }

    this.player1 = new Player(`Fredje`, `red`);
    this.player2 = new Player(`Anton`, `purple`);
    this.player1.set(`play`);
    this.player2.set(`standby`);
    this.playerName1 = this.add.text(128, 220, `${this.player1.name}`, {
      fontFamily: 'Ubuntu',
      fontSize: 22,
      color: '#000000'
    });
    this.playerName2 = this.add.text(428, 220, `${this.player2.name}`, {
      fontFamily: 'Ubuntu',
      fontSize: 22,
      color: '#000000'
    });
  }

  preload() {}

  create() {
    this.add.image(
      this.sys.game.config.width / 2 + 9,
      this.sys.game.config.height - 181,
      `bg_game`
    );
    this.playerScore1 = this.add.text(
      130,
      10,
      `${this.player1.score} jelly's`,
      {
        fontFamily: 'Ubuntu',
        fontSize: 18,
        color: '#ffffff'
      }
    );
    this.playerScore2 = this.add.text(
      430,
      10,
      `${this.player2.score} jelly's`,
      {
        fontFamily: 'Ubuntu',
        fontSize: 18,
        color: '#ffffff'
      }
    );

    this.anims.create({
      key: `redAnimatie`,
      frames: this.anims.generateFrameNames(`redJellys`, {
        prefix: `assets_`,
        start: 900,
        end: 989,
        zeroPad: 0,
        suffix: `.png`
      }),
      frameRate: 22,
      repeat: - 1
    });
    this.anims.create({
      key: `purpleAnimatie`,
      frames: this.anims.generateFrameNames(`purpleJellys`, {
        prefix: `assets_`,
        start: 1000,
        end: 1089,
        zeroPad: 0,
        suffix: `.png`
      }),
      frameRate: 23,
      repeat: - 1
    });
    this.add
      .sprite(160, 160, `redJellys`, `assets_900.png`)
      .play('redAnimatie');
    this.add
      .sprite(460, 160, `purpleJellys`, `assets_1000.png`)
      .play('purpleAnimatie');

    this.reload = this.add.sprite(600, 20, `reload_game`).setInteractive();

    this.createVakjes();
    this.createReload();
  }

  update() {}

  updatePlayer(verify) {
    if (verify === true) {
      //voor als de speler op een verkeerde jelly druk dat de beurt niet veranderd.
      if (this.player2.active) {
        this.player1.set(`play`);
        this.player2.set(`standby`);
        this.vakjes.forEach(vakje => {
          vakje.setTexture(`${this.player1.color}Vakje`);
        });
      } else if (this.player1.active) {
        this.player2.set(`play`);
        this.player1.set(`standby`);
        this.vakjes.forEach(vakje => {
          vakje.setTexture(`${this.player2.color}Vakje`);
        });
      }
    }
  }

  createVakjes() {
    for (let i = 0;i < 8;i ++) {
      for (let j = 0;j < 8;j ++) {
        this.vakjes.push(
          this.add
            .sprite(100 + i * 60, 315 + j * 60, `redVakje`)
            .setInteractive()
            .on(`pointerup`, () =>
              this.addJelly(i, j, 100 + i * 60, 315 + j * 60)
            )
        );
      }
    }
  }

  addJelly(x, y, xPosition, yPosition) {
    if (this.player1.active) {
      this.verify = this.verifyPlayerMove(
        x,
        y,
        xPosition,
        yPosition,
        this.player1
      );
    } else if (this.player2.active) {
      this.verify = this.verifyPlayerMove(
        x,
        y,
        xPosition,
        yPosition,
        this.player2
      );
    }
    this.updatePlayer(this.verify);
  }

  verifyPlayerMove(x, y, xPosition, yPosition, player) {
    if (this.jellys[x][y] !== undefined) {
      if (this.jellys[x][y].color !== player.color) {
        console.log(`wrong jelly`);
        return false;
      } else {
        this.jellys[x][y].grow ++;
        this.jellys[x][y].sprite.destroy();
        if (this.jellys[x][y].grow > 3) {
          console.log(`splash`);
          this.jellys[x][y] = undefined;

          this.splash(x + 1, y, xPosition + 60, yPosition, player);
          this.splash(x - 1, y, xPosition - 60, yPosition, player);
          this.splash(x, y + 1, xPosition, yPosition + 60, player);
          this.splash(x, y - 1, xPosition, yPosition - 60, player);
        } else {
          this.jellys[x][y].sprite = this.add.sprite(
            xPosition,
            yPosition,
            `${player.color}Jelly${this.jellys[x][y].grow}`
          );
        }
        return true;
      }
    } else {
      this.jellys[x][y] = new Jelly(player.color);
      this.jellys[x][y].sprite = this.add.sprite(
        xPosition,
        yPosition,
        `${player.color}Jelly${this.jellys[x][y].grow}`
      );
      return true;
    }
  }

  splash(x, y, xPosition, yPosition, player) {
    if (x >= 0 && y >= 0 && x <= 7 && y <= 7) {
      //voor te controleren of dat er gaan jelly buiten het scherm gaan
      if (this.jellys[x][y] !== undefined) {
        if (this.jellys[x][y].grow < 3) {
          this.tokenJellys = this.jellys[x][y].grow + 1;
          this.jellys[x][y].sprite.destroy();
          this.jellys[x][y] = new Jelly(player.color);
          this.jellys[x][y].color = player.color;
          this.jellys[x][y].grow = this.tokenJellys;
          this.jellys[x][y].sprite = this.add.sprite(
            xPosition,
            yPosition,
            `${player.color}Jelly${this.jellys[x][y].grow}`
          );
        } else {
          console.log(`splash2`); //voor een kettingreactie van splaches te maken
          this.jellys[x][y].sprite.destroy();
          this.jellys[x][y] = undefined;

          this.splash(x + 1, y, xPosition + 60, yPosition, player);
          this.splash(x - 1, y, xPosition - 60, yPosition, player);
          this.splash(x, y + 1, xPosition, yPosition + 60, player);
          this.splash(x, y - 1, xPosition, yPosition - 60, player);
        }
      } else {
        this.jellys[x][y] = new Jelly(player.color);
        this.jellys[x][y].color = player.color;
        this.jellys[x][y].sprite = this.add.sprite(
          xPosition,
          yPosition,
          `${player.color}Jelly${this.jellys[x][y].grow}`
        );
      }
    }
  }

  createReload() {
    this.reload.on(`pointerdown`, () => {
      this.reload.setScale(1.1);
    });

    this.reload.on(`pointerup`, () => {
      this.reload.setScale(1);
      this.scene.restart();
    });
  }
}
