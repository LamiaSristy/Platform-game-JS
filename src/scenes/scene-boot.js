import Phaser from 'phaser';

class SceneBoot extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneBoot' });
  }

  preload() {
  }

  create() {
    this.title = this.add.text(16, 16, 'Welcome to the marathon... Press space to enter', { fontSize: '32px', fill: '#fff' });


    this.tweens.add({
      targets: this.title,
      alpha: { from: 0, to: 1 },
      ease: 'Linear',
      duration: 4000,
      repeat: 0,
      yoyo: true,
      onComplete: () => {
        this.scene.start('SceneMain');
      },
    });

    this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  update() {
    if (this.keyEnter.isDown) {
      this.scene.start('SceneMain');
    }
  }
}

export default SceneBoot;