// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
const gameEngine = new Engine(document.getElementById('app'));

// keydownHandler is a variable that refers to a function. The function has one parameter
// (does the parameter name matter?) which is called event. As we will see below, this function
// will be called every time the user presses a key. The argument of the function call will be an object.
// The object will contain information about the key press, such as which key was pressed.
const keydownHandler = (event) => {
  // event.code contains a string. The string represents which key was press. If the
  // key is left, then we call the moveLeft method of gameEngine.player (where is this method defined?)
  // if (event.code === 'ArrowLeft') {
  //   gameEngine.player.moveLeft();
  // }

  // // If `event.code` is the string that represents a right arrow keypress,
  // // then move our hamburger to the right
  // if (event.code === 'ArrowRight') {
  //   gameEngine.player.moveRight();
  // }

  // if (event.code === 'ArrowDown') {
  //   deflect();
  // }
  if (event.code === 'ArrowUp') {
    gameEngine.player.moveUp();
  }

  // If `event.code` is the string that represents a right arrow keypress,
  // then move our hamburger to the right
  if (event.code === 'ArrowDown') {
    gameEngine.player.moveDown();
  }

  if (event.code === 'ArrowRight') {
    gameEngine.player.moveRight();
  }

  if (event.code === 'ArrowLeft') {
    gameEngine.player.moveLeft();
  }
  if (event.key == " " || event.code == "Space"){
    gameEngine.deflect();
  }
};

// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener('keydown', keydownHandler);

var gameName = document.createElement('p')
gameName.innerText = "Deflection";
document.body.appendChild(gameName);
gameName.style.fontSize = "100px";
gameName.style.letterSpacing = "1px";
gameName.style.zIndex = '102';
gameName.style.color = 'white';
gameName.style.position = 'absolute';
gameName.style.top = '65px';
gameName.style.left = '50%';
gameName.style.transform = 'translate(-50%, -50%)';

var menu = document.createElement('div');
// menu.src = '/images/gameOver.png';
document.body.appendChild(menu);
menu.style.display = 'flex';
menu.style.justifyContent = "center";
menu.style.flexDirection = 'column-reverse';
menu.style.alignItems = 'center';
menu.style.backgroundColor = 'black';
menu.style.position = 'absolute';
menu.style.top = '253px';
menu.style.left = '50%';
menu.style.zIndex = '101';
menu.style.opacity = '0.7';
menu.style.width = '700px';
menu.style.height = '300px';
menu.style.transform = 'translate(-50%, -50%)';

var controls = document.createElement('button');
menu.appendChild(controls);
controls.innerText = 'CONTROLS';
controls.style.display = 'block';
controls.style.marginBottom = '20px';
controls.style.marginLeft = '100px';
controls.style.top = '100px';
controls.style.left = '50%';
controls.style.fontFamily = 'auto';
controls.style.zIndex = '102';
controls.style.transform = 'translate(-50%, -50%)';
controls.style.width = '100px';
controls.style.height = '40px';
controls.style.borderRadius = '5px';
controls.style.color = '#473433';
controls.style.backgroundColor = '#f0eae3';
controls.style.letterSpacing = '1px';
controls.style.border = 'none';
controls.style.transition = 'all 0.8s'
controls.addEventListener("mouseover", function(){
  controls.style.transform = 'translate(-50%, -50%) scale(0.8)';
  controlInfo.style.opacity = '1';
  controlInfo.style.left = '50%';
})
controls.addEventListener("mouseout", function(){
  controls.style.transform = 'translate(-50%, -50%) scale(1)';
  controlInfo.style.opacity = '0';
  controlInfo.style.left = '80%';
})



var start1 = document.createElement('button');
menu.appendChild(start1)
start1.innerText = 'START';
start1.style.display = 'block';
start1.style.marginBottom = '20px';
start1.style.marginLeft = '100px';
start1.style.marginTop = '150px';
start1.style.top = '150px';
start1.style.left = '50%';
start1.style.fontFamily = 'auto';
start1.style.zIndex = '102';
start1.style.transform = 'translate(-50%, -50%)';
start1.style.width = '100px';
start1.style.height = '40px';
start1.style.borderRadius = '5px';
start1.style.color = '#473433';
start1.style.backgroundColor = '#f0eae3';
start1.style.letterSpacing = '1px';
start1.style.border = 'none';
start1.addEventListener('mousedown', function(){
  start1.style.transform = 'translate(-50%, -50%) scale(1.2)'
})
start1.addEventListener('mouseup', function(){
  gameName.style.display = 'none';
  menu.style.display = 'none';
  start1.style.display = 'none';
  start1.style.transform = 'translate(-50%, -50%) scale(1)';
  document.getElementById('music').setAttribute("src","/Music/Sekiro OST - Great Shinobi.mp3");
  document.getElementById('music').play();
  gameEngine.gameLoop();
})
start1.style.transition = 'all 0.8s'
start1.addEventListener("mouseover", function(){
  start1.style.transform = 'translate(-50%, -50%) scale(0.8)';
})
start1.addEventListener("mouseout", function(){
  start1.style.transform = 'translate(-50%, -50%) scale(1)';
})

var controlInfo = document.createElement('div');
var content = document.createElement('ul');
var content1 = document.createElement('li');
var content2 = document.createElement('li');
var content3 = document.createElement('li');
var content4 = document.createElement('li');
var content5 = document.createElement('li');
var brief = document.createElement('p');
content.appendChild(content1);
content.appendChild(content2);
content.appendChild(content3);
content.appendChild(content4);
content.appendChild(content5);
controlInfo.appendChild(content);
controlInfo.appendChild(brief);
menu.appendChild(controlInfo);
controlInfo.style.backgroundColor = 'white';
controlInfo.style.display = 'block';
controlInfo.style.position = 'absolute';
controlInfo.style.left = '80%';
controlInfo.style.top = '350px';
controlInfo.style.zIndex = '102';
controlInfo.style.opacity = '0';
controlInfo.style.width = '420px';
controlInfo.style.height = '180px';
controlInfo.style.transform = 'translate(-50%, -50%)';
controlInfo.style.transition = 'all 0.8s';
content.style.marginTop= '10px';
brief.style.margin = '0 0';
content1.innerText = "Spacebar: Deflect (tap spacebar to deflect as an attack is coming. This will negate all damage)";
content2.innerText = "Up: Move Up";
content3.innerText = "Down: Move Down";
content4.innerText = "Left: Move Left";
content5.innerText = "Right: Move Right";
brief.innerText = "Let’s see how many charging bulls that you can survive."
brief.style.marginLeft = '20px';



// We call the gameLoop method to start the game
// gameEngine.gameLoop();
