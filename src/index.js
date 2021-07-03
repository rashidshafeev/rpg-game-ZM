import './index.scss';
import Character from './assets/Male-4-Walk.png';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const img = document.createElement('img');
img.src = Character;

const spriteW = 48;
const spriteH = 48;

const shots = 3;
let cycle = 0;

let buttonDown = false;
let buttonRight = false;
let buttonUp = false;
let buttonLeft = false;
let pY = 300;
let pX = 300;
let direction = 0;

const starsColorPalette = ['#2274A5', '#FFBF00', '#32936F', '#22AED1', '#6D8EA0', '#FB4D3D'];
const starsX = [];
const starsY = [];
const starsColor = [];

function keyDownHandler(e) {
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    buttonDown = true;
  }
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    buttonRight = true;
  }
  if (e.key === 'Up' || e.key === 'ArrowUp') {
    buttonUp = true;
  }
  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    buttonLeft = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    buttonDown = false;
  }
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    buttonRight = false;
  }
  if (e.key === 'Up' || e.key === 'ArrowUp') {
    buttonUp = false;
  }
  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    buttonLeft = false;
  }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function getRandom(value) {
  const random = Math.ceil(Math.random() * value);
  return random;
}

function drawSpace() {
  let i = 0;
  let j = 0;
  let a = 0;

  while (i < 600) {
    while (j < 600) {
      // ctx.fillStyle = spaceColor[getRandom(6) - 1];
      ctx.fillStyle = `rgb(${20},${22},${49 + a + getRandom(7)})`;
      ctx.fillRect(j, i, 10, 10);
      j += 10;
    }
    j = 0;
    i += 10;
    a += 1;
  }
}

function generateStars(amount) {
  for (let i = 0; i < amount; i++) {
    starsX[i] = getRandom(600);
    starsY[i] = getRandom(600);
    starsColor[i] = starsColorPalette[getRandom(starsColorPalette.length) - 1];
  }
}

generateStars(20);

function drawStars() {
  for (let i = 0; i < starsX.length; i++) {
    ctx.fillStyle = starsColor[i];
    ctx.beginPath();
    ctx.arc(starsX[i], starsY[i], 1 + getRandom(2), 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }
}

// Кусок кода который я скопировал с javascript форума. Отключает скроллинг страницы по нажатию клавиш.
document.body.onkeydown = function (e) {
  e = e || window.event;
  var c = e.keyCode;
  //Убирает эвент на стрелках, на pageDown, PageUp, Home, End
  if ((c > 36 && c < 41) || (c > 32 && c < 37)) return false;
};

img.addEventListener('load', () => {
  setInterval(() => {
    if (buttonDown) {
      pY += 10;
      cycle = (cycle + 1) % shots;
      direction = 0;
    }

    if (buttonLeft) {
      pX -= 10;
      cycle = (cycle + 1) % shots;
      direction = 48;
    }

    if (buttonRight) {
      pX += 10;
      cycle = (cycle + 1) % shots;
      direction = 96;
    }

    if (buttonUp) {
      pY -= 10;
      cycle = (cycle + 1) % shots;
      direction = 144;
    }

    if (pY + spriteH > 600) {
      pY = 600 - spriteH;
    } else if (pY < 0) {
      pY = 0;
    }

    if (pX + spriteW > 600) {
      pX = 600 - spriteW;
    } else if (pX < 0) {
      pX = 0;
    }

    ctx.clearRect(0, 0, 600, 600);

    drawSpace();
    drawStars();

    ctx.drawImage(img, cycle * spriteW, direction, spriteW, spriteH, pX, pY, 48, 48);
  }, 200);
});
