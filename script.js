const instructionModal = document.querySelector('#instructionModal');
const instructionCloseBtn = document.querySelector('.instructionClose');
const instructionsButton = document.querySelector('#instructionsButton');
const startButton = document.querySelector('.start');
const gameOverModal = document.querySelector('#gameOverModal');
const gameOverCloseBtns = document.querySelectorAll('.gameOverClose');
const boxes = document.querySelectorAll('.box');
const levelNumber = document.querySelector('.levelNum');
const playerName = document.querySelector('#name');
const submitName = document.querySelector('.submitName');
const playAgainButtons = document.querySelectorAll('.replayButton');
const leaderboardModal = document.querySelector('#leaderboardModal')
const leaderboardButton = document.querySelector('.leaderboardButton')
const leaderboardTable = document.querySelector('.leaderboardTable')
let roundCounter = 0;
let patternLength = 4;
let speed = 1000;
let pattern = [];
let patternCounter = 0;
let leaders = [];

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

gameOverCloseBtns.forEach(button => {
    button.addEventListener('click', () => {
        closeModal(instructionModal);
        closeModal(gameOverModal);
        closeModal(leaderboardModal);
    })
})
playAgainButtons.forEach(button => {
    button.addEventListener('click', () => {
        closeModal(gameOverModal);
        closeModal(leaderboardModal);
        startGame();
    })
})
// awaiting button from S7T1 & S7T5!!!!

// leaderboardButton.addEventListener('click', () => {
//     openModal(leaderboardModal);
//     closeModal(gameOverModal);
// })

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
    resetPattern();
}

submitName.addEventListener('click', sendData);

const getData = () => {
    fetch('https://leaderboard.dev.io-academy.uk/scores?game=MemoryDog').then(response => {
        return response.json();
    }).then(result => {
        for (let i=0;i<10;i++){
            leaders.push(result.data.sort(function(a,b){return b.score-a.score})[i]);
            addLeaderboardTable(leaders[i]);
        }
    }
    )}

openModal(leaderboardModal)

const addLeaderboardTable = (player) => {
    let tableRow = document.createElement('tr');
    let tableData = document.createElement('td');
    let tableDataTwo = document.createElement('td');
    leaderboardTable.appendChild(tableRow);
    tableRow.appendChild(tableData).textContent = player.name;
    tableRow.appendChild(tableDataTwo).textContent = player.score;
}

getData()
