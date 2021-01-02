import 'phaser';
import  SceneBoot  from './scenes/scene-boot';
import  SceneMain  from './scenes/scene-main';
import  SceneGameOver  from './scenes/scene-game-over';
import  SceneLeaderBoard  from './scenes/scene-leader-board';

let game;


window.onload = function() {

    // object containing configuration options
    let config = {
        type: Phaser.WEBGL,
        parent: 'divld',
        width: 1334,
        height: 750,
        scene: [SceneBoot, SceneMain, SceneGameOver, SceneLeaderBoard], 

        backgroundColor: 0x0c88c7,
        dom: {
            createContainer: true
        },
        
        physics: {
            default: "arcade"
        },  
        pixelArt: true,
        roundPixels: true,     
    }
    game = new Phaser.Game(config);
    window.focus();
    resize();
    window.addEventListener("resize", resize, false);
}

function resize(){
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
