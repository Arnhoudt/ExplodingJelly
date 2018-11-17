export default class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: `choose`
    });
  }

  init() {
    if (this.textEntryRed) {
      this.textEntryRed = undefined;
    }
    if (this.textEntryOrange) {
      this.textEntryOrange = undefined;
    }
    if (this.textEntryPurple) {
      this.textEntryPurple = undefined;
    }
    if (this.textEntryBlue) {
      this.textEntryBlue = undefined;
    }
  }

  preload() {}

  create() {
    this.add.image(318, 382, `bg_choose`);
    this.red = this.add.sprite(170, 385, `redTextEntry`).setInteractive();
    this.orange = this.add.sprite(450, 385, `orangeTextEntry`).setInteractive();
    this.purple = this.add.sprite(170, 590, `purpleTextEntry`).setInteractive();
    this.blue = this.add.sprite(450, 590, `blueTextEntry`).setInteractive();
    this.start = this.add.sprite(311, 750, `start`).setInteractive();

    this.start.on('pointerdown', () => {
      this.start.setScale(1.03);
    });
    this.start.on('pointerup', () => {
      this.start.setScale(1);
      this.startGame();
    });

    this.red.on('pointerdown', () => {
      this.red.setScale(1.1);
    });
    this.red.on('pointerup', () => {
      if (this.textEntryRed) {
        this.red.setScale(1);
        this.textEntryRed.destroy();
        this.textEntryRed = undefined;
      } else {
        this.textEntryRed = this.add.text(80, 432, '', {
          font: '30px Ubuntu',
          fill: `red`
        });
        this.input.keyboard.off(`keydown`);
        this.updateText(this.textEntryRed);
      }
    });
    this.orange.on('pointerdown', () => {
      this.orange.setScale(1.1);
    });
    this.orange.on('pointerup', () => {
      if (this.textEntryOrange) {
        this.orange.setScale(1);
        this.textEntryOrange.destroy();
        this.textEntryOrange = undefined;
      } else {
        this.textEntryOrange = this.add.text(360, 432, '', {
          font: '30px Ubuntu',
          fill: `orange`
        });
        this.input.keyboard.off(`keydown`);
        this.updateText(this.textEntryOrange);
      }
    });
    this.purple.on('pointerdown', () => {
      this.purple.setScale(1.1);
    });
    this.purple.on('pointerup', () => {
      if (this.textEntryPurple) {
        this.purple.setScale(1);
        this.textEntryPurple.destroy();
        this.textEntryPurple = undefined;
      } else {
        this.textEntryPurple = this.add.text(80, 637, '', {
          font: '30px Ubuntu',
          fill: `purple`
        });
        this.input.keyboard.off(`keydown`);
        this.updateText(this.textEntryPurple);
      }
    });
    this.blue.on('pointerdown', () => {
      this.blue.setScale(1.1);
    });
    this.blue.on('pointerup', () => {
      if (this.textEntryBlue) {
        this.blue.setScale(1);
        this.textEntryBlue.destroy();
        this.textEntryBlue = undefined;
      } else {
        this.textEntryBlue = this.add.text(360, 637, '', {
          font: '30px Ubuntu',
          fill: `blue`
        });
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
        if (textEntry.text.length < 12) {
          textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
        }
      } else if (
        event.keyCode === 32 ||
        (event.keyCode >= 48 && event.keyCode < 90)
      ) {
        if (textEntry.text.length < 11) {
          textEntry.text += event.key;
        }
      }
    });
  }

  startGame() {
    if (
      this.textEntryRed !== undefined &&
      this.textEntryOrange !== undefined &&
      this.textEntryPurple !== undefined &&
      this.textEntryBlue !== undefined
    ) {
      this.scene.start(`game`, {
        name1: this.textEntryRed.text,
        color1: `red`,
        name2: this.textEntryOrange.text,
        color2: `orange`,
        name3: this.textEntryPurple.text,
        color3: `purple`,
        name4: this.textEntryBlue.text,
        color4: `blue`
      });
    }
    if (
      this.textEntryRed !== undefined &&
      this.textEntryOrange !== undefined &&
      this.textEntryPurple !== undefined &&
      this.textEntryBlue === undefined
    ) {
      this.scene.start(`game`, {
        name1: this.textEntryRed.text,
        color1: `red`,
        name2: this.textEntryOrange.text,
        color2: `orange`,
        name3: this.textEntryPurple.text,
        color3: `purple`,
        name4: undefined,
        color4: undefined
      });
    }
    if (
      this.textEntryRed !== undefined &&
      this.textEntryOrange !== undefined &&
      this.textEntryPurple === undefined &&
      this.textEntryBlue !== undefined
    ) {
      this.scene.start(`game`, {
        name1: this.textEntryRed.text,
        color1: `red`,
        name2: this.textEntryOrange.text,
        color2: `orange`,
        name3: this.textEntryBlue.text,
        color3: `blue`,
        name4: undefined,
        color4: undefined
      });
    }
    if (
      this.textEntryRed !== undefined &&
      this.textEntryOrange === undefined &&
      this.textEntryPurple !== undefined &&
      this.textEntryBlue !== undefined
    ) {
      this.scene.start(`game`, {
        name1: this.textEntryRed.text,
        color1: `red`,
        name2: this.textEntryPurple.text,
        color2: `purple`,
        name3: this.textEntryBlue.text,
        color3: `blue`,
        name4: undefined,
        color4: undefined
      });
    }
    if (
      this.textEntryRed === undefined &&
      this.textEntryOrange !== undefined &&
      this.textEntryPurple !== undefined &&
      this.textEntryBlue !== undefined
    ) {
      this.scene.start(`game`, {
        name1: this.textEntryOrange.text,
        color1: `orange`,
        name2: this.textEntryPurple.text,
        color2: `purple`,
        name3: this.textEntryBlue.text,
        color3: `blue`,
        name4: undefined,
        color4: undefined
      });
    }
    if (
      this.textEntryRed !== undefined &&
      this.textEntryOrange !== undefined &&
      this.textEntryPurple === undefined &&
      this.textEntryBlue === undefined
    ) {
      this.scene.start(`game`, {
        name1: this.textEntryRed.text,
        color1: `red`,
        name2: this.textEntryOrange.text,
        color2: `orange`,
        name3: undefined,
        color3: undefined,
        name4: undefined,
        color4: undefined
      });
    }
    if (
      this.textEntryRed !== undefined &&
      this.textEntryOrange === undefined &&
      this.textEntryPurple !== undefined &&
      this.textEntryBlue === undefined
    ) {
      this.scene.start(`game`, {
        name1: this.textEntryRed.text,
        color1: `red`,
        name2: this.textEntryPurple.text,
        color2: `purple`,
        name3: undefined,
        color3: undefined,
        name4: undefined,
        color4: undefined
      });
    }
    if (
      this.textEntryRed !== undefined &&
      this.textEntryOrange === undefined &&
      this.textEntryPurple === undefined &&
      this.textEntryBlue !== undefined
    ) {
      this.scene.start(`game`, {
        name1: this.textEntryRed.text,
        color1: `red`,
        name2: this.textEntryBlue.text,
        color2: `blue`,
        name3: undefined,
        color3: undefined,
        name4: undefined,
        color4: undefined
      });
    }
    if (
      this.textEntryRed === undefined &&
      this.textEntryOrange !== undefined &&
      this.textEntryPurple !== undefined &&
      this.textEntryBlue === undefined
    ) {
      this.scene.start(`game`, {
        name1: this.textEntryOrange.text,
        color1: `orange`,
        name2: this.textEntryPurple.text,
        color2: `purple`,
        name3: undefined,
        color3: undefined,
        name4: undefined,
        color4: undefined
      });
    }
    if (
      this.textEntryRed === undefined &&
      this.textEntryOrange !== undefined &&
      this.textEntryPurple === undefined &&
      this.textEntryBlue !== undefined
    ) {
      this.scene.start(`game`, {
        name1: this.textEntryOrange.text,
        color1: `orange`,
        name2: this.textEntryBlue.text,
        color2: `blue`,
        name3: undefined,
        color3: undefined,
        name4: undefined,
        color4: undefined
      });
    }
    if (
      this.textEntryRed === undefined &&
      this.textEntryOrange === undefined &&
      this.textEntryPurple !== undefined &&
      this.textEntryBlue !== undefined
    ) {
      this.scene.start(`game`, {
        name1: this.textEntryPurple.text,
        color1: `purple`,
        name2: this.textEntryBlue.text,
        color2: `blue`,
        name3: undefined,
        color3: undefined,
        name4: undefined,
        color4: undefined
      });
    }
  }

  update() {}
}
