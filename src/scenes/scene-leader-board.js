import Phaser from 'phaser';
import { getScoreBoard } from '../leader-board-call';

class SceneLeaderBoard extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneLeaderBoard' });
  }

  preload() {
    this.load.scenePlugin({
      key: 'rexuiplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      sceneKey: 'rexUI',
    });
  }

  create() {
    // restart button
    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.3,
      this.game.config.height * 0.9,
      'sprBtnRestart',
    );

    this.btnRestart.setInteractive();
    this.createButton(this.btnRestart, 'sprBtnRestart', 'sprBtnRestart', 'sprBtnRestart');
    this.btnRestart.on('pointerup', () => {
      this.btnRestart.setTexture('sprBtnRestart');
      this.scene.start('SceneMain');
    }, this);

    this.getScores = getScoreBoard();

    this.getScores.then(scores => {
      this.config = {
        color: '#d0c600',
        fontFamily: 'sans-serif',
        fontSize: '3vw',
        lineHeight: 1.3,
        align: 'center',
      };

      const scrollMode = 0;
      this.rexUI.add.gridTable({
        x: this.game.config.width * 0.46,
        y: 320,
        width: 400,
        height: 420,
        scrollMode,
        table: {
          cellWidth: (scrollMode === 0) ? undefined : 60,
          cellHeight: (scrollMode === 0) ? 60 : undefined,
          columns: 3,
          mask: {
            padding: 2,
          },
          reuseCellContainer: true,
        },
        slider: {
          track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0xfcf8a2),
          thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, 0x847d00),
        },
        createCellContainerCallback(cell, cellContainer) {
          const { scene } = cell;
          const { width } = cell;
          const { height } = cell;
          const { item } = cell;
          if (cellContainer === null) {
            cellContainer = scene.rexUI.add.label({
              width,
              height,
              align: 'center',
              orientation: scrollMode,
              text: scene.add.text(0, 0, '', {
                color: '#d0c600',
                fontFamily: 'sans-serif',
                fontSize: '2vw',
                lineHeight: 1.3,
              }),
            });
          }

          cellContainer.setMinSize(width, height);
          cellContainer.getElement('text').setText(item);
          return cellContainer;
        },
        items: this.getItems(20, scores),
      })
        .layout();
    });

    this.getItems = (count, score) => {
      const data = ['Rank', 'User', 'Score'];

      for (let i = 0; i < count; i += 1) {
        if (score[i]) {
          data.push(i + 1);
          data.push(score[i][1]);
          data.push(score[i][0]);
        }
      }
      return data;
    };
  }

  // update() {
  // }

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

export default SceneLeaderBoard;