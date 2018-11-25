export default class ChooseScene extends Phaser.Scene {
  constructor() {
    super({
      key: `choose`
    });
  }

  init() {
    this.entrys = [];
    this.textEntrys = [];
    if (this.textEntryRed) this.textEntryRed = undefined;
    if (this.textEntryOrange) this.textEntryOrange = undefined;
    if (this.textEntryPurple) this.textEntryPurple = undefined;
    if (this.textEntryBlue) this.textEntryBlue = undefined;
  }

  preload() {}

  create() {
    this.add.image(318, 382, `bg_choose`);
    this.red = this.add.sprite(170, 385, `redTextEntry`).setInteractive();
    this.orange = this.add.sprite(450, 385, `orangeTextEntry`).setInteractive();
    this.purple = this.add.sprite(170, 590, `purpleTextEntry`).setInteractive();
    this.blue = this.add.sprite(450, 590, `blueTextEntry`).setInteractive();
    this.start = this.add.sprite(311, 750, `start`).setInteractive();

    this.back = this.add.sprite(30, 30, `back`).setInteractive();
    this.back.on(`pointerdown`, () => {
      this.back.setScale(1.1);
    });

    this.back.on(`pointerup`, () => {
      this.back.setScale(1);
      this.scene.start(`start`);
    });

    this.start.on('pointerdown', () => this.start.setScale(1.03));
    this.start.on('pointerup', () => {
      this.start.setScale(1);
      this.startGame();
    });

    this.red.on('pointerdown', () => this.red.setScale(1.1));
    this.red.on('pointerup', () => {
      if (this.textEntryRed) {
        this.red.setScale(1);
        this.textEntryRed.destroy();
        this.textEntryRed = undefined;
      } else {
        this.textEntryRed = this.add
          .text(170, 432, '', {
            font: '30px Ubuntu',
            fill: `red`
          })
          .setOrigin(0.5, 0);
        this.input.keyboard.off(`keydown`);
        this.updateText(this.textEntryRed);
      }
    });
    this.orange.on('pointerdown', () => this.orange.setScale(1.1));
    this.orange.on('pointerup', () => {
      if (this.textEntryOrange) {
        this.orange.setScale(1);
        this.textEntryOrange.destroy();
        this.textEntryOrange = undefined;
      } else {
        this.textEntryOrange = this.add
          .text(450, 432, '', {
            font: '30px Ubuntu',
            fill: `orange`
          })
          .setOrigin(0.5, 0);
        this.input.keyboard.off(`keydown`);
        this.updateText(this.textEntryOrange);
      }
    });
    this.purple.on('pointerdown', () => this.purple.setScale(1.1));
    this.purple.on('pointerup', () => {
      if (this.textEntryPurple) {
        this.purple.setScale(1);
        this.textEntryPurple.destroy();
        this.textEntryPurple = undefined;
      } else {
        this.textEntryPurple = this.add
          .text(170, 637, '', {
            font: '30px Ubuntu',
            fill: `purple`
          })
          .setOrigin(0.5, 0);
        this.input.keyboard.off(`keydown`);
        this.updateText(this.textEntryPurple);
      }
    });
    this.blue.on('pointerdown', () => this.blue.setScale(1.1));
    this.blue.on('pointerup', () => {
      if (this.textEntryBlue) {
        this.blue.setScale(1);
        this.textEntryBlue.destroy();
        this.textEntryBlue = undefined;
      } else {
        this.textEntryBlue = this.add
          .text(450, 637, '', {
            font: '30px Ubuntu',
            fill: `blue`
          })
          .setOrigin(0.5, 0);
        this.input.keyboard.off(`keydown`);
        this.updateText(this.textEntryBlue);
      }
    });
  }

  updateText(textEntry) {
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.keyBackspace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.BACKSPACE
    );
    this.input.keyboard.on(`keydown`, event => {
      if (event.keyCode === 8 && textEntry.text.length > 0) {
        if (textEntry.text.length < 12)
          textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
      } else if (
        event.keyCode === 32 ||
        (event.keyCode >= 48 && event.keyCode < 90)
      ) {
        if (textEntry.text.length < 11) textEntry.text += event.key;
      }
    });
  }

  startGame() {
    if (this.textEntryRed !== undefined && this.textEntryRed.text.length >= 1) {
      this.textEntrys.push(this.textEntryRed);
      this.textEntryRed.destroy();
      this.textEntryRed = undefined;
    }
    if (
      this.textEntryOrange !== undefined &&
      this.textEntryOrange.text.length >= 1
    ) {
      this.textEntrys.push(this.textEntryOrange);
      this.textEntryOrange.destroy();
      this.textEntryOrange = undefined;
    }
    if (
      this.textEntryPurple !== undefined &&
      this.textEntryPurple.text.length >= 1
    ) {
      this.textEntrys.push(this.textEntryPurple);
      this.textEntryPurple.destroy();
      this.textEntryPurple = undefined;
    }
    if (
      this.textEntryBlue !== undefined &&
      this.textEntryBlue.text.length >= 1
    ) {
      this.textEntrys.push(this.textEntryBlue);
      this.textEntryBlue.destroy();
      this.textEntryBlue = undefined;
    }

    this.entrys = new Array(this.textEntrys.length);

    this.i = 0;
    this.textEntrys.forEach(textEntry => {
      this.entrys[this.i] = new Array(2);
      this.entrys[this.i][0] = textEntry.text;
      this.entrys[this.i][1] = textEntry.style.color;
      this.i ++;
    });
    if (this.textEntrys.length >= 2) {
      this.scene.start(`game`, this.entrys);
    } else {
      this.warning = this.add
        .text(310, 675, `Alle spelers hebben een naam nodig`, {
          fontFamily: 'Ubuntu',
          fontStyle: 'Bold',
          fontSize: 20,
          color: `black`
        })
        .setOrigin(0.5, 0);
      this.time.delayedCall(3000, this.eraseWarning, [], this);
      this.blue.setScale(1);
      this.orange.setScale(1);
      this.purple.setScale(1);
      this.red.setScale(1);
      this.textEntrys = [];
      this.entrys = [];
    }
  }

  eraseWarning() {
    this.warning.destroy();
  }

  update() {}
}
