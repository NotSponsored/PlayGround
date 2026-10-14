import { Game } from './game/Game.js';

const loading = document.getElementById('loading');
try {
  const game = new Game(document.getElementById('scene'));
  game.init();
  window.__game = game;
  loading.style.display = 'none';
} catch (err) {
  console.error(err);
  loading.textContent = 'Fehler beim Start: ' + err.message;
}
