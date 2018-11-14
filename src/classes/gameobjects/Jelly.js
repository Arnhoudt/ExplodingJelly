export default class Jelly {
  constructor(jelly) {
    this.jelly = jelly;
    this.x = jelly.x;
    this.y = jelly.y;
    this.grow = 1;
  }

  get() {
    return this.jelly;
  }
}
