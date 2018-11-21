export default class Player {
  constructor(name, color) {
    this.name = name;
    this.score = 0;
    this.active = false;
    this.color = color;
  }

  set(state) {
    if (state === `play`) {
      this.active = true;
    }
    if (state === `standby`) {
      this.active = false;
    }
  }
}
