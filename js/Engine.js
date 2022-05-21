// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
// var m = document.createElement(
//   "AUDIO");
// m.setAttribute("src", "Music/Sekiro OST - Great Shinobi.mp3");
var numberOfBulls = 0;

  var sound = document.createElement("AUDIO");
  if (sound.canPlayType("audio/mp3")) {
    sound.setAttribute("src","Music/Deflect.mp3");
  }
  document.body.appendChild(sound);

  var sound1 = document.createElement("AUDIO");
  if (sound1.canPlayType("audio/mp3")) {
    sound1.setAttribute("src","Music/hitSound.mp3");
  }
  document.body.appendChild(sound1);

  var div = document.createElement('div');
  var ul = document.createElement('ul');
  ul.style.display = "flex";
  ul.style.justifyContent = "left";
  ul.style.height = '20px';
  ul.style.paddingLeft = '10px'
  var bar1 = document.createElement('li');
  var bar2 = document.createElement('li');
  var bar3 = document.createElement('li');
  var count = document.createElement('li');
  bar1.style.backgroundColor = 'rgb(191, 0, 0)';
  bar1.style.listStyleType = 'none';
  bar1.style.width = '100px';
  bar1.style.borderRadius = '3px';
  bar1.style.marginRight = '2px';
  bar2.style.backgroundColor = 'rgb(191, 0, 0)';
  bar2.style.listStyleType = 'none';
  bar2.style.width = '100px';
  bar2.style.borderRadius = '3px';
  bar2.style.marginRight = '2px';
  bar3.style.backgroundColor = 'rgb(191, 0, 0)';
  bar3.style.listStyleType = 'none';
  bar3.style.width = '100px';
  bar3.style.borderRadius = '3px';
  count.style.listStyleType = 'none';
  count.innerText = `Charging Bulls: ${numberOfBulls}`;
  count.style.width = "100px";
  count.style.marginRight = '2%';
  count.style.textAlign= 'right';
  count.style.flexGrow = '1';
  ul.appendChild(bar1);
  ul.appendChild(bar2);
  ul.appendChild(bar3);
  ul.appendChild(count);
  div.appendChild(ul);
  document.body.appendChild(div);

var message = document.createElement('img');
message.src = '/images/gameOver.png';
document.body.appendChild(message);
message.style.display = 'none';
message.style.position = 'absolute';
message.style.top = '253px';
message.style.left = '50%';
message.style.zIndex = '100';
message.style.opacity = '0.7';
message.style.width = '700px';
message.style.transform = 'translate(-50%, -50%)';

var start = document.createElement('button');
document.body.appendChild(start);
start.innerText = 'RESTART';
start.style.display = 'none';
start.style.position = 'absolute';
start.style.top = '410px';
start.style.left = '50%';
start.style.zIndex = '101';
start.style.transform = 'translate(-50%, -50%)';
start.style.width = '100px';
start.style.height = '40px';
start.style.borderRadius = '5px';
start.style.color = '#473433';
start.style.backgroundColor = '#f0eae3';
start.style.letterSpacing = '1px';
start.style.border = 'none';
start.addEventListener('mousedown', function(){
  start.style.transform = 'translate(-50%, -50%) scale(1.2)'
})
start.addEventListener('mouseup', function(){
  message.style.display = 'none';
  start.style.display = 'none';
  start.style.transform = 'translate(-50%, -50%) scale(1)'
  location.reload();
})
start.style.transition = 'all 0.8s'
start.addEventListener("mouseover", function(){
  start.style.transform = 'translate(-50%, -50%) scale(0.8)';
})
start.addEventListener("mouseout", function(){
  start.style.transform = 'translate(-50%, -50%) scale(1)';
})


class Engine {
  // The constructor as one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    // We add the background image to the game
    addBackground(this.root);
  }
  
  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });
    

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });



    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
      numberOfBulls++;
      console.log(numberOfBulls);
      count.innerText = `Charging Bulls: ${numberOfBulls-5}`;

    }
    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      document.getElementById('music').pause();
      document.removeEventListener('keydown', keydownHandler)
      message.style.display = 'block';
      start.style.display = 'block';
      // window.alert('Game over');
      return;
    }
    this.player.domElement.style.border = 'none';
    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };
  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    //condition to check if at least one of enemies overlaps player (some()) 
    // const condition = this.enemies.some((enemy) => enemy.y + ENEMY_HEIGHT > GAME_HEIGHT - PLAYER_HEIGHT - 40 && 
    // enemy.x === this.player.x &&
    // enemy.y > PLAYER_HEIGHT + 40);
    const condition = this.enemies.some((enemy) => enemy.x < this.player.x && 
    enemy.y === this.player.y);
    // const condition3 = this.enemies.some((enemy) => enemy.x >= 30 + 106 && 
    // enemy.y === this.player.y);
    const liArray = document.querySelectorAll("li");
    // for (let i = 1; i >= 0; i--){
    //   console.log('test2');
    //   if (condition2 === true){
    //     liArray[i].style.backgroundColor= 'white';
    //   }
    // }
    if (condition === true && !sound.paused === false){
      console.log(!sound.paused);
      sound1.play();
      const target = this.enemies.find((enemy) => enemy.x < this.player.x + 106 && enemy.y === this.player.y)
      target.destroy();
      this.player.hp -= 1;
      // return true;
      if (this.player.hp === 2) {
        liArray[2].style.backgroundColor= 'white';
      }
      if (this.player.hp === 1) {
        liArray[1].style.backgroundColor= 'white';
      }
      if (this.player.hp === 0){
        liArray[0].style.backgroundColor= 'white';
        return true;
      }
    }     
    if (this.player.domElement.style.border === '7px solid yellow'){
      return false;
    }
    // if (condition2 === true && document.body.contains(document.getElementById('on'))) {
    //   sound.id = 'off';
    //   return false;
    // } 
  };
  deflect() {
    // const condition2 = this.enemies.some((enemy) => enemy.y + ENEMY_HEIGHT > GAME_HEIGHT - PLAYER_HEIGHT - 40);
    // if (condition2 === true) {
    //   this.isPlayerDead() = false;
    // } else {
      // const condition = this.enemies.some((enemy) => enemy.x < 89 && enemy.y === this.player.y);
      const condition2 = this.enemies.some((enemy) => enemy.x < this.player.x + 116 &&  enemy.x >= this.player.x && enemy.y === this.player.y);
      if (condition2 === true){
      // document.getElementById('sound').play();
      this.player.domElement.style.border = '7px solid yellow';
      sound.play();
      }
      // if (condition === true){
      //   // document.getElementById('sound').play();
      //   sound1.play();
      // // console.log(document.getElementById('sound').src === 'http://127.0.0.1:5500/Music/Deflect.mp3')
      // }
    }
    
}

