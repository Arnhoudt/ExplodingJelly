import JellyManager from '../gameobjects/JellyManager';
import PlayerManager from '../gameobjects/PlayerManager';

export default class TutorialScene extends Phaser.Scene {
  constructor() {
    super({
      key: `tutorial`
    });
  }

  init(players) {

    this.fontSizeTitle = 62;
    this.fontSizeText = 20;
    this.fontSizenote = 14;
    this.textColorOrange = '#ff5000';
    this.defaultFontFamily = 'Georgia';
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

  preload() {
    this.load.image('mask', 'src/assets/mask1.png');
    this.load.image('shadow', 'src/assets/shadow.png');
    this.load.image('hiJelly', 'src/assets/hiJelly.png');
    this.load.image('highlight', 'src/assets/highlight.png');
  }

  create() {
    this.tutorialSceneNr = 1;
    this.add.image(
      this.sys.game.config.width / 2 + 9,
      this.sys.game.config.height - 181,
      `bg_game`
    );
    this.scene = 0;
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

    switch (this.tutorialSceneNr) {
    case 1 : this.tutorialSceneHi();
      break;
    case 2: this.tutorialSceneHiWaitForClick();
      break;
    case 3: this.tutorialFirstJelly();
      break;
    case 4: this.tutorialFirstJellyWaitForJelly();
      break;
    case 5: this.tutorialGrowJellySize2();
      break;
    case 6: this.tutorialWaitForGrowJellySize2();
      break;
    case 7: this.tutorialGrowJellySize3();
      break;
    case 8: this.tutorialWaitForGrowJellySize3();
      break;
    case 9: this.tutorialExplodeJelly();
      break;
    case 10: this.tutorialWaitForExplodeJelly();
      break;
    case 11: this.tutorialExplainExplosion();
      break;
    case 12: this.tutorialWaitForExplainExplosion();
      break;
    case 13: this.tutorialGrowMechanics1();
      break;
    case 14: this.waitForClick(15);
      break;
    case 15: this.tutorialGrowMechanics2();
      break;
    case 16: this.waitForClick(17);
      break;
    case 17: this.tutorialExplodeSide();
      break;
    case 18: this.tutorialWaitForExplodeSide();
      break;
    case 19: this.tutorialChaining();
      break;
    case 20: this.tutorialWaitForChaining();
      break;
    case 21: this.tutorialTimeToWin();
      break;
    case 22: this.tutorialWaitForTimeToWin();
      break;
    }

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
    if (this.boardActive === true && x === this.forceSquare[0] && y === this.forceSquare[1]) {
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
  }


  makeScene() {

  }



  waitForClick() {

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
    shadow.setScale(20);
    shadow.mask = new Phaser.Display.Masks.BitmapMask(this, spotlight);
    shadow.mask.invertAlpha = true;
    return ([spotlight, shadow]);
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
    this.assets.push(this.add.text(this.marginLeft, 20, 'Hey,', {fontSize: this.fontSizeTitle, fill: this.textColorOrange, fontFamily: this.defaultFontFamily, fontWeight: this.fontWeightTitle}));
    this.assets.push(this.add.text(this.marginLeft, 120, 'So... what is the point of the game?', {fontSize: this.fontSizeText, fill: this.textColorOrange, fontFamily: this.defaultFontFamily, fontWeight: this.fontWeightText}));
    this.assets.push(this.add.text(this.marginLeft, 150, 'You need to explode jelly\'s', {fontSize: this.fontSizeText, fill: this.textColorOrange, fontFamily: this.defaultFontFamily, fontWeight: 'bold'}));
    this.assets.push(this.add.text(80, 400, 'click on the jelly to', {fontSize: this.fontSizeText, fill: this.textColorOrange, fontFamily: this.defaultFontFamily, fontWeight: 'bold'}));
    this.assets.push(this.add.text(93, 430, 'make it explode', {fontSize: this.fontSizeText, fill: this.textColorOrange, fontFamily: this.defaultFontFamily, fontWeight: 'bold'}));
    this.hiJelly = this.add.image(350, 600, 'hiJelly');
    this.assets.push(this.hiJelly);
    this.hiJelly.setInteractive();
    this.tutorialSceneNr = 2;
  }

  tutorialSceneHiWaitForClick() {
    this.hiJelly.on('pointerdown', () => {
      this.destroyAssets(this.assets);
      this.tutorialSceneNr = 3;
    });
  }

  //scene 2
  tutorialFirstJelly() {
    this.assets = [];
    const spotlight = this.setSpotlight(300, 600, 700);
    this.assets.push(spotlight[0]);
    this.assets.push(spotlight[1]);
    this.assets.push(this.add.text(this.marginLeft, 20, 'Great!', {fontSize: this.fontSizeTitle, fill: this.textColorOrange, fontFamily: this.defaultFontFamily, fontWeight: this.fontWeightTitle}));
    this.assets.push(this.add.text(this.marginLeft, 120, 'Now it is time to place your first jelly on the board', {fontSize: this.fontSizeText, fill: this.textColorOrange, fontFamily: this.defaultFontFamily, fontWeight: this.fontWeightText}));
    this.assets.push(this.add.text(180, 220, 'Click on the blue square to place the jelly', {fontSize: this.fontSizenote, fill: this.textColorOrange, fontFamily: this.defaultFontFamily, fontWeight: 'bold'}));
    this.highlight = this.add.image(158, 395, 'highlight');
    this.highlight.setScale(0.65);
    this.forceSquare = [1, 1];
    this.boardActive = true;
    this.tutorialSceneNr = 4;
  }
  tutorialFirstJellyWaitForJelly() {
    if (this.jellyManager.isThereAJellyAt(1, 1)) {
      this.destroyAssets(this.assets);
      this.tutorialSceneNr = 5;
    }
  }

  //scene 3
  tutorialGrowJellySize2() {
    console.log('not in loop');
    this.computer = this.playerManager.getPlayerByName('computer');
    this.jellyManager.addJelly(7,
      7,
      100 + 7 * 60,
      335 + 7 * 60,
      this.computer);
    this.playerManager.forcePlayerToBeActive(
      this.playerManager.getPlayerByName('player')
    );
    this.assets = [];
    const spotlight = this.setSpotlight(300, 600, 700);
    this.assets.push(spotlight[0]);
    this.assets.push(spotlight[1]);
    this.assets.push(this.add.text(this.marginLeft, 20, 'You got it!', {fontSize: this.fontSizeTitle, fill: this.textColorOrange, fontFamily: this.defaultFontFamily, fontWeight: this.fontWeightTitle}));
    this.assets.push(this.add.text(this.marginLeft, 120, 'Your opponent has placed his jelly in the corner. Don\' worry', {fontSize: this.fontSizeText, fill: this.textColorOrange, fontFamily: this.defaultFontFamily, fontWeight: this.fontWeightText}));
    this.assets.push(this.add.text(this.marginLeft, 150, 'about him, grow your jelly by clicking on the jelly again.', {fontSize: this.fontSizeText, fill: this.textColorOrange, fontFamily: this.defaultFontFamily, fontWeight: this.fontWeightText}));
    this.assets.push(this.add.text(180, 220, 'Click on the blue square to grow the jelly', {fontSize: this.fontSizenote, fill: this.textColorOrange, fontFamily: this.defaultFontFamily, fontWeight: 'bold'}));
    this.assets.push(this.highlight = this.add.image(158, 395, 'highlight'));
    this.highlight.setScale(0.65);
    this.forceSquare = [1, 1];
    this.boardActive = true;
    this.tutorialSceneNr = 6;
  }
  tutorialWaitForGrowJellySize2() {
    if (this.jellyManager.isThereAJellyAt(1, 1) && this.jellyManager.sizeOfJellyAt(1, 1) === 2) {
      this.destroyAssets(this.assets);
      this.tutorialSceneNr = 7;
    }
  }

  //scene 4
  tutorialGrowJellySize3() {
    console.log('not in loop');
    this.computer = this.playerManager.getPlayerByName('computer');
    this.jellyManager.addJelly(2,
      1,
      100 + 2 * 60,
      335 + 1 * 60,
      this.computer);
    this.playerManager.forcePlayerToBeActive(
      this.playerManager.getPlayerByName('player')
    );
    this.assets = [];
    const spotlight = this.setSpotlight(300, 600, 700);
    this.assets.push(spotlight[0]);
    this.assets.push(spotlight[1]);
    this.assets.push(this.add.text(this.marginLeft, 20, 'What???', {fontSize: this.fontSizeTitle, fill: this.textColorOrange, fontFamily: this.defaultFontFamily, fontWeight: this.fontWeightTitle}));
    this.assets.push(this.add.text(this.marginLeft, 120, 'Your opponent placed a jelly next to yours!', {fontSize: this.fontSizeText, fill: this.textColorOrange, fontFamily: this.defaultFontFamily, fontWeight: this.fontWeightText}));
    this.assets.push(this.add.text(this.marginLeft, 150, 'We need to grow our jelly once more to be able to explode', {fontSize: this.fontSizeText, fill: this.textColorOrange, fontFamily: this.defaultFontFamily, fontWeight: this.fontWeightText}));
    this.assets.push(this.add.text(180, 220, 'Click on the blue square to grow the jelly', {fontSize: this.fontSizenote, fill: this.textColorOrange, fontFamily: this.defaultFontFamily, fontWeight: 'bold'}));
    this.assets.push(this.highlight = this.add.image(158, 395, 'highlight'));
    this.highlight.setScale(0.65);
    this.forceSquare = [1, 1];
    this.boardActive = true;
    this.tutorialSceneNr = 8;
  }
  tutorialWaitForGrowJellySize3() {
    if (this.jellyManager.isThereAJellyAt(1, 1) && this.jellyManager.sizeOfJellyAt(1, 1) === 3) {
      this.destroyAssets(this.assets);
      this.tutorialSceneNr = 9;
    }
  }

  //scene 5
  tutorialExplodeJelly() {
    console.log('not in loop');
    this.computer = this.playerManager.getPlayerByName('computer');
    this.jellyManager.addJelly(6,
      5,
      100 + 6 * 60,
      335 + 5 * 60,
      this.computer);
    this.playerManager.forcePlayerToBeActive(
      this.playerManager.getPlayerByName('player')
    );
    this.assets = [];
    const spotlight = this.setSpotlight(300, 600, 700);
    this.assets.push(spotlight[0]);
    this.assets.push(spotlight[1]);
    this.assets.push(this.add.text(this.marginLeft, 20, 'Make it explode!', {fontSize: this.fontSizeTitle, fill: this.textColorOrange, fontFamily: this.defaultFontFamily, fontWeight: this.fontWeightTitle}));
    this.assets.push(this.add.text(this.marginLeft, 120, 'Your jelly is big enough to explode, tap on the jelly and', {fontSize: this.fontSizeText, fill: this.textColorOrange, fontFamily: this.defaultFontFamily, fontWeight: this.fontWeightText}));
    this.assets.push(this.add.text(this.marginLeft, 150, 'watch what happens', {fontSize: this.fontSizeText, fill: this.textColorOrange, fontFamily: this.defaultFontFamily, fontWeight: this.fontWeightText}));
    this.assets.push(this.add.text(180, 220, 'Click on the blue square to explode the jelly', {fontSize: this.fontSizenote, fill: this.textColorOrange, fontFamily: this.defaultFontFamily, fontWeight: 'bold'}));
    this.assets.push(this.highlight = this.add.image(158, 395, 'highlight'));
    this.highlight.setScale(0.65);
    this.forceSquare = [1, 1];
    this.boardActive = true;
    this.tutorialSceneNr = 10;
  }

  tutorialWaitForExplodeJelly() {

  }

  //scene 6
  tutorialExplainExplosion() {

  }
  tutorialWaitForExplainExplosion() {

  }

  //scene 7
  tutorialGrowMechanics1() {

  }

  //scene 8
  tutorialGrowMechanics2() {

  }

  //scene 9
  tutorialExplodeSide() {

  }
  tutorialWaitForExplodeSide() {

  }

  //scene 10
  tutorialChaining() {

  }
  tutorialWaitForChaining() {

  }

  //scene 11
  tutorialTimeToWin() {

  }
  tutorialWaitForTimeToWin(){

  }
}

