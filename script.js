var modal = document.querySelector('#modal');
var closeBtn = document.querySelector('.close');

closeBtn.addEventListener('click', () => {
    modal.classList.remove('open');
});


function openInstructionsModal() {
    modal.classList.add('open');
}

openInstructionsModal()