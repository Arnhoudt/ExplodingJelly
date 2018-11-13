export default class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.active = false;
  }

  play() {
    this.active = true;
  }
  standby() {
    this.active = false;
  }
}
