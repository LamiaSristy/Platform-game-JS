import Phaser from 'phaser';
import { getLocalScores } from '../local-storage';
import { submitScore } from '../leader-board-call';

class SceneGameOver extends Phaser.Scene {
    constructor() {
      super({ key: 'SceneGameOver' });
    }

    preload() {
        this.load.image('sprBtnRestart', 'assets/sprBtnRestart.png');
        this.load.image('sprBtnRecord', 'assets/sprBtnRecord.png');
      }

    create() { 
        console.log('this.game.config.width: ' + this.game.config.width);   

        this.scores = getLocalScores();
        this.gameOverSceneScore = this.add.text(
          this.game.config.width * 0.6,
          this.game.config.height * 0.72,
          `Score: ${this.scores[0]}`, {
            color: '#d0c600',
            fontFamily: 'sans-serif',
            fontSize: '30px',
            lineHeight: 1.3,
            align: 'center',
          },
        );

        //restart button
        this.btnRestart = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.9,
            'sprBtnRestart',
          );
      
          this.btnRestart.setInteractive();
          this.createButton(this.btnRestart, 'sprBtnRestart', 'sprBtnRestart', 'sprBtnRestart');
          this.btnRestart.on('pointerup', () => {
            this.btnRestart.setTexture('sprBtnRestart');
            this.scene.start('SceneMain');
          }, this);

        //record button
        this.btnRecord = this.add.sprite(
          this.game.config.width * 0.85,
          this.game.config.height * 0.9,
          'sprBtnRecord',
        );
    
        this.btnRecord.setInteractive();
        this.createButton(this.btnRecord, 'sprBtnRecord', 'sprBtnRecord', 'sprBtnRecord');
        this.btnRecord.on('pointerup', () => {
          this.btnRecord.setTexture('sprBtnRecord');

          this.submit = submitScore('user', this.scores[0]);
                this.submit.then(() => {
                  this.scene.start('SceneLeaderBoard');
                });

        }, this);  

        
        this.title = this.add.text(16, 16, 'Game Over', { fontSize: '32px', fill: '#fff' });

        // this.submitButton = this.add.button(16, 16, 'Game Over', { fontSize: '32px', fill: '#fff' });

        this.userName = '';

        const div = document.createElement('div');
        let innerHTML = `
        <input type="text" id="nameField" placeholder="Enter your name" style="font-size: 1.5rem width: ${this.game.config.width * 0.25}"><br>
        <input type="button" name="submitButton" value="Submit Score" style="font-size: 1.5rem">
        `;

        div.innerHTML = innerHTML;

        const element = this.add.dom(280, 480, div);
        // const element = this.add.dom(280, 480, div, '', h1);
        // element.setDepth(2000);
        element.setVisible(true);
        element.addListener('click');  

        element.on('click', (event) => {
            if (event.target.name === 'submitButton') {
              const inputText = document.getElementById('nameField');
              if (inputText.value !== '') {
                element.removeListener('click');
                element.setVisible(false);
                this.userName = inputText.value;
                console.log(this.userName);
                // this.submit = submitScore(this.userName, this.scores[0]);
                // this.submit.then(() => {
                //   this.scene.start('SceneLeaderBoard');
                // });
              }
            }
        });
    }

    createButton(btn, spr, sprHover, sprDown) {
        btn.on('pointerover', () => {
            btn.setTexture(sprHover);
        }, this);

        btn.on('pointerout', () => {
            btn.setTexture(spr);
        });

        btn.on('pointerdown', () => {
            btn.setTexture(sprDown);
        }, this);
    }
      
}

export default SceneGameOver;
