const modal = document.querySelector('#instructionModal');
const closeBtn = document.querySelector('.close');
const instructionsButton = document.querySelector('#instructionsButton')

closeBtn.addEventListener('click', () => {
    modal.classList.remove('open');
});

const openInstructionsModal = () => {
    modal.classList.add('open');
}

instructionsButton.addEventListener('click', openInstructionsModal);

//
let patternCounter = 0;
let pattern = [3, 8, 1, 2]

let boxes = document.querySelectorAll('.box')
for (let box of boxes) {
    box.addEventListener('click', () => {
        if (box.id === pattern[patternCounter].toString()) {
            console.log('correct')
            patternCounter ++;
        } else {
            console.log('Game over');
        }
        if (patternCounter === pattern.length) {
            patternCounter = 0;
            pattern = [];
            console.log('restart')
        }
    })
}




