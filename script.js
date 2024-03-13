const instructionModal = document.querySelector('#instructionModal');
const instructionCloseBtn = document.querySelector('.instructionClose');
const instructionsButton = document.querySelector('#instructionsButton');
const startButton = document.querySelector('.start');
const gameOverModal = document.querySelector('#gameOverModal');
const gameOverCloseBtn = document.querySelector('.gameOverClose');
const boxes = document.querySelectorAll('.box');
const levelNumber = document.querySelector('.levelNum');
const playAgainButton = document.querySelector('.replayButton');
const playerName = document.querySelector('#name');
const submitName = document.querySelector('.submitName');
let roundCounter = 0;
let patternLength = 4;
let speed = 1000;
let pattern = [];
let patternCounter = 0;

const openModal = (modal) => {
    modal.classList.add('open');
}

const closeModal = (modal) => {
    modal.classList.remove('open');
}

const gameOver = () => {
    openModal(gameOverModal);
    getData();
}

const resetPattern = () => {
    pattern = [];
    roundCounter = 0;
    speed = 1000;
    patternLength = 4;
    levelNumber.textContent = 'Level 1';
}

const  getRandBoxes = (patternLength) => {
    for (let i = 0; i < patternLength; i++) {
        pattern.push(Math.floor(Math.random() * 9));
    }
}

const lightDiv = (div, background) => {
    div.classList.add(background);
    const speedMultDisappear = 0.6;
    setTimeout(() => {
        div.classList.remove(background);
    }, speed * speedMultDisappear);
}

const displayPattern = (pattern, speed) => {
    for (let i = 0; i < pattern.length; i++) {
        let currentBox = boxes[pattern[i]];
        setTimeout(() => {
            lightDiv(currentBox, 'dogImg');
        }, speed * (i+1));
    }
}

const startGame = () => {
    getRandBoxes(patternLength);
    const speedMult = 0.5;
    if (roundCounter % 5 === 0 && roundCounter !== 0) {
        speed *= speedMult;
    }
    displayPattern(pattern, speed);
    startButton.removeEventListener('click', startGame)
}

const nextRound = () => {
    patternCounter = 0;
    pattern = [];
    roundCounter++;
    levelNumber.textContent = 'Level ' + (roundCounter+1);
    if (roundCounter % 3 === 0){
        patternLength++;
    }
    startGame();
}

instructionsButton.addEventListener('click', () => {
    openModal(instructionModal);
})

instructionCloseBtn.addEventListener('click', () => {
    closeModal(instructionModal);
})

gameOverCloseBtn.addEventListener('click', () => {
    closeModal(gameOverModal);
})

playAgainButton.addEventListener('click', () => {
    closeModal(gameOverModal);
    startGame();
})

startButton.addEventListener('click', startGame);

boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (box.id === 'box' + pattern[patternCounter]) {
            patternCounter++;
            lightDiv(box, 'pawImg');
        } else {
            gameOver();
            startButton.addEventListener('click', startGame);
        }
        if (patternCounter === pattern.length && patternCounter !== 0) {
            setTimeout(nextRound, 500);
        }
    })
})

const sendData = () => {
    fetch('https://leaderboard.dev.io-academy.uk/score',
        {method: 'POST',
            body: JSON.stringify({'game': 'MemoryDog', 'name' : playerName.value, 'score' : roundCounter}),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => {
        return response.json();
    }).then(data => {
        console.table(data);
    })
    pattern = [];
    roundCounter = 0;
    speed = 1000;
    patternLength = 4;
    levelNumber.textContent = 'Level 1';
}

submitName.addEventListener('click', sendData);

const getData = () => {
    fetch('https://leaderboard.dev.io-academy.uk/scores?game=MemoryDog').then(response => {
        return response.json();
    }).then(result => {
        result.data.sort(function(a,b){return b.score-a.score});
        for (let i=0; i<10; i++) {
            console.log((i+1) + ': ' + result.data[i].name + ': ' + result.data[i].score);
        }
    })
}