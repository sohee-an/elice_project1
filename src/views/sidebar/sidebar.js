export function sidebar() {
  const navButton = document.querySelector('.navbar-burger');
  const sideMenu = document.querySelector('.side-menu');
  const closeButton = document.querySelector('.side-menu i')

  navButton.addEventListener('click', () => {
    sideMenu.classList.remove('hidden');
  })

  closeButton.addEventListener('click', () => {
    sideMenu.classList.add('hidden');
  })
}