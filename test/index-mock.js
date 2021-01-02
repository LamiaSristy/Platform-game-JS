import Phaser from 'phaser';
import SceneBoot from '../src/scenes/scene-boot';
import SceneGameOver from '../src/scenes/scene-game-over';
import SceneLeaderBoard from '../src/scenes/scene-leader-board';
import SceneMain  from '../src/scenes/scene-main';

function gameRun() {
  let config = {
    type: Phaser.WEBGL,
    parent: 'divld',
    width: 1334,
    height: 750,
    scene: [SceneBoot, SceneMain, SceneGameOver, SceneLeaderBoard], 

    backgroundColor: 'red',
    dom: {
        createContainer: true
    },
    
    physics: {
        default: "arcade"
    },  
    pixelArt: true,
    roundPixels: true,     
  }
  let game = new Phaser.Game(config);

  return game;
}

export default gameRun;
