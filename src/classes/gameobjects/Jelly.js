export default class Jelly {
  constructor(color) {
    //this.jellyManager();
    //this.id = id;
    this.color = color;
    this.grow = 1;
    this.sprite;
  }

  get() {
    return this.id;
  }

  set(parameter) {
    if (parameter === `grow`) {
      this.grow ++;
    }
  }
}
