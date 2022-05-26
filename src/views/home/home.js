import { sidebar } from '../sidebar/sidebar.js';
import { changeNavbar, handleLogoutBtn } from '../navbar/navbar.js';
sidebar();
changeNavbar();
handleLogoutBtn();

document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });

});

// 메인페이지에서 이미지에 마우스 갖다 댔을 때!

let shopmenDiv = document.querySelector('#shopmenDiv');
let shopwomenDiv = document.querySelector('#shopwomenDiv');
let hidden = shopmenDiv.querySelector('.hidden');
let hidden1 = shopwomenDiv.querySelector('.hidden');

shopmenDiv.addEventListener('mouseenter',(e)=>{
  hidden.classList.remove('hidden');
})
shopmenDiv.addEventListener('mouseleave',(e)=>{
  hidden.classList.add('hidden');
})

shopwomenDiv.addEventListener('mouseenter',(e)=>{
  hidden1.classList.remove('hidden');
})
shopwomenDiv.addEventListener('mouseleave',(e)=>{
  hidden1.classList.add('hidden');
})
