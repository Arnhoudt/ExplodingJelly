import JellyManager from '../gameobjects/JellyManager';
import PlayerManager from '../gameobjects/PlayerManager';

export default class TutorialScene extends Phaser.Scene {
  constructor() {
    super({
      key: `tutorial`
    });
  }

  init(players) {
    players = [['player', 'red'], ['computer', 'blue']];
    this.vakjes = [];
    this.jellyManager = new JellyManager(this);
    this.playerManager = new PlayerManager(this);
    this.playerManager.addPlayers(players);
    this.pushed = 0;
  }

  preload() {
    this.load.image('mask', 'src/assets/mask1.png');
    this.load.image('shadow', 'src/assets/shadow.png');
  }

  create() {

    this.add.image(
      this.sys.game.config.width / 2 + 9,
      this.sys.game.config.height - 181,
      `bg_game`
    );
    this.scene = 0;
    this.createVakjes();
    this.shadow = this.add.graphics();

    const spotlight = this.make.sprite({
      x: 400,
      y: 300,
      key: 'mask',
      add: false
    });



    this.input.on('pointermove', function (pointer) {

      spotlight.x = pointer.x;
      spotlight.y = pointer.y;

    });

    const shadow = this.add.image(0, 0, 'shadow');
    shadow.setScale(20);
    shadow.mask = new Phaser.Display.Masks.BitmapMask(this, spotlight);
    shadow.mask.invertAlpha = true;
  }

  update() {
    this.i = 0;
    this.playerManager.playerScores.forEach(score => {
      score.setText(`${this.playerManager.players[this.i].score}`);
      this.i ++;
    });
    if (this.input.activePointer.isDown)
    {
      this.makeScene();
    }

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
    for (let i = 0;i < 8;i ++) {
      for (let j = 0;j < 8;j ++) {
        this.vakjes.push(
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
                this.playerManager.players
              );
              this.specialAbility();
            })
        );
      }
    }
  }

  specialAbility() {
    this.playerManager.players.forEach(player => {
      if (
        player.score > 100 &&
        this.pushed === 0 &&
        this.specialButton === undefined
      ) {
        this.specialButton = this.add
          .image(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2 - 150,
            `specialButton`
          )
          .setInteractive()
          .on(`pointerup`, () => {
            this.destroyTripleJellys(2);
            this.specialButton.destroy();
            this.specialButton = undefined;
            this.pushed ++;
          });
      } else if (
        player.score > 200 &&
        this.pushed === 1 &&
        this.specialButton === undefined
      ) {
        this.specialButton = this.add
          .image(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2 - 150,
            `specialButton`
          )
          .setInteractive()
          .on(`pointerup`, () => {
            this.destroyTripleJellys(1);
            this.specialButton.destroy();
            this.specialButton = undefined;
            this.pushed ++;
          });
      }
    });
  }

  updateJelly(x, y, xPosition, yPosition, players) {
    players.forEach(player => {
      if (player.active)
        this.verify = this.jellyManager.verifyPlayerMove(
          x,
          y,
          xPosition,
          yPosition,
          player
        );
    });
    this.playerManager.updatePlayer(this.verify);
  }


  makeScene() {
    const circle = new Phaser.Geom.Circle(180, 130, 175);
    const graphics = this.add.graphics();
    graphics.lineStyle(100, 0x000000, 0.1);
    graphics.strokeCircleShape(circle);
  }
}
