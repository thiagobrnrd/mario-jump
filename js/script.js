const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.getElementById('score');

let score = 0;
let passedPipe = false;

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '25px';
        mario.style.margin = '30px';

        clearInterval(loop);
        
        // Adiciona "Game Over" na tela no centro com a cor vermelha
        const gameOverText = document.createElement('h1');
        gameOverText.textContent = 'Game Over';
        gameOverText.style.position = 'absolute';
        gameOverText.style.top = '50%';
        gameOverText.style.left = '50%';
        gameOverText.style.transform = 'translate(-50%, -50%)';
        gameOverText.style.fontSize = '35px';
        gameOverText.style.color = 'red'; // Define a cor vermelha
        document.body.appendChild(gameOverText);
    }

    // Verifica se o cano passou completamente pelo Mario
    if (pipePosition < 0 && pipePosition > -80 && !passedPipe) {
        // Incrementa o score apenas uma vez quando o Mario passa pelo cano
        score++;
        scoreElement.textContent = score;
        passedPipe = true; // Marca o cano como passado para evitar incremento repetido
    }

    // Reseta a marcação do cano passado quando ele sai completamente da tela
    if (pipePosition < -80) {
        passedPipe = false;
    }
}, 10);

document.addEventListener('keydown', jump);
