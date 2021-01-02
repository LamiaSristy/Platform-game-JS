import Phaser from 'phaser';
import { storeScores } from '../local-storage';

// playGame scene
class SceneMain extends Phaser.Scene{
    constructor(){
        super("SceneMain");
    }

    preload(){
        this.load.image("platform", "assets/platform2.png");

        // player is a sprite sheet made by 24x48 pixels
        this.load.spritesheet("player", "assets/dude.png", {
            frameWidth: 32,
            frameHeight: 48
        });

        // the star is a sprite sheet made by 20x20 pixels
        this.load.spritesheet("star", "assets/star.png", {
            frameWidth: 30,
            frameHeight: 30
        });

        // the firecamp is a sprite sheet made by 32x58 pixels
        this.load.spritesheet("fire", "assets/fire.png", {
            frameWidth: 40,
            frameHeight: 70
        });
    }

    create(){
        this.gameOptions = {
            // score position
            scorePosition: [16, 16],

            platformPositionY: 600,
            // platform speed, in pixels per second
            platformSpeed: 200,

            // platform gap, in pixels
            platformGapRange: [80, 100],

            // platform width range, in pixels
            platformSizeRange: [200, 300],

            // player gravity
            playerGravity: 900,

            // player jump force
            jumpForce: 400,

            // player starting X position
            playerStartPosition: 200,

            // consecutive jumps allowed
            jumps: 2,

            // % of probability a star appears on the platform
            starPercent: 80,

            // % of probability a fire appears on the platform
            firePercent: 25
        }

        // setting player animation
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("player", {
                start: 5,
                end: 8
            }),
            frameRate: 10,
            repeat: -1
        });

        // setting star animation
        this.anims.create({
            // key: "rotate",
            frames: this.anims.generateFrameNumbers("star", {
                start: 0,
                end: 5
            }),
            frameRate: 15,
            repeat: -1
        });

        // setting fire animation
        this.anims.create({
            key: "burn",
            frames: this.anims.generateFrameNumbers("fire", {
                start: 0,
                end: 4
            }),
            frameRate: 15,
            repeat: -1
        });


        // group with all active platforms.
        this.platformGroup = this.add.group({
            // once a platform is removed, it's added to the pool
            removeCallback: function(platform){
                platform.scene.platformPool.add(platform)
            }
        });

        // platform pool
        this.platformPool = this.add.group({
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.platformGroup.add(platform)
            }
        });

        // group with all active stars.
        this.starGroup = this.add.group({
            // once a star is removed, it's added to the pool
            removeCallback: function(star){
                star.scene.starPool.add(star)
            }
        });

        // star pool
        this.starPool = this.add.group({
            // once a star is removed from the pool, it's added to the active stars group
            removeCallback: function(star){
                star.scene.starGroup.add(star)
            }
        });

        // group with all active firecamps.
        this.fireGroup = this.add.group({
            // once a firecamp is removed, it's added to the pool
            removeCallback: function(fire){
                fire.scene.firePool.add(fire)
            }
        });

        // fire pool
        this.firePool = this.add.group({
            // once a fire is removed from the pool, it's added to the active fire group
            removeCallback: function(fire){
                fire.scene.fireGroup.add(fire)
            }
        });

        // keeping track of added platforms
        this.addedPlatforms = 0;

        // number of consecutive jumps made by the player so far
        this.playerJumps = 0;

        //score count
        this.score = 0;
        this.scoreText = this.add.text(this.gameOptions.scorePosition[0], this.gameOptions.scorePosition[1], 'score: 0', { fontSize: '32px', fill: '#fff' });

        // adding a platform to the game, the arguments are platform width, x position and y position
        this.addPlatform(this.game.config.width, this.game.config.width / 2);

        // adding the player;
        this.player = this.physics.add.sprite(this.gameOptions.playerStartPosition, this.game.config.height * 0.7, "player");
        this.player.setGravityY(this.gameOptions.playerGravity);
        this.player.setDepth(2);

        // the player is not dying
        this.dying = false;

        // setting collisions between the player and the platform group
        this.platformCollider = this.physics.add.collider(this.player, this.platformGroup, function(){

            // play "run" animation if the player is on a platform
            if(!this.player.anims.isPlaying){
                this.player.anims.play("run");
            }
        }, null, this);

        // setting collisions between the player and the star group
        this.physics.add.overlap(this.player, this.starGroup, function(player, star){
            this.starGroup.killAndHide(star);
            this.starGroup.remove(star);
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);
        }, null, this);

        // setting collisions between the player and the fire group
        this.physics.add.overlap(this.player, this.fireGroup, function(player, fire){
            this.dying = true;
            this.player.anims.stop();
            this.player.setFrame(2);
            this.player.body.setVelocityY(-200);
            this.physics.world.removeCollider(this.platformCollider);

        }, null, this);

        // checking for input
        this.input.on("pointerdown", this.jump, this);
        // this.input.keyboard.on('keydown_X', this.start, this);
        // let key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // key1.onDown.add(this.start, this);
    }
 
    // the core of the script: platform are added from the pool or created on the fly
    addPlatform(platformWidth, posX){
        let posY = this.gameOptions.platformPositionY;
        this.addedPlatforms ++;
        let platform;
        if(this.platformPool.getLength()){
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.y = posY;
            platform.active = true;
            platform.visible = true;
            this.platformPool.remove(platform);
            platform.displayWidth = platformWidth;
            platform.tileScaleX = 1 / platform.scaleX;
        }
        else{
            platform = this.add.tileSprite(posX, posY, platformWidth, 32, "platform");
            this.physics.add.existing(platform);
            platform.body.setImmovable(true);
            platform.body.setVelocityX(this.gameOptions.platformSpeed * -1);
            platform.setDepth(2);
            this.platformGroup.add(platform);
        }
        this.nextPlatformDistance = Phaser.Math.Between(this.gameOptions.platformGapRange[0], this.gameOptions.platformGapRange[1]);

        // if this is not the starting platform...
        if(this.addedPlatforms > 1){
            // is there a star over the platform?
            if(Phaser.Math.Between(1, 100) <= this.gameOptions.starPercent){
                if(this.starPool.getLength()){
                    let star = this.starPool.getFirst();
                    star.x = posX;
                    star.y = posY - 100;
                    star.alpha = 1;
                    star.active = true;
                    star.visible = true;
                    this.starPool.remove(star);
                }
                else{
                    // let starCount = Phaser.Math.Between(1, platformWidth/50);
                    // console.log('star count: '+ starCount);
                    let starPosY = Phaser.Math.Between(posY-200, posY-30);
                    let star = this.physics.add.sprite(posX, starPosY, "star");
                    star.setImmovable(true);
                    star.setVelocityX(platform.body.velocity.x);
                    // star.anims.play("rotate");
                    star.setDepth(2);
                    this.starGroup.add(star);
                }
            }

            // is there a fire over the platform?
            if(Phaser.Math.Between(1, 100) <= this.gameOptions.firePercent){
                if(this.firePool.getLength()){
                    let fire = this.firePool.getFirst();
                    fire.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
                    fire.y = posY - 46;
                    fire.alpha = 1;
                    fire.active = true;
                    fire.visible = true;
                    this.firePool.remove(fire);
                }
                else{
                    let fire = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), posY - 46, "fire");
                    fire.setImmovable(true);
                    fire.setVelocityX(platform.body.velocity.x);
                    fire.setSize(8, 2, true)
                    fire.anims.play("burn");
                    fire.setDepth(2);
                    this.fireGroup.add(fire);
                }
            }
        }
    }

    // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
    // and obviously if the player is not dying
    jump(){
        if((!this.dying) && (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < this.gameOptions.jumps))){
            if(this.player.body.touching.down){
                this.playerJumps = 0;
            }
            this.player.setVelocityY(this.gameOptions.jumpForce * -1);
            this.playerJumps ++;

            // stops animation
            this.player.anims.stop();
        }
    }

    start(){
        this.scene.start("SceneMain");
    }


    update(){
        // game over
        if(this.player.y > this.game.config.height){
            storeScores(this.score);
            this.scene.start("SceneGameOver");
        }

        this.player.x = this.gameOptions.playerStartPosition;

        // recycling platforms
        let minDistance = this.game.config.width;
        let rightmostPlatformHeight = 0;
        this.platformGroup.getChildren().forEach(function(platform){
            let platformDistance = this.game.config.width - platform.x - platform.displayWidth / 2;
            if(platformDistance < minDistance){
                minDistance = platformDistance;
                rightmostPlatformHeight = platform.y;
            }
            if(platform.x < - platform.displayWidth / 2){
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);

        // // recycling stars
        // this.starGroup.getChildren().forEach(function(star){
        //     if(star.x < - star.displayWidth / 2){
        //         this.starGroup.killAndHide(star);
        //         this.starGroup.remove(star);
        //     }
        // }, this);

        // recycling fire
        this.fireGroup.getChildren().forEach(function(fire){
            if(fire.x < - fire.displayWidth / 2){
                this.fireGroup.killAndHide(fire);
                this.fireGroup.remove(fire);
            }
        }, this);

        // adding new platforms
        if(minDistance > this.nextPlatformDistance){
            let nextPlatformWidth = Phaser.Math.Between(this.gameOptions.platformSizeRange[0], this.gameOptions.platformSizeRange[1]);
            this.addPlatform(nextPlatformWidth, this.game.config.width + nextPlatformWidth / 2);
        }
    }
}

export default SceneMain;