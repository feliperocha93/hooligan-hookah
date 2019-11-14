{
  const menuButton = document.querySelector('.top-header > i');
  const mainMenu = document.querySelector('.main-menu');
  const events = ['click', 'touchstart'];
  const activeClass = 'active';

  function removeActiveClass() {
    mainMenu.classList.remove(activeClass);
    // eslint-disable-next-line no-use-before-define
    events.forEach((event) => document.removeEventListener(event, outsideClick));
  }

  function outsideClick(e) {
    if (e.touches) {
      if (e.touches[0].clientX > mainMenu.getBoundingClientRect().width) {
        removeActiveClass();
      }
    } else if (!e.touches) {
      if (e.clientX > mainMenu.getBoundingClientRect().width) {
        removeActiveClass();
      }
    }
  }

  function menuButtonClick() {
    mainMenu.classList.add(activeClass);
    events.forEach((event) => document.addEventListener(event, outsideClick));
  }

  events.forEach((event) => menuButton.addEventListener(event, menuButtonClick));
}
