import JellyManager from '../gameobjects/JellyManager';
import PlayerManager from '../gameobjects/PlayerManager';
import Vakje from '../gameobjects/Vakje';

export default class TutorialScene extends Phaser.Scene {
  constructor() {
    super({
      key: `tutorial`
    });
  }

  init(players) {
    this.waitForClickAble = false;
    this.fontSizeTitle = 62;
    this.fontSizeText = 20;
    this.enabled = true;


    this.fontSizenote = 14;
    this.textColorOrange = 'white';
    this.defaultFontFamily = 'Ubuntu';
    this.fontWeightTitle = 'bold';
    this.fontWeightText = 'bold';
    this.fontWeightnote = 'bold';
    this.marginLeft = 60;

    this.boardActive = false;
    this.forceSquare = [- 1, - 1];

    players = [['player', 'red'], ['computer', 'blue']];
    this.vakjes = [];
    this.jellyManager = new JellyManager(this);
    this.playerManager = new PlayerManager(this);
    this.playerManager.addPlayers(players);
    this.pushed = 0;
  }

  preload() {}

  create() {
    this.tutorialSceneNr = 1;
    this.input.on(
      'pointerdown',
      function() {
        if (this.waitForClickAble === true) {
          this.tutorialSceneNr ++;
          this.waitForClickAble = false;
          this.destroyAssets(this.assets);
        }
      },
      this
    );
    this.add.image(
      this.sys.game.config.width / 2 + 9,
      this.sys.game.config.height - 181,
      `bg_game`
    );
    this.createVakjes();
    this.shadow = this.add.graphics();

    // this.input.on('pointermove', function (pointer) {
    //
    //   spotlight.x = pointer.x;
    //   spotlight.y = pointer.y;
    //
    // });
  }

