import Jelly from './Jelly';

export default class JellyManager {
  constructor(that) {
    this.gameScene = that;
    this.jellys = new Array(8);
    for (let i = 0;i < 8;i ++) {
      this.jellys[i] = new Array(8);
    }
    this.movingJelly1 = 0;
    this.movingJelly2 = 0;
    this.movingJelly3 = 0;
    this.movingJelly4 = 0;
    this.jellyMove1 = 0;
    this.jellyMove2 = 0;
    this.jellyMove3 = 0;
    this.jellyMove4 = 0;
  }

  verifyPlayerMove(x, y, xPosition, yPosition, player) {
    if (this.jellys[x][y] !== undefined) {
      if (this.jellys[x][y].color !== player.color) {
        this.gameScene.cameras.main.shake(250, 0.0015, false);
        return false;
      } else {
        this.jellys[x][y].grow ++;
        if (x === 0 || y === 0 || x === 7 || y === 7) {
          //controle rand
          if (this.jellys[x][y].grow > 2) {
            player.score ++;
            this.executeSplash(x, y, xPosition, yPosition, player);
          } else {
            this.changeJelly(x, y, xPosition, yPosition, player);
          }
          return true;
        } else {
          if (this.jellys[x][y].grow > 3) {
            player.score ++;
            this.executeSplash(x, y, xPosition, yPosition, player);
          } else {
            this.changeJelly(x, y, xPosition, yPosition, player);
          }
          return true;
        }
      }
    } else {
      this.addJelly(x, y, xPosition, yPosition, player);
      return true;
    }
  }

  addJelly(x, y, xPosition, yPosition, player) {
    this.jellys[x][y] = new Jelly(player.color);
    this.jellys[x][y].xPosition = xPosition;
    this.jellys[x][y].yPosition = yPosition;
    this.jellys[x][y].color = player.color;
    this.jellys[x][y].sprite = this.gameScene.add.sprite(
      xPosition,
      yPosition,
      `${player.color}Jelly${this.jellys[x][y].grow}`
    );
  }

  changeJelly(x, y, xPosition, yPosition, player) {
    this.jellys[x][y].sprite.destroy();
    this.jellys[x][y].sprite = this.gameScene.add.sprite(
      xPosition,
      yPosition,
      `${player.color}Jelly${this.jellys[x][y].grow}`
    );
  }

  executeSplash(x, y, xPosition, yPosition, player) {
    this.jellys[x][y].sprite.destroy();
    this.jellys[x][y] = undefined;

    this.movingJelly1 = this.gameScene.physics.add
      .sprite(xPosition, yPosition, `${player.color}Jelly1`)
      .setVelocityX(100);
    this.jellyMove1 = xPosition;
    this.movingJelly2 = this.gameScene.physics.add
      .sprite(xPosition, yPosition, `${player.color}Jelly1`)
      .setVelocityX(- 100);
    this.jellyMove2 = xPosition;
    this.movingJelly3 = this.gameScene.physics.add
      .sprite(xPosition, yPosition, `${player.color}Jelly1`)
      .setVelocityY(100);
    this.jellyMove3 = yPosition;
    this.movingJelly4 = this.gameScene.physics.add
      .sprite(xPosition, yPosition, `${player.color}Jelly1`)
      .setVelocityY(- 100);
    this.jellyMove4 = yPosition;
    console.log(this.movingJelly1.x);

    this.splash(x + 1, y, xPosition + 60, yPosition, player);
    this.splash(x - 1, y, xPosition - 60, yPosition, player);
    this.splash(x, y + 1, xPosition, yPosition + 60, player);
    this.splash(x, y - 1, xPosition, yPosition - 60, player);
  }

  update() {
    if (Math.round(this.movingJelly1.x) === this.jellyMove1 + 60)
      this.movingJelly1.setVelocityX(0);
    if (Math.round(this.movingJelly2.x) === this.jellyMove2 - 60)
      this.movingJelly2.setVelocityX(0);
    if (Math.round(this.movingJelly3.y) === this.jellyMove3 + 60)
      this.movingJelly3.setVelocityX(0);
    if (Math.round(this.movingJelly4.y) === this.jellyMove4 - 60)
      this.movingJelly4.setVelocityX(0);
  }

  splash(x, y, xPosition, yPosition, player) {
    if (x >= 0 && y >= 0 && x <= 7 && y <= 7) {
      //voor te controleren of dat er gaan jelly buiten het scherm gaan
      if (this.jellys[x][y] !== undefined) {
        if (x === 0 || y === 0 || x === 7 || y === 7) {
          //controle rand
          if (this.jellys[x][y].grow >= 2) {
            player.score ++;
            this.executeSplash(x, y, xPosition, yPosition, player);
          } else {
            this.tokenJellys = this.jellys[x][y].grow + 1;
            this.jellys[x][y].color = player.color;
            this.jellys[x][y].grow = this.tokenJellys;
            this.changeJelly(x, y, xPosition, yPosition, player);
          }
        } else {
          if (this.jellys[x][y].grow < 3) {
            this.tokenJellys = this.jellys[x][y].grow + 1;
            this.jellys[x][y].color = player.color;
            this.jellys[x][y].grow = this.tokenJellys;
            this.changeJelly(x, y, xPosition, yPosition, player);
          } else {
            player.score ++;
            this.executeSplash(x, y, xPosition, yPosition, player);
          }
        }
      } else {
        this.addJelly(x, y, xPosition, yPosition, player);
      }
    }
  }
}
