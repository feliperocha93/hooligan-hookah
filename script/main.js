const menuButton = document.querySelector('.top-header > i');
const mainMenu = document.querySelector('.main-menu');

function outsideClick(e) {
    if (e.touches[0].clientX > mainMenu.getBoundingClientRect().width) {
        mainMenu.classList.remove('active');
        document.removeEventListener('touchstart', outsideClick);
    } 
}

function menuButtonClick() {
    mainMenu.classList.add('active');
    document.addEventListener('touchstart', outsideClick);
}

menuButton.addEventListener('touchstart', menuButtonClick);
