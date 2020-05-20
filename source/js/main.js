var mobileMenuButton = document.querySelector('.page-header__toggle');
var mainNav = document.querySelector('.main-nav');

mainNav.classList.remove('main-nav--nojs');

mobileMenuButton.addEventListener('click', function() {
  mainNav.classList.toggle('main-nav--closed');
  mainNav.classList.toggle('main-nav');
  this.classList.toggle('page-header__toggle--off');
});

var orderButtons = document.querySelectorAll('.weekly-product__order-button, .catalog__cart-button, .video__order-button');
var addButton = document.querySelector('.modal-size-selection__button');
var orderPopup = document.querySelector('.modal-size-selection');

if (orderPopup) {
  for (var i = 0; i < orderButtons.length; i++) {
    orderButtons[i].addEventListener('click', function(evt) {
    evt.preventDefault();
    orderPopup.classList.add('modal--open');
    });
  }

  addButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    if (orderPopup.classList.contains('modal--open')) {
      orderPopup.classList.remove('modal--open');
    }
  });

  window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
      if (orderPopup.classList.contains('modal--open')) {
        evt.preventDefault();
        orderPopup.classList.remove('modal--open');
      }
    }
  });

  window.addEventListener('touchstart', function(evt) {
    if (evt.target == orderPopup) {
      orderPopup.classList.remove('modal--open');
    }
  });
}
