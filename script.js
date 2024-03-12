
const instructionModal = document.querySelector('#instructionModal');
const instructionCloseBtn = document.querySelector('.instructionClose');
const instructionsButton = document.querySelector('#instructionsButton')
const startButton = document.querySelector('.start')
const gameOverModal = document.querySelector('#gameOverModal');
const gameOverCloseBtn = document.querySelector('.gameOverClose');
const boxes = document.querySelectorAll('.box');
let roundCounter = 0;
let patternLength = 4;
let speed = 1000;


const openModal = (modal) => {
    modal.classList.add('open');
}

const closeModal = (modal) => {
    modal.classList.remove('open');
}

const gameOver = () => {
    openModal(gameOverModal);
    pattern = [];
    roundCounter = 0;
    speed = 1000;
    patternLength = 4;
}

const  getRandBoxes = (patternLength) => {
    for (let i = 0; i < patternLength; i++) {
        pattern.push(Math.floor(Math.random() * 9))
    }
}


const lightDiv = (div, background) => {
    div.classList.add(background);
    setTimeout(() => {
        div.classList.remove(background);
    }, speed*0.6);
}

const displayPattern = (pattern, speed) => {
    for (let i = 0; i < pattern.length; i++) {
        let currentBox = boxes[pattern[i]];
        setTimeout(() => {
            lightDiv(currentBox, 'dogImg');
        }, speed*(i+1));
    }
}

const startGame = () => {
    getRandBoxes(patternLength);
    if (roundCounter % 5 === 0 && roundCounter !== 0) {
        speed *= 0.5
    }
        displayPattern(pattern, speed);
    startButton.removeEventListener('click', startGame)
}

const nextRound = () => {
    patternCounter = 0;
    pattern = [];
    roundCounter ++;
    if (roundCounter % 3 === 0){
        patternLength ++;
    }
    startGame();
}

let pattern = [];
let patternCounter = 0;

instructionsButton.addEventListener('click', () => {
    openModal(instructionModal)
})

instructionCloseBtn.addEventListener('click', () => {
    closeModal(instructionModal);
})

gameOverCloseBtn.addEventListener('click', () => {
    closeModal(gameOverModal);
})

// max's get pattern functions:

// const

startButton.addEventListener('click', startGame)

boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (box.id === 'box' + pattern[patternCounter]) {
            patternCounter ++;
            lightDiv(box, "pawImg");
        } else {
            gameOver();
            startButton.addEventListener('click', startGame)
        }
        if (patternCounter === pattern.length) {
            setTimeout(nextRound, 500)
        }
    })
})

