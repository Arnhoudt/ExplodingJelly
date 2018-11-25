export default class Vakje {
  constructor(sprite, id) {
    this.sprite = sprite;
    this.id = id;
  }

  get(state) {
    if (state === `id`) {
      return this.id;
    }
    if (state === `sprite`) {
      return this.sprite;
    }
  }
}
