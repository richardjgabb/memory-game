
const instructionModal = document.querySelector('#instructionModal');
const instructionCloseBtn = document.querySelector('.instructionClose');
const instructionsButton = document.querySelector('#instructionsButton')
const startButton = document.querySelector('.start')
const gameOverModal = document.querySelector('#gameOverModal');
const gameOverCloseBtn = document.querySelector('.gameOverClose');
const boxes = document.querySelectorAll('.box');
const levelNumber = document.querySelector('.levelNum')
const playAgainButton = document.querySelector('.replayButton')
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
    levelNumber.textContent = 'Level 1';
}

const  getRandBoxes = (boxCount) => {
    for (let i = 0; i < boxCount; i++) {
        pattern.push(Math.floor(Math.random() * 9))
    }
}

const lightDiv = (div, background) => {
    div.classList.add(background);
    setTimeout(() => {
        div.classList.remove(background);
    }, 666);
}

const displayPattern = (pattern) => {
    for (let i = 0; i < pattern.length; i++) {
        let currentBox = boxes[pattern[i]];
        setTimeout(() => {
            lightDiv(currentBox, 'dogImg');
        }, 1000*(i+1));
    }
}

const startGame = () => {
    getRandBoxes(4);
    displayPattern(pattern);
    startButton.removeEventListener('click', startGame)
}

const nextRound = () => {
    patternCounter = 0;
    pattern = [];
    roundCounter ++;
    levelNumber.textContent = 'Level ' + (roundCounter+1);
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

playAgainButton.addEventListener('click', () => {
    closeModal(gameOverModal);
    startGame()
})

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
        if (patternCounter === pattern.length && patternCounter !== 0) {
            setTimeout(nextRound, 500)
        }
    })
})
