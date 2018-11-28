import Player from './Player';

export default class PlayerManager {
  constructor(that) {
    this.gameScene = that;
    this.players = [];
    this.playerScores = [];
    this.playerJellys = [];
    this.playerNames = [];
  }
  getPlayerByName(name) {
    this.players.forEach(player => {
      if (player['name'] === name) {
        this.player = player;
      }
    });
    if (this.player !== undefined) {
      return this.player;
    } else {
      return false;
    }
  }
  forcePlayerToBeActive(target) {
    this.players.forEach(player => {
      if (target === player) {
        player.active = true;
      } else {
        player.active = false;
      }
    });
  }
  addPlayers(players) {
    this.i = 0;
    players.forEach(player => {
      this.players[this.i] = new Player(player[0], player[1]);
      this.i ++;
    });
    this.players[0].set(`play`);

    this.i = 0;
    this.placex = 0;
    this.placex2 = 0;
    if (players.length === 2) {
      this.placex = 180;
      this.placex2 = 260;
    }
    if (players.length === 3) {
      this.placex = 110;
      this.placex2 = 200;
    }
    if (players.length === 4) {
      this.placex = 80;
      this.placex2 = 155;
    }
    this.players.forEach((player, index) => {
      this.gameScene.anims.remove(`${player.color}Animatie`);
      this.gameScene.anims.create({
        key: `${player.color}Animatie`,
        frames: this.gameScene.anims.generateFrameNames(
          `${player.color}Jelly's`,
          {
            prefix: `${player.color}Jelly`,
            start: 0,
            end: 89,
            suffix: `.png`
          }
        ),
        frameRate: 20 + index,
        repeat: - 1
      });
      this.playerJellys[this.i] = this.gameScene.add
        .sprite(
          this.placex + this.i * this.placex2,
          125,
          `${player.color}Jelly's`
        )
        .setScale(0.42)
        .play(`${player.color}Animatie`);
      this.playerNames[this.i] = this.gameScene.add
        .text(
          this.placex + this.i * this.placex2,
          185,
          `${player.name}`,
          this.textConfig(player)
        )
        .setOrigin(0.5, 0);
      this.playerScores[this.i] = this.gameScene.add
        .text(
          this.placex + this.i * this.placex2,
          220,
          `${player.score}`,
          this.textConfig(player)
        )
        .setOrigin(0.5, 0);
      this.i ++;
    });
    this.playerTurn = this.gameScene.add
      .text(310, 15, `${players[0][0]}`, {
        fontFamily: 'Ubuntu',
        fontStyle: 'Bold',
        fontSize: 24,
        color: `${players[0][1]}`
      })
      .setOrigin(0.5, 0);
  }

  textConfig(player) {
    return {
      fontFamily: 'Ubuntu',
      fontStyle: 'Bold',
      fontSize: 24,
      color: `${player.color}`
    };
  }

  updatePlayer(verify) {
    if (verify === true) {
      //voor als de speler op een verkeerde jelly druk dat de beurt niet veranderd.
      if (this.players.length === 4) {
        if (this.players[0].active) {
          this.players[0].set(`standby`);
          this.players[1].set(`play`);
          this.players[2].set(`standby`);
          this.players[3].set(`standby`);
        } else if (this.players[1].active) {
          this.players[0].set(`standby`);
          this.players[1].set(`standby`);
          this.players[2].set(`play`);
          this.players[3].set(`standby`);
        } else if (this.players[2].active) {
          this.players[0].set(`standby`);
          this.players[1].set(`standby`);
          this.players[2].set(`standby`);
          this.players[3].set(`play`);
        } else if (this.players[3].active) {
          this.players[0].set(`play`);
          this.players[1].set(`standby`);
          this.players[2].set(`standby`);
          this.players[3].set(`standby`);
        }
      }
      if (this.players.length === 3) {
        if (this.players[0].active) {
          this.players[0].set(`standby`);
          this.players[1].set(`play`);
          this.players[2].set(`standby`);
        } else if (this.players[1].active) {
          this.players[0].set(`standby`);
          this.players[1].set(`standby`);
          this.players[2].set(`play`);
        } else if (this.players[2].active) {
          this.players[0].set(`play`);
          this.players[1].set(`standby`);
          this.players[2].set(`standby`);
        }
      }
      if (this.players.length === 2) {
        if (this.players[0].active) {
          this.players[0].set(`standby`);
          this.players[1].set(`play`);
        } else if (this.players[1].active) {
          this.players[0].set(`play`);
          this.players[1].set(`standby`);
        }
      }

      this.players.forEach(player => {
        if (player.active) {
          if (this.playerTurn) this.playerTurn.destroy();
          this.playerTurn = this.gameScene.add
            .text(310, 15, `${player.name}`, this.textConfig(player))
            .setOrigin(0.5, 0);
          this.gameScene.vakjes.forEach(vakje => {
            vakje.get(`sprite`).setTexture(`${player.color}Vakje`);
          });
        }
      });
    }
  }
}
