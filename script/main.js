const menuButton = document.querySelector('.top-header > i');
const mainMenu = document.querySelector('.main-menu');
const main = document.querySelector('main');

function mainClick() {
    mainMenu.classList.remove('active');
    main.removeEventListener('touchstart', mainClick);
}

function menuButtonClick() {
    mainMenu.classList.add('active');
    main.addEventListener('touchstart', mainClick);
}

menuButton.addEventListener('touchstart', menuButtonClick);