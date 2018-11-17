import Jelly from './Jelly';

export default class JellyManager {
  constructor(that) {
    this.gameScene = that;
    this.jellys = new Array(8);
    for (let i = 0;i < 8;i ++) {
      this.jellys[i] = new Array(8);
    }
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
            this.executeSplash(x, y, xPosition, yPosition, player);
          } else {
            this.changeJelly(x, y, xPosition, yPosition, player);
          }
          return true;
        } else {
          if (this.jellys[x][y].grow > 3) {
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
    this.jellys[x][y].color = player.color;
    this.jellys[x][y].sprite = this.gameScene.add.sprite(
      xPosition,
      yPosition,
      `${player.color}Jelly${this.jellys[x][y].grow}`
    );
    player.score ++;
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
    this.splash(x + 1, y, xPosition + 60, yPosition, player);
    this.splash(x - 1, y, xPosition - 60, yPosition, player);
    this.splash(x, y + 1, xPosition, yPosition + 60, player);
    this.splash(x, y - 1, xPosition, yPosition - 60, player);
  }

  splash(x, y, xPosition, yPosition, player) {
    if (x >= 0 && y >= 0 && x <= 7 && y <= 7) {
      //voor te controleren of dat er gaan jelly buiten het scherm gaan
      if (this.jellys[x][y] !== undefined) {
        if (x === 0 || y === 0 || x === 7 || y === 7) {
          //controle rand
          if (this.jellys[x][y].grow >= 2) {
            this.executeSplash(x, y, xPosition, yPosition, player);
          } else {
            this.tokenJellys = this.jellys[x][y].grow + 1;
            this.jellys[x][y].sprite.destroy();
            this.jellys[x][y] = new Jelly(player.color);
            this.jellys[x][y].color = player.color;
            this.jellys[x][y].grow = this.tokenJellys;
            this.jellys[x][y].sprite = this.gameScene.add.sprite(
              xPosition,
              yPosition,
              `${player.color}Jelly${this.jellys[x][y].grow}`
            );
          }
        } else {
          if (this.jellys[x][y].grow < 3) {
            this.tokenJellys = this.jellys[x][y].grow + 1;
            this.jellys[x][y].sprite.destroy();
            this.jellys[x][y] = new Jelly(player.color);
            this.jellys[x][y].color = player.color;
            this.jellys[x][y].grow = this.tokenJellys;
            this.jellys[x][y].sprite = this.gameScene.add.sprite(
              xPosition,
              yPosition,
              `${player.color}Jelly${this.jellys[x][y].grow}`
            );
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
