# Platform Game
Here, I have created an endless marathon runner game, using HTML5, Java-Script, Phaser3.

## Live-Demo

[marathon-runner](https://aqueous-woodland-52804.herokuapp.com/)

## How to play:

**Getting Started**

1. one user can either play the game online by clicking [here](https://aqueous-woodland-52804.herokuapp.com/)
  **OR**
   Clone from the git [here](https://github.com/LamiaSristy/Platform-game-JS), the process of cloning are listed below in the getting started part.

**Scene-boot:**

1. It will narrate the game and ask a user to press ENTER,
2. If the user doesn't click on the ENTER, the game will start automatically after 4 seconds.
3. Which will lead to scene-main.

**Scene-main:**

1. User can see a character/avatar on the screen at this point, which already has started running on the platform.
2. The avatar/character will die if it falls from the platform or catches fire.
3. These situations can be avoided with 1 or 2 jumps.
4. In the path the avatar/character can earn a point/score by catching the stars appearing on the path.
5. To get a score the avatar/character has to jump again sometimes.
6. The avatar/character can jump(one mouse-click)/ doublejump(double mouse-click).
7. If the avatar/character died from the fire or by falling from the platform, then the Scene Game_Over will appear.

**Scene-game-over:**

1. Here User can see an input filed, a submit-score button, a restart button, and a Leaderboard button.
2. **The input filed**: here the user can enter the name.
3. **The submit-score button**: by clicking the send score button the sore will be sent to a leader board.
4. **The restart button**: by clicking it the user can restart the game again.
5. **Leaderboard button**: clicking here will invoke the scene leader-board.

**Scene-leader-board:**
1. Here a list will be displaying sorting by the high score.

## Vedio description:
[Video-explanation](https://www.loom.com/share/53b232633ab045aab5a66697559c2100)


## Technologies used

* JavaScript
* A bit of HTML and CSS for the front end
* Phaser 3
* Webpack
* Eslint
* Babel
* Jest in the tests
* Express
* Github
* [Heroku](https://www.heroku.com/) for the deployment
* [Leaderboard API service][LB-API] for the leaderboard

## Downloading from git and running in local machine:

**Prerequisites:**

To get this project up and running locally, "yarn install" is needed to be run in order to include all dependencies used for this project.

**To get this project set up on your local machine, follow these simple steps:**

1. Open Terminal.
2. Navigate to your desired location to download the contents of this repository.
3. Copy and paste the following code into the Terminal: git clone https://github.com/LamiaSristy/Platform-game-JS/tree/feature
4. Run "yarn install".
5. Run "yarn run webpack-dev-server".
6. Open, in your browser, 'localhost:8080'.

**For running the test cases:**
1. Run "yarn test".


**Now You can start playing and enjoy.**

## Author Details::

👤 **Lamia Sristy**

- Github: [@LamiaSristy](https://github.com/LamiaSristy)
- Linkedin: [@LamiaSristy](https://www.linkedin.com/in/lamia-hemayet-sristy/)
- E-mail: <a href="mailto:lamiasristy@gmail.com?subject=Hello Lamia!">Email</a>  
- Twitter: [@LamiaSristy](https://twitter.com/lsristy1)

## Show your support

Give ⭐ Star me on GitHub — it helps!

## 📝 License

This project is [MIT](lic.url) licensed.
