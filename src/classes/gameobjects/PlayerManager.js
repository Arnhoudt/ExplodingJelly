import Player from './Player';

export default class PlayerManager {
  constructor(that) {
    this.gameScene = that;
    this.player1;
    this.player2;
    this.player3;
    this.player4;
  }

  addPlayers(
    player1,
    color1,
    player2,
    color2,
    player3,
    color3,
    player4,
    color4
  ) {
    if (player1 !== undefined) {
      this.player1 = new Player(player1, color1);
      this.player1.set(`play`);
    }
    if (player2 !== undefined) {
      this.player2 = new Player(player2, color2);
    }
    if (player3 !== undefined) {
      this.player3 = new Player(player3, color3);
    }
    if (player4 !== undefined) {
      this.player4 = new Player(player4, color4);
    }

    if (
      player1 !== undefined &&
      player2 !== undefined &&
      player3 !== undefined &&
      player4 !== undefined
    ) {
      this.gameScene.add.sprite(80, 100, `${color1}Jelly`);
      this.gameScene.add.sprite(235, 100, `${color2}Jelly`);
      this.gameScene.add.sprite(390, 100, `${color3}Jelly`);
      this.gameScene.add.sprite(540, 100, `${color4}Jelly`);
      this.gameScene.add
        .text(80, 160, `${this.player1.name}`, this.textConfig(this.player1))
        .setOrigin(0.5, 0);
      this.gameScene.add
        .text(235, 160, `${this.player2.name}`, this.textConfig(this.player2))
        .setOrigin(0.5, 0);
      this.gameScene.add
        .text(390, 160, `${this.player3.name}`, this.textConfig(this.player3))
        .setOrigin(0.5, 0);
      this.gameScene.add
        .text(540, 160, `${this.player4.name}`, this.textConfig(this.player4))
        .setOrigin(0.5, 0);
      this.playerScore1 = this.gameScene.add
        .text(80, 190, `${this.player1.score}`, this.textConfig(this.player1))
        .setOrigin(0.5, 0);
      this.playerScore2 = this.gameScene.add
        .text(235, 190, `${this.player2.score}`, this.textConfig(this.player2))
        .setOrigin(0.5, 0);
      this.playerScore3 = this.gameScene.add
        .text(390, 190, `${this.player3.score}`, this.textConfig(this.player3))
        .setOrigin(0.5, 0);
      this.playerScore4 = this.gameScene.add
        .text(540, 190, `${this.player4.score}`, this.textConfig(this.player4))
        .setOrigin(0.5, 0);
    }
    if (
      player1 !== undefined &&
      player2 !== undefined &&
      player3 !== undefined &&
      player4 === undefined
    ) {
      this.gameScene.add.sprite(125, 100, `${color1}Jelly`);
      this.gameScene.add.sprite(310, 100, `${color2}Jelly`);
      this.gameScene.add.sprite(495, 100, `${color3}Jelly`);
      this.gameScene.add
        .text(125, 160, `${this.player1.name}`, this.textConfig(this.player1))
        .setOrigin(0.5, 0);
      this.gameScene.add
        .text(310, 160, `${this.player2.name}`, this.textConfig(this.player2))
        .setOrigin(0.5, 0);
      this.gameScene.add
        .text(495, 160, `${this.player3.name}`, this.textConfig(this.player3))
        .setOrigin(0.5, 0);
      this.playerScore1 = this.gameScene.add
        .text(125, 190, `${this.player1.score}`, this.textConfig(this.player1))
        .setOrigin(0.5, 0);
      this.playerScore2 = this.gameScene.add
        .text(310, 190, `${this.player2.score}`, this.textConfig(this.player2))
        .setOrigin(0.5, 0);
      this.playerScore3 = this.gameScene.add
        .text(495, 190, `${this.player3.score}`, this.textConfig(this.player3))
        .setOrigin(0.5, 0);
    }
    if (
      player1 !== undefined &&
      player2 !== undefined &&
      player3 === undefined &&
      player4 === undefined
    ) {
      console.log(player1.color);
      this.gameScene.add.sprite(150, 100, `${color1}Jelly`);
      this.gameScene.add.sprite(470, 100, `${color2}Jelly`);
      this.gameScene.add
        .text(150, 160, `${this.player1.name}`, this.textConfig(this.player1))
        .setOrigin(0.5, 0);
      this.gameScene.add
        .text(470, 160, `${this.player2.name}`, this.textConfig(this.player2))
        .setOrigin(0.5, 0);
      this.playerScore1 = this.gameScene.add
        .text(150, 190, `${this.player1.score}`, this.textConfig(this.player1))
        .setOrigin(0.5, 0);
      this.playerScore2 = this.gameScene.add
        .text(470, 190, `${this.player2.score}`, this.textConfig(this.player2))
        .setOrigin(0.5, 0);
    }
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
      if (
        this.player1 !== undefined &&
        this.player2 !== undefined &&
        this.player3 !== undefined &&
        this.player4 !== undefined
      ) {
        if (this.player1.active) {
          this.player1.set(`standby`);
          this.player2.set(`play`);
          this.player3.set(`standby`);
          this.player4.set(`standby`);
          this.gameScene.vakjes.forEach(vakje => {
            vakje.setTexture(`${this.player2.color}Vakje`);
          });
        } else if (this.player2.active) {
          this.player1.set(`standby`);
          this.player2.set(`standby`);
          this.player3.set(`play`);
          this.player4.set(`standby`);
          this.gameScene.vakjes.forEach(vakje => {
            vakje.setTexture(`${this.player3.color}Vakje`);
          });
        } else if (this.player3.active) {
          this.player1.set(`standby`);
          this.player2.set(`standby`);
          this.player3.set(`standby`);
          this.player4.set(`play`);
          this.gameScene.vakjes.forEach(vakje => {
            vakje.setTexture(`${this.player4.color}Vakje`);
          });
        } else if (this.player4.active) {
          this.player1.set(`play`);
          this.player2.set(`standby`);
          this.player3.set(`standby`);
          this.player4.set(`standby`);
          this.gameScene.vakjes.forEach(vakje => {
            vakje.setTexture(`${this.player1.color}Vakje`);
          });
        }
      }
      if (
        this.player1 !== undefined &&
        this.player2 !== undefined &&
        this.player3 !== undefined &&
        this.player4 === undefined
      ) {
        if (this.player1.active) {
          this.player1.set(`standby`);
          this.player2.set(`play`);
          this.player3.set(`standby`);
          this.gameScene.vakjes.forEach(vakje => {
            vakje.setTexture(`${this.player2.color}Vakje`);
          });
        } else if (this.player2.active) {
          this.player1.set(`standby`);
          this.player2.set(`standby`);
          this.player3.set(`play`);
          this.gameScene.vakjes.forEach(vakje => {
            vakje.setTexture(`${this.player3.color}Vakje`);
          });
        } else if (this.player3.active) {
          this.player1.set(`play`);
          this.player2.set(`standby`);
          this.player3.set(`standby`);
          this.gameScene.vakjes.forEach(vakje => {
            vakje.setTexture(`${this.player1.color}Vakje`);
          });
        }
      }
      if (
        this.player1 !== undefined &&
        this.player2 !== undefined &&
        this.player3 === undefined &&
        this.player4 === undefined
      ) {
        if (this.player1.active) {
          this.player1.set(`standby`);
          this.player2.set(`play`);
          this.gameScene.vakjes.forEach(vakje => {
            vakje.setTexture(`${this.player2.color}Vakje`);
          });
        } else if (this.player2.active) {
          this.player1.set(`play`);
          this.player2.set(`standby`);
          this.gameScene.vakjes.forEach(vakje => {
            vakje.setTexture(`${this.player1.color}Vakje`);
          });
        }
      }
    }
  }
}
