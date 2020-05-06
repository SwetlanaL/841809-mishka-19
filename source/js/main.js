var mobileMenuButton = document.querySelector('.main-nav__toggle');
var mainNav = document.querySelector('.main-nav');

mainNav.classList.remove('main-nav--nojs');

mobileMenuButton.addEventListener('click', function() {
  mainNav.classList.toggle('main-nav--closed');
  mainNav.classList.toggle('main-nav');
  this.classList.toggle('main-nav__toggle--off');
});
