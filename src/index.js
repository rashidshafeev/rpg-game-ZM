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
let pY = (canvas.height - spriteW) / 2;
let pX = (canvas.width - spriteH) / 2;
let direction = 0;

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
      direction = spriteH * 0;
    }

    if (buttonLeft) {
      pX -= 10;
      cycle = (cycle + 1) % shots;
      direction = spriteH * 1;
    }

    if (buttonRight) {
      pX += 10;
      cycle = (cycle + 1) % shots;
      direction = spriteH * 2;
    }

    if (buttonUp) {
      pY -= 10;
      cycle = (cycle + 1) % shots;
      direction = spriteH * 3;
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

    ctx.drawImage(img, cycle * spriteW, direction, spriteW, spriteH, pX, pY, 48, 48);
  }, 200);
});
