var mobileMenuButton = document.querySelector('.main-nav__toggle');
var mainNav = document.querySelector('.main-nav');

mainNav.classList.remove('main-nav--nojs');

mobileMenuButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  if (mainNav.classList.contains('main-nav--closed')) {
    mainNav.classList.remove('main-nav--closed');
    mainNav.classList.add('main-nav--open');
  } else {
    mainNav.classList.remove('main-nav--open');
    mainNav.classList.add('main-nav--closed');
  }
});
