import Jelly from './Jelly';

export default class JellyManager {
  constructor(that) {
    this.gameScene = that;
    this.jellys = new Array(8);
    for (let i = 0;i < 8;i ++) {
      this.jellys[i] = new Array(8);
    }
    this.movingJellys1 = [];
    this.jellyMoves1 = [];
    this.movingJellys2 = [];
    this.jellyMoves2 = [];
    this.movingJellys3 = [];
    this.jellyMoves3 = [];
    this.movingJellys4 = [];
    this.jellyMoves4 = [];
    this.moveForward = false;
    this.ready = false;
    this.executeSplashes = [];
    this.executeSplashes2 = [];
  }

  isThereAJellyAt(x, y) {
    return this.jellys[x][y] !== undefined;
  }

  sizeOfJellyAt(x, y) {
    return this.jellys[x][y]['grow'];
  }

  verifyPlayerMove(x, y, xPosition, yPosition, player, vakjeId) {
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
            this.executeSplashes.push({
              x: x,
              y: y,
              xPosition: xPosition,
              yPosition: yPosition,
              player: player,
              vakjeId: vakjeId
            });
            this.executeSplash();
          } else {
            this.changeJelly(x, y, xPosition, yPosition, player);
          }
          return true;
        } else {
          if (this.jellys[x][y].grow > 3) {
            player.score ++;
            this.executeSplashes.push({
              x: x,
              y: y,
              xPosition: xPosition,
              yPosition: yPosition,
              player: player,
              vakjeId: vakjeId
            });
            this.executeSplash();
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

  executeSplash() {
    this.executeSplashes.forEach((executeSplash, index) => {
      if (this.jellys[executeSplash.x][executeSplash.y]) {
        this.jellys[executeSplash.x][executeSplash.y].sprite.destroy();
        this.jellys[executeSplash.x][executeSplash.y] = undefined;
      }
      if (executeSplash.x + 1 <= 7) {
        this.movingJellys1[index] = this.gameScene.physics.add
          .sprite(
            executeSplash.xPosition,
            executeSplash.yPosition,
            `${executeSplash.player.color}Jelly1`
          )
          .setVelocityX(250);
        this.jellyMoves1[index] = executeSplash.xPosition;
      }
      if (executeSplash.x - 1 >= 0) {
        this.movingJellys2[index] = this.gameScene.physics.add
          .sprite(
            executeSplash.xPosition,
            executeSplash.yPosition,
            `${executeSplash.player.color}Jelly1`
          )
          .setVelocityX(- 250);
        this.jellyMoves2[index] = executeSplash.xPosition;
      }
      if (executeSplash.y + 1 <= 7) {
        this.movingJellys3[index] = this.gameScene.physics.add
          .sprite(
            executeSplash.xPosition,
            executeSplash.yPosition,
            `${executeSplash.player.color}Jelly1`
          )
          .setVelocityY(250);
        this.jellyMoves3[index] = executeSplash.yPosition;
      }
      if (executeSplash.y - 1 >= 0) {
        this.movingJellys4[index] = this.gameScene.physics.add
          .sprite(
            executeSplash.xPosition,
            executeSplash.yPosition,
            `${executeSplash.player.color}Jelly1`
          )
          .setVelocityY(- 250);
        this.jellyMoves4[index] = executeSplash.yPosition;
      }
    });
    this.moveForward = true;
  }

  update() {
    if (this.moveForward) {
      if (this.movingJellys1) {
        this.movingJellys1.forEach((movingJelly, index) => {
          if (Math.round(movingJelly.x) >= this.jellyMoves1[index] + 60) {
            movingJelly.setVelocityX(0);
            this.ready = true;
          }
        });
      }
      if (this.movingJellys2) {
        this.movingJellys2.forEach((movingJelly, index) => {
          if (Math.round(movingJelly.x) <= this.jellyMoves2[index] - 60) {
            movingJelly.setVelocityX(0);
            this.ready = true;
          }
        });
      }
      if (this.movingJellys3) {
        this.movingJellys3.forEach((movingJelly, index) => {
          if (Math.round(movingJelly.y) >= this.jellyMoves3[index] + 60) {
            movingJelly.setVelocityY(0);
            this.ready = true;
          }
        });
      }
      if (this.movingJellys4) {
        this.movingJellys4.forEach((movingJelly, index) => {
          if (Math.round(movingJelly.y) <= this.jellyMoves4[index] - 60) {
            movingJelly.setVelocityY(0);
            this.ready = true;
          }
        });
      }
    }
    if (this.ready) {
      this.moveForward = false;
      this.ready = false;
      this.continueSplash();
    }
  }

  continueSplash() {
    this.movingJellys1.forEach(movingJelly => movingJelly.destroy());
    this.movingJellys2.forEach(movingJelly => movingJelly.destroy());
    this.movingJellys3.forEach(movingJelly => movingJelly.destroy());
    this.movingJellys4.forEach(movingJelly => movingJelly.destroy());

    this.executeSplashes.forEach(executeSplash => {
      this.splashAllDirections(executeSplash);
    });
    for (let i = 0;i <= this.executeSplashes2.length;i ++) {
      for (let j = 0;j < i;j ++) {
        if (this.executeSplashes2[j] && this.executeSplashes2[i]) {
          if (
            this.executeSplashes2[j].vakjeId ===
            this.executeSplashes2[i].vakjeId
          ) {
            this.executeSplashes2.splice(j, 1);
          }
        }
      }
    }
    this.executeSplashes = [];
    this.executeSplashes = this.executeSplashes2;
    this.executeSplashes2 = [];
    this.movingJellys1 = [];
    this.movingJellys2 = [];
    this.movingJellys3 = [];
    this.movingJellys4 = [];
    this.gameScene.checkWon();
    this.executeSplash();
  }

  splashAllDirections(executeSplash) {
    this.splash(
      executeSplash.x + 1,
      executeSplash.y,
      executeSplash.xPosition + 60,
      executeSplash.yPosition,
      executeSplash.player,
      executeSplash.vakjeId + 8
    );
    this.splash(
      executeSplash.x - 1,
      executeSplash.y,
      executeSplash.xPosition - 60,
      executeSplash.yPosition,
      executeSplash.player,
      executeSplash.vakjeId - 8
    );
    this.splash(
      executeSplash.x,
      executeSplash.y + 1,
      executeSplash.xPosition,
      executeSplash.yPosition + 60,
      executeSplash.player,
      executeSplash.vakjeId + 1
    );
    this.splash(
      executeSplash.x,
      executeSplash.y - 1,
      executeSplash.xPosition,
      executeSplash.yPosition - 60,
      executeSplash.player,
      executeSplash.vakjeId - 1
    );
  }

  splash(x, y, xPosition, yPosition, player, vakjeId) {
    if (x >= 0 && y >= 0 && x <= 7 && y <= 7) {
      //voor te controleren of dat er gaan jelly buiten het scherm gaan
      if (this.jellys[x][y] !== undefined) {
        if (x === 0 || y === 0 || x === 7 || y === 7) {
          //controle rand
          if (this.jellys[x][y].grow >= 2) {
            player.score ++;
            this.executeSplashes2.push({
              x: x,
              y: y,
              xPosition: xPosition,
              yPosition: yPosition,
              player: player,
              vakjeId: vakjeId
            });
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
            this.executeSplashes2.push({
              x: x,
              y: y,
              xPosition: xPosition,
              yPosition: yPosition,
              player: player,
              vakjeId: vakjeId
            });
          }
        }
      } else {
        this.addJelly(x, y, xPosition, yPosition, player);
      }
    }
  }
}
