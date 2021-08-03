import './index.scss';
import ClientGame from './client/ClientGame';

document.querySelector('.btn').addEventListener('click', (e) => {
  e.preventDefault();
  ClientGame.init({ tagId: 'game', playerName: document.getElementById('name').value });
  document.querySelector('.canvas-wrap').firstChild.remove();
})
// window.addEventListener('load', () => {
  
// })

