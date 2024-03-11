var modal = document.querySelector('#instructionModal');
var closeBtn = document.querySelector('.close');
const instructionsButton = document.querySelector('#instructionsButton')

closeBtn.addEventListener('click', () => {
    modal.classList.remove('open');
});


function openInstructionsModal() {
    modal.classList.add('open');
}

instructionsButton.addEventListener('click', openInstructionsModal);