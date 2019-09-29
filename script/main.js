const menuButton = document.querySelector('.top-header > i');
const mainMenu = document.querySelector('.main-menu');
const menuWidth = mainMenu.getBoundingClientRect().width;

function outsideClick(e) {
    if (e.touches[0].clientX > menuWidth) {
        mainMenu.classList.remove('active');
        document.removeEventListener('touchstart', outsideClick);
    } 
}

function menuButtonClick() {
    mainMenu.classList.add('active');
    document.addEventListener('touchstart', outsideClick);
}

menuButton.addEventListener('touchstart', menuButtonClick);
