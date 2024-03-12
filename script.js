
const instructionModal = document.querySelector('#instructionModal');
const instructionCloseBtn = document.querySelector('.instructionClose');
const instructionsButton = document.querySelector('#instructionsButton')
const startButton = document.querySelector('.start')
const gameOverModal = document.querySelector('#gameOverModal');
const gameOverCloseBtn = document.querySelector('.gameOverClose');
const boxes = document.querySelectorAll('.box');


const openModal = (modal) => {
    modal.classList.add('open');
}

const closeModal = (modal) => {
    modal.classList.remove('open');
}

const gameOver = () => {
    openModal(gameOverModal);
    pattern = [];
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
    startGame()
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
