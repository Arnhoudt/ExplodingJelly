import JellyManager from '../gameobjects/JellyManager';
import PlayerManager from '../gameobjects/PlayerManager';
import Vakje from '../gameobjects/Vakje';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: `game`
    });
  }

  init(players) {
    this.vakjes = [];
    this.jellyManager = new JellyManager(this);
    this.playerManager = new PlayerManager(this);
    this.playerManager.addPlayers(players);
    this.pushed = 0;
    this.enabled = true;
    this.muteVolume = false;
  }

  preload() {}

  create() {
    this.themeSong = this.sound.add(`themeSong`, {loop: true});
    this.themeSong.play();
    this.add.image(
      this.sys.game.config.width / 2 + 9,
      this.sys.game.config.height - 181,
      `bg_game`
    );
    this.createVakjes();
    this.createReload();
    this.createMute();
    this.createBack();
  }

  update() {
    this.jellyManager.update();
    this.i = 0;
    this.playerManager.playerScores.forEach(score => {
      this.playerManager.players[this.i].score = 0;
      this.jellyManager.jellys.forEach(jellys => {
        jellys.forEach(jelly => {
          if (
            jelly &&
            jelly.color === this.playerManager.players[this.i].color
          ) {
            this.playerManager.players[this.i].score += jelly.grow;
          }
        });
      });
      score.setText(`${this.playerManager.players[this.i].score}`);
      this.i ++;
    });
  }

  destroyTripleJellys(grow) {
    this.jellyManager.jellys.forEach(jellys => {
      jellys.forEach(jelly => {
        if (jelly) {
          if (jelly.grow === 3) {
            jelly.grow = grow;
            jelly.sprite.destroy();
            jelly.sprite = this.add.sprite(
              jelly.xPosition,
              jelly.yPosition,
              `${jelly.color}Jelly${jelly.grow}`
            );
          }
        }
      });
    });
  }

  createVakjes() {
    let vakjeId = 0;
    for (let i = 0;i < 8;i ++) {
      for (let j = 0, id = vakjeId + 1;j < 8;j ++, id ++) {
        this.vakjes.push(
          new Vakje(
            this.add
              .sprite(
                100 + i * 60,
                335 + j * 60,
                `${this.playerManager.players[0].color}Vakje`
              )
              .setInteractive()
              .on(`pointerup`, () => {
                this.updateJelly(
                  i,
                  j,
                  100 + i * 60,
                  335 + j * 60,
                  this.playerManager.players,
                  id
                );
              }),
            id
          )
        );
        vakjeId = id;
      }
    }
  }

  updateJelly(x, y, xPosition, yPosition, players, vakjeId) {
    if (this.muteVolume === false) {
      this.sound
        .add(`splash${(Math.floor(Math.random() * 5) + 1).toString()}`)
        .play();
    }
    if (this.jellyManager.isAnimationBuzy() === false) {
      players.forEach(player => {
        if (player.active) {
          this.verify = this.jellyManager.verifyPlayerMove(
            x,
            y,
            xPosition,
            yPosition,
            player,
            vakjeId
          );
        }
      });
      this.playerManager.updatePlayer(this.verify, this);
    }
  }

  checkWon() {
    this.i = 0;
    this.allTheSame = true;
    this.jellyManager.jellys.forEach(jellys => {
      jellys.forEach(jelly => {
        if (jelly !== undefined) {
          this.i ++;
          if (this.i === 1) {
            this.color1 = jelly.color;
            this.i ++;
          }
          if (this.i > 2) this.color2 = jelly.color;
          if (this.color1 !== this.color2 && this.i > 2)
            this.allTheSame = false;
        }
      });
    });
    if (this.allTheSame && this.i > 2 && this.enabled) {
      this.themeSong.destroy();
      this.scene.start(`win`, {
        players: this.playerManager.players,
        winner: this.color1
      });
      this.enabled = false;
    }
  }

  createReload() {
    this.reload = this.add.sprite(590, 30, `reload_game`).setInteractive();
    this.reload.on(`pointerdown`, () => {
      this.reload.setScale(1.1);
    });

    this.reload.on(`pointerup`, () => {
      this.themeSong.destroy();
      this.reload.setScale(1);
      this.scene.restart();
    });
  }

  createMute() {
    this.mute = this.add.sprite(540, 30, `mute_game`).setInteractive();
    this.mute.on(`pointerdown`, () => {
      this.mute.setScale(1.1);
    });

    this.mute.on(`pointerup`, () => {
      this.mute.setScale(1);
      this.volumeDown();
    });
  }

  createUnmute() {
    this.unmute = this.add.sprite(540, 30, `unmute_game`).setInteractive();
    this.unmute.on(`pointerdown`, () => {
      this.unmute.setScale(1.1);
    });

    this.unmute.on(`pointerup`, () => {
      this.unmute.setScale(1);
      this.volumeUp();
    });
  }

  volumeDown() {
    this.mute.destroy();
    this.createUnmute();
    this.themeSong.setVolume(0);
    this.muteVolume = true;
  }
  volumeUp() {
    this.unmute.destroy();
    this.createMute();
    this.themeSong.setVolume(1);
    this.muteVolume = false;
  }

  createBack() {
    this.back = this.add.sprite(30, 30, `back`).setInteractive();
    this.back.on(`pointerdown`, () => {
      this.back.setScale(1.1);
    });

    this.back.on(`pointerup`, () => {
      this.back.setScale(1);
      this.scene.start(`choose`);
      this.themeSong.destroy();
    });
  }
}