  update() {
    this.jellyManager.update();
    this.i = 0;
    this.playerManager.playerScores.forEach(score => {
      if (this.playerManager.players[this.i]) {
        this.playerManager.players[this.i].score = 0;
        this.jellyManager.jellys.forEach(jellys => {
          jellys.forEach(jelly => {
            if (
              jelly &&
              jelly.color === this.playerManager.players[this.i].color
            ) {
              this.playerManager.players[this.i].score += jelly.grow;
              this.playerManager.players[this.i].enablePlayer = true;
            }
          });
        });
        score.setText(`${this.playerManager.players[this.i].score}`);
      }
      this.i ++;
    });
    switch (this.tutorialSceneNr) {
    case 1:
      this.tutorialSceneHi();
      break;
    case 2:
      this.tutorialSceneHiWaitForClick();
      break;
    case 3:
      this.tutorialFirstJelly();
      break;
    case 4:
      this.tutorialFirstJellyWaitForJelly();
      break;
    case 5:
      this.tutorialGrowJellySize2();
      break;
    case 6:
      this.tutorialWaitForGrowJellySize2();
      break;
    case 7:
      this.tutorialGrowJellySize3();
      break;
    case 8:
      this.tutorialWaitForGrowJellySize3();
      break;
    case 9:
      this.tutorialExplodeJelly();
      break;
    case 10:
      this.tutorialWaitForExplodeJelly();
      break;
    case 11:
      this.tutorialExplainExplosion();
      break;
    case 12:
      this.tutorialWaitForExplainExplosion();
      break;
    case 13:
      this.tutorialGrowMechanics1();
      break;
    case 14:
      this.waitForClick();
      break;
    case 15:
      this.tutorialGrowMechanics2();
      break;
    case 16:
      this.waitForClick();
      break;
    case 17:
      this.tutorialExplodeSide();
      break;
    case 18:
      this.tutorialWaitForExplodeSide();
      break;
    case 19:
      this.tutorialChaining();
      break;
    case 20:
      this.tutorialWaitForChaining();
      break;
    case 21:
      this.tutorialTimeToWin();
      break;
    case 22:
      this.tutorialWaitForTimeToWin();
      break;
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
    if (
      this.boardActive === true &&
      x === this.forceSquare[0] &&
      y === this.forceSquare[1]
    ) {
      players.forEach(player => {
        if (player.active)
          this.verify = this.jellyManager.verifyPlayerMove(
            x,
            y,
            xPosition,
            yPosition,
            player,
            vakjeId
          );
      });
      //this.playerManager.updatePlayer(this.verify);
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
          if (this.color1 !== this.color2 && this.i > 2) {
            this.allTheSame = false;
          }
        }
      });
    });
    if (this.allTheSame && this.i > 2 && this.enabled) {
      this.scene.start(`win`, {
        players: this.playerManager.players,
        winner: this.color1
      });
      this.enabled = false;
    }
  }

  makeScene() {}

  waitForClick() {
    this.waitForClickAble = true;
  }
  setSpotlight(x, y, radius) {
    const spotlight = this.make.sprite({
      x: x,
      y: y,
      key: 'mask',
      add: false
    });
    spotlight.setScale(radius / 1000);
    const shadow = this.add.image(0, 0, 'shadow');
    shadow.setScale(2);
    shadow.mask = new Phaser.Display.Masks.BitmapMask(this, spotlight);
    shadow.mask.invertAlpha = true;
    return [spotlight, shadow];
  }
  destroyAssets(assets) {
    for (let i = 0;i < assets.length;i ++) {
      assets[i].destroy();
    }
  }

  //--------------SCENES--------------//

  //scene 1
  tutorialSceneHi() {
    this.assets = [];
    const spotlight = this.setSpotlight(0, 0, 0);
    this.assets.push(spotlight[0]);
    this.assets.push(spotlight[1]);
    this.assets.push(
      this.add.text(this.marginLeft, 50, 'Hey,', {
        fontSize: this.fontSizeTitle,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: this.fontWeightTitle
      })
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        170,
        'So... what is the point of the game?',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );
    this.assets.push(
      this.add.text(this.marginLeft, 200, 'You need to explode jelly\'s', {
        fontSize: this.fontSizeText,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: 'bold'
      })
    );
    this.assets.push(
      this.add.text(80, 400, 'click on the jelly to', {
        fontSize: this.fontSizeText,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: 'bold'
      })
    );
    this.assets.push(
      this.add.text(93, 430, 'make it explode', {
        fontSize: this.fontSizeText,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: 'bold'
      })
    );

    this.hiJelly = this.add.image(350, 600, 'hiJelly');
    this.assets.push(this.hiJelly);
    this.hiJelly.setInteractive();
    this.tutorialSceneNr = 2;
  }
  tutorialSceneHiWaitForClick() {
    this.hiJelly.on('pointerdown', () => {
      this.hiJelly.destroy();
      this.assets.push(this.add.image(400, 750, 'redJelly'));
      this.assets.push(this.add.image(410, 470, 'redJelly'));
      this.assets.push(this.add.image(280, 600, 'redJelly'));
      this.assets.push(this.add.image(540, 620, 'redJelly'));
      this.time.delayedCall(100, this.nextScene, [], this);
    });
  }

  nextScene() {
    this.destroyAssets(this.assets);
    this.tutorialSceneNr = 3;
  }

  //scene 2
  tutorialFirstJelly() {
    this.assets = [];
    const spotlight = this.setSpotlight(300, 600, 700);
    this.assets.push(spotlight[0]);
    this.assets.push(spotlight[1]);
    this.assets.push(
      this.add.text(this.marginLeft, 20, 'Great!', {
        fontSize: this.fontSizeTitle,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: this.fontWeightTitle
      })
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        120,
        'Now it is time to place your first jelly on the board',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );
    this.assets.push(
      this.add.text(180, 220, 'Click on the blue square to place the jelly', {
        fontSize: this.fontSizenote,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: 'bold'
      })
    );

    this.assets.push((this.highlight = this.add.image(158, 395, 'highlight')));
    this.highlight.setScale(0.65);
    this.forceSquare = [1, 1];
    this.boardActive = true;
    this.tutorialSceneNr = 4;
  }
  tutorialFirstJellyWaitForJelly() {
    if (this.jellyManager.isThereAJellyAt(1, 1)) {
      const assetsToDestroy = this.assets;
      this.time.delayedCall(100, this.destroyAssets, [assetsToDestroy], this);
      this.tutorialSceneNr = 5;
    }
  }

  //scene 3
  tutorialGrowJellySize2() {
    this.computer = this.playerManager.getPlayerByName('computer');
    this.jellyManager.addJelly(7, 7, 100 + 7 * 60, 335 + 7 * 60, this.computer);
    this.playerManager.forcePlayerToBeActive(
      this.playerManager.getPlayerByName('player')
    );
    this.assets = [];
    const spotlight = this.setSpotlight(300, 600, 700);
    this.assets.push(spotlight[0]);
    this.assets.push(spotlight[1]);
    this.assets.push(
      this.add.text(this.marginLeft, 20, 'You got it!', {
        fontSize: this.fontSizeTitle,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: this.fontWeightTitle
      })
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        120,
        'Your opponent has placed his jelly in the corner. Don\' worry',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        150,
        'about him, grow your jelly by clicking on the jelly again.',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );
    this.assets.push(
      this.add.text(180, 220, 'Click on the blue square to grow the jelly', {
        fontSize: this.fontSizenote,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: 'bold'
      })
    );
    this.assets.push((this.highlight = this.add.image(158, 395, 'highlight')));
    this.highlight.setScale(0.65);
    this.forceSquare = [1, 1];
    this.boardActive = true;
    this.tutorialSceneNr = 6;
  }
  tutorialWaitForGrowJellySize2() {
    if (
      this.jellyManager.isThereAJellyAt(1, 1) &&
      this.jellyManager.sizeOfJellyAt(1, 1) === 2
    ) {
      const assetsToDestroy = this.assets;
      this.time.delayedCall(100, this.destroyAssets, [assetsToDestroy], this);
      this.tutorialSceneNr = 7;
    }
  }

  //scene 4
  tutorialGrowJellySize3() {
    this.computer = this.playerManager.getPlayerByName('computer');
    this.jellyManager.addJelly(2, 1, 100 + 2 * 60, 335 + 1 * 60, this.computer);
    this.playerManager.forcePlayerToBeActive(
      this.playerManager.getPlayerByName('player')
    );
    this.assets = [];
    const spotlight = this.setSpotlight(300, 600, 700);
    this.assets.push(spotlight[0]);
    this.assets.push(spotlight[1]);
    this.assets.push(
      this.add.text(this.marginLeft, 20, 'What???', {
        fontSize: this.fontSizeTitle,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: this.fontWeightTitle
      })
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        120,
        'Your opponent placed a jelly next to yours!',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        150,
        'We need to grow our jelly once more to be able to explode',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );
    this.assets.push(
      this.add.text(180, 220, 'Click on the blue square to grow the jelly', {
        fontSize: this.fontSizenote,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: 'bold'
      })
    );
    this.assets.push((this.highlight = this.add.image(158, 395, 'highlight')));
    this.highlight.setScale(0.65);
    this.forceSquare = [1, 1];
    this.boardActive = true;
    this.tutorialSceneNr = 8;
  }
  tutorialWaitForGrowJellySize3() {
    if (
      this.jellyManager.isThereAJellyAt(1, 1) &&
      this.jellyManager.sizeOfJellyAt(1, 1) === 3
    ) {
      const assetsToDestroy = this.assets;
      this.time.delayedCall(100, this.destroyAssets, [assetsToDestroy], this);
      this.tutorialSceneNr = 9;
    }
  }

  //scene 5
  tutorialExplodeJelly() {
    this.computer = this.playerManager.getPlayerByName('computer');
    this.jellyManager.addJelly(6, 5, 100 + 6 * 60, 335 + 5 * 60, this.computer);
    this.playerManager.forcePlayerToBeActive(
      this.playerManager.getPlayerByName('player')
    );
    this.assets = [];
    const spotlight = this.setSpotlight(300, 600, 700);
    this.assets.push(spotlight[0]);
    this.assets.push(spotlight[1]);
    this.assets.push(
      this.add.text(this.marginLeft, 20, 'Make it explode!', {
        fontSize: this.fontSizeTitle,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: this.fontWeightTitle
      })
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        120,
        'Your jelly is big enough to explode, tap on the jelly and',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );
    this.assets.push(
      this.add.text(this.marginLeft, 150, 'watch what happens', {
        fontSize: this.fontSizeText,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: this.fontWeightText
      })
    );
    this.assets.push(
      this.add.text(180, 220, 'Click on the blue square to explode the jelly', {
        fontSize: this.fontSizenote,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: 'bold'
      })
    );
    this.assets.push((this.highlight = this.add.image(158, 395, 'highlight')));
    this.highlight.setScale(0.65);
    this.forceSquare = [1, 1];
    this.boardActive = true;
    this.tutorialSceneNr = 10;
  }
  tutorialWaitForExplodeJelly() {
    if (this.jellyManager.isThereAJellyAt(1, 1) !== true) {
      const assetsToDestroy = this.assets;
      this.time.delayedCall(100, this.destroyAssets, [assetsToDestroy], this);
      this.tutorialSceneNr = 11;
    }
  }

  //scene 6
  tutorialExplainExplosion() {
    this.computer = this.playerManager.getPlayerByName('computer');
    this.jellyManager.addJelly(6, 6, 100 + 6 * 60, 335 + 6 * 60, this.computer);
    this.playerManager.forcePlayerToBeActive(
      this.playerManager.getPlayerByName('player')
    );
    this.assets = [];
    const spotlight = this.setSpotlight(300, 600, 700);
    this.assets.push(spotlight[0]);
    this.assets.push(spotlight[1]);
    this.assets.push(
      this.add.text(this.marginLeft, 20, 'You\'re amazing!', {
        fontSize: this.fontSizeTitle,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: this.fontWeightTitle
      })
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        120,
        'You took one of your opponents jelly\'s. When a jelly',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        150,
        'explodes it explodes to the adjacent squares.',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        180,
        'Click on the jelly at the top to enlarge it',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );

    this.assets.push(
      this.add.text(180, 220, 'Click on the blue square to enlarge the jelly', {
        fontSize: this.fontSizenote,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: 'bold'
      })
    );
    this.assets.push((this.highlight = this.add.image(158, 335, 'highlight')));
    this.highlight.setScale(0.65);
    this.forceSquare = [1, 0];
    this.boardActive = true;
    this.tutorialSceneNr = 12;
  }
  tutorialWaitForExplainExplosion() {
    if (
      this.jellyManager.isThereAJellyAt(1, 0) &&
      this.jellyManager.sizeOfJellyAt(1, 0) === 2
    ) {
      const assetsToDestroy = this.assets;
      this.time.delayedCall(100, this.destroyAssets, [assetsToDestroy], this);
      this.tutorialSceneNr = 13;
    }
  }

  //scene 7
  tutorialGrowMechanics1() {
    this.computer = this.playerManager.getPlayerByName('computer');
    //this.jellyManager.addJelly(6, 6, 100 + 6 * 60, 335 + 6 * 60, this.computer);
    this.playerManager.forcePlayerToBeActive(
      this.playerManager.getPlayerByName('player')
    );
    this.assets = [];
    const spotlight = this.setSpotlight(0, 0, 0);
    this.assets.push(spotlight[0]);
    this.assets.push(spotlight[1]);
    this.assets.push(
      this.add.text(this.marginLeft, 20, 'Grow mechanics', {
        fontSize: this.fontSizeTitle,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: this.fontWeightTitle
      })
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        120,
        'If your jelly is on a square with 4 adjacent squares,',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        150,
        'the jelly can grow to a size of 3 before exploding',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );
    this.assets.push(
      this.add.image(
        this.sys.game.config.width / 2 + 9,
        this.sys.game.config.height - 281,
        `growMechanic1`
      )
    );
    this.assets.push(
      this.add.text(400, 770, 'click to continue >', {
        fontSize: this.fontSizeText,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: this.fontWeightText
      })
    );
    this.boardActive = false;
    this.tutorialSceneNr = 14;
  }

  //scene 8
  tutorialGrowMechanics2() {
    this.assets = [];
    const spotlight = this.setSpotlight(0, 0, 0);
    this.assets.push(spotlight[0]);
    this.assets.push(spotlight[1]);
    this.assets.push(
      this.add.text(this.marginLeft, 20, 'euh this is boring...', {
        fontSize: this.fontSizeTitle,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: this.fontWeightTitle
      })
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        120,
        'If the square has only 3 adjacent squares it can grow',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );
    this.assets.push(
      this.add.text(this.marginLeft, 150, 'to a size of 2 before exploding.', {
        fontSize: this.fontSizeText,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: this.fontWeightText
      })
    );
    this.assets.push(
      this.add
        .image(this.sys.game.config.width / 2 + 9, 300, `growMechanic2`)
        .setScale(0.7)
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        440,
        'If it is in a corner where there are',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        470,
        'only 2 adjacent squares it can\'t grow.',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );
    this.assets.push(
      this.add
        .image(
          this.sys.game.config.width / 2 + 9,
          this.sys.game.config.height - 210,
          `growMechanic3`
        )
        .setScale(0.7)
    );

    this.assets.push(
      this.add.text(400, 770, 'click to continue >', {
        fontSize: this.fontSizeText,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: this.fontWeightText
      })
    );
    this.boardActive = false;
    this.tutorialSceneNr = 16;
  }

  //scene 9
  tutorialExplodeSide() {
    this.computer = this.playerManager.getPlayerByName('computer');
    //this.jellyManager.addJelly(6, 6, 100 + 6 * 60, 335 + 6 * 60, this.computer);
    this.playerManager.forcePlayerToBeActive(
      this.playerManager.getPlayerByName('player')
    );
    this.assets = [];
    const spotlight = this.setSpotlight(300, 600, 700);
    this.assets.push(spotlight[0]);
    this.assets.push(spotlight[1]);
    this.assets.push(
      this.add.text(this.marginLeft, 20, 'More explosions!', {
        fontSize: this.fontSizeTitle,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: this.fontWeightTitle
      })
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        120,
        'The jelly in the blue square has only 3 adjacent squares,',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        150,
        'this means you can already explode it!',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        180,
        'Click on the jelly to make it explode',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );

    this.assets.push(
      this.add.text(180, 220, 'Click on the blue square to enlarge the jelly', {
        fontSize: this.fontSizenote,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: 'bold'
      })
    );
    this.assets.push((this.highlight = this.add.image(158, 335, 'highlight')));
    this.highlight.setScale(0.65);
    this.forceSquare = [1, 0];
    this.boardActive = true;
    this.tutorialSceneNr = 18;
  }
  tutorialWaitForExplodeSide() {
    if (this.jellyManager.isThereAJellyAt(1, 0) !== true) {
      const assetsToDestroy = this.assets;
      this.time.delayedCall(100, this.destroyAssets, [assetsToDestroy], this);
      this.tutorialSceneNr = 19;
    }
  }

  //scene 10
  tutorialChaining() {
    this.computer = this.playerManager.getPlayerByName('computer');
    this.player = this.playerManager.getPlayerByName('player');
    // this.jellyManager.addJelly(6, 6, 100 + 6 * 60, 335 + 6 * 60, this.computer);
    this.jellyManager.growJellyToSize(6, 6, this.computer, 2);
    // this.jellyManager.addJelly(6, 5, 100 + 6 * 60, 335 + 5 * 60, this.computer);
    this.jellyManager.growJellyToSize(6, 5, this.computer, 2);

    this.jellyManager.addJelly(6, 7, 100 + 6 * 60, 335 + 7 * 60, this.computer);
    this.jellyManager.growJellyToSize(6, 7, this.computer, 1);

    this.jellyManager.addJelly(5, 6, 100 + 5 * 60, 335 + 6 * 60, this.computer);
    this.jellyManager.growJellyToSize(5, 6, this.computer, 2);

    this.jellyManager.growJellyToSize(2, 1, this.player, 1);
    this.jellyManager.addJelly(2, 2, 100 + 2 * 60, 335 + 2 * 60, this.player);
    this.jellyManager.growJellyToSize(2, 2, this.player, 2);
    this.jellyManager.addJelly(2, 3, 100 + 2 * 60, 335 + 3 * 60, this.player);
    this.jellyManager.growJellyToSize(2, 3, this.player, 2);
    this.jellyManager.addJelly(2, 4, 100 + 2 * 60, 335 + 4 * 60, this.player);
    this.jellyManager.growJellyToSize(2, 4, this.player, 2);
    this.jellyManager.addJelly(2, 5, 100 + 2 * 60, 335 + 5 * 60, this.player);
    this.jellyManager.growJellyToSize(2, 5, this.player, 2);
    this.jellyManager.addJelly(3, 2, 100 + 3 * 60, 335 + 2 * 60, this.player);
    this.jellyManager.growJellyToSize(3, 2, this.player, 2);
    this.jellyManager.addJelly(3, 3, 100 + 3 * 60, 335 + 3 * 60, this.player);
    this.jellyManager.growJellyToSize(3, 3, this.player, 2);
    this.jellyManager.addJelly(3, 4, 100 + 3 * 60, 335 + 4 * 60, this.player);
    this.jellyManager.growJellyToSize(3, 4, this.player, 2);
    this.jellyManager.addJelly(3, 5, 100 + 3 * 60, 335 + 5 * 60, this.player);
    this.jellyManager.growJellyToSize(3, 5, this.player, 2);
    this.jellyManager.addJelly(4, 2, 100 + 4 * 60, 335 + 2 * 60, this.player);
    this.jellyManager.growJellyToSize(4, 2, this.player, 2);
    this.jellyManager.addJelly(5, 2, 100 + 5 * 60, 335 + 2 * 60, this.player);
    this.jellyManager.growJellyToSize(5, 2, this.player, 2);
    this.jellyManager.addJelly(6, 2, 100 + 6 * 60, 335 + 2 * 60, this.player);
    this.jellyManager.growJellyToSize(6, 2, this.player, 2);
    this.jellyManager.addJelly(7, 2, 100 + 7 * 60, 335 + 2 * 60, this.player);

    this.playerManager.forcePlayerToBeActive(
      this.playerManager.getPlayerByName('player')
    );
    this.assets = [];
    const spotlight = this.setSpotlight(300, 600, 700);
    this.assets.push(spotlight[0]);
    this.assets.push(spotlight[1]);
    this.assets.push(
      this.add.text(this.marginLeft, 20, 'Chaining', {
        fontSize: this.fontSizeTitle,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: this.fontWeightTitle
      })
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        120,
        'So... What happens if you explode a jelly onto an other',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        150,
        'jelly? It also explodes making a very big explosion!',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        180,
        'I gave you some extra jelly\'s to make the explosion bigger.',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        210,
        'Click on the highlighted jelly and enjoy the explosion',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );
    this.assets.push((this.highlight = this.add.image(218, 395, 'highlight')));
    this.highlight.setScale(0.65);
    this.forceSquare = [2, 1];
    this.boardActive = true;
    this.tutorialSceneNr = 20;
  }
  tutorialWaitForChaining() {
    if (this.jellyManager.isThereAJellyAt(2, 1) === false) {
      const assetsToDestroy = this.assets;
      this.time.delayedCall(100, this.destroyAssets, [assetsToDestroy], this);
      this.tutorialSceneNr = 21;
    }
  }

  //scene 11
  tutorialTimeToWin() {
    this.computer = this.playerManager.getPlayerByName('computer');
    this.jellyManager.addJelly(7, 6, 100 + 7 * 60, 335 + 6 * 60, this.player);
    this.jellyManager.growJellyToSize(7, 6, this.player, 1);

    this.assets = [];
    const spotlight = this.setSpotlight(300, 600, 700);
    this.assets.push(spotlight[0]);
    this.assets.push(spotlight[1]);
    this.assets.push(
      this.add.text(this.marginLeft, 20, 'It is time to win!', {
        fontSize: this.fontSizeTitle,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: this.fontWeightTitle
      })
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        120,
        'You\'ve learned everything you need to know, now it is time',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        150,
        'to win. Click on the highlighted jelly to make it explode and',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );
    this.assets.push(
      this.add.text(
        this.marginLeft,
        180,
        'Take over all the blue jelly\'s',
        {
          fontSize: this.fontSizeText,
          fill: this.textColorOrange,
          fontFamily: this.defaultFontFamily,
          fontWeight: this.fontWeightText
        }
      )
    );

    this.assets.push(
      this.add.text(180, 220, 'Click on the blue square to make the jelly explode', {
        fontSize: this.fontSizenote,
        fill: this.textColorOrange,
        fontFamily: this.defaultFontFamily,
        fontWeight: 'bold'
      })
    );
    this.assets.push((this.highlight = this.add.image(518, 695, 'highlight')));
    this.highlight.setScale(0.65);
    this.forceSquare = [7, 6];
    this.boardActive = true;
    this.playerManager.forcePlayerToBeActive(
      this.playerManager.getPlayerByName('player')
    );
    this.tutorialSceneNr = 22;

  }
  tutorialWaitForTimeToWin() {

  }
}
