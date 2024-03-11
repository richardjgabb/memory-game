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

