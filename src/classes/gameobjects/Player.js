export default class Player extends Phaser.Physics.Arcade.Sprite{
  constructor(scene,x,y){
    super(scene,x,y,`dude`);
    //
    scene.add.existing(this);
    scene.physics.add.existing(this);
    //
    this.setScale(1.5);
    //this.setBounce(1,Phaser.Math.FloatBetween(0.4,0.8));
    this.setCollideWorldBounds(true);
    //
    this.createAnimations();
  }
  createAnimations(){
    this.scene.anims.create({
      key: `turn`,
      frames: [{key:`dude`,frames:4}],
      frameRate:20
    });
    this.scene.anims.create({
      key: `left`,
      frames: this.scene.anims.generateFrameNumbers(`dude`,{start:0, end:3}),
      frameRate: 10,
      repeat: -1
    });
    this.scene.anims.create({
      key: `right`,
      frames: this.scene.anims.generateFrameNumbers(`dude`,{start:5, end:8}),
      frameRate: 10,
      repeat: -1
    });
  }
}
