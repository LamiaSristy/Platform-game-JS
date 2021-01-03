import Phaser from 'phaser';

class SceneBoot extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneBoot' });
  }

  create() {
    const description = 'Welcome to the marathon... Press ENTER to start the game.';
    this.title = this.add.text(16, 16, description, { fontSize: '32px', fill: '#fff' });
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
