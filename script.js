const instructionModal = document.querySelector('#instructionModal');
const instructionCloseBtn = document.querySelector('.instructionClose');
const instructionsButton = document.querySelector('#instructionsButton')
const startButton = document.querySelector('.start')
const gameOverModal = document.querySelector('#gameOverModal');
const gameOverCloseBtn = document.querySelector('.gameOverClose');



const openModal = (modal) => {
    modal.classList.add('open');
}

const closeModal = (modal) => {
    modal.classList.remove('open');
}

instructionsButton.addEventListener('click', () => {
    openModal(instructionModal)
})

instructionCloseBtn.addEventListener('click', () => {
    closeModal(instructionModal);
})

gameOverCloseBtn.addEventListener('click', () => {
    closeModal(gameOverModal);
})

const gameOver = () => {
    openModal(gameOverModal)
}
// max's get pattern functions:

// const
let pattern = []
function getRandBoxes(boxCount) {
    let newArray = [];
    for (let i = 0; i < boxCount; i++) {
        newArray.push(Math.floor(Math.random() * 9))
    }
    pattern = newArray;
}

const box1 = document.querySelector('.box1');
const box2 = document.querySelector('.box2');
const box3 = document.querySelector('.box3');
const box4 = document.querySelector('.box4');
const box5 = document.querySelector('.box5');
const box6 = document.querySelector('.box6');
const box7 = document.querySelector('.box7');
const box8 = document.querySelector('.box8');
const box9 = document.querySelector('.box9');
let boxArray = [box1, box2, box3, box4, box5, box6, box7, box8, box9];


const lightDiv = (div, url) => {
    div.style.backgroundImage = url;
    setTimeout(() => {
        div.style.backgroundImage = 'none';
        div.style.backgroundColor = '';
    }, 500);
}

const displayPattern = (pattern) => {
    for (let i= 0; i<pattern.length; i++) {
        let currentBox = boxArray[pattern[i]];
        setTimeout(() => {
            lightDiv(currentBox);
            lightDiv(currentBox, "url('dogimg7.png')");
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

startButton.addEventListener('click', startGame)

let patternCounter = 0;

let boxes = document.querySelectorAll('.box')
for (let box of boxes) {
    box.addEventListener('click', () => {
        if (box.id === 'box' + pattern[patternCounter]) {
            console.log('correct')
            patternCounter ++;
            lightDiv(box, "url('blackPawPrintTransparentBackground.png')")
        } else {
            gameOver();
            startButton.addEventListener('click', startGame)
        }
        if (patternCounter === pattern.length) {
            setTimeout(nextRound, 500)
        }
    })
}
