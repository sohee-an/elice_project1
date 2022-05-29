import { sidebar } from '../common/sidebar/sidebar.js'
import { changeNavbar, handleLogoutBtn } from '../common/navbar/navbar.js';
sidebar();
changeNavbar();
handleLogoutBtn();

// 메인페이지에서 이미지에 마우스 갖다 댔을 때!

let shopmenDiv = document.querySelector('#shopmenDiv');
let shopwomenDiv = document.querySelector('#shopwomenDiv');
let hidden = shopmenDiv.querySelector('.hidden');
let hidden1 = shopwomenDiv.querySelector('.hidden');

shopmenDiv.addEventListener('mouseenter', (e) => {
  hidden.classList.remove('hidden');
})
shopmenDiv.addEventListener('mouseleave', (e) => {
  hidden.classList.add('hidden');
})

shopwomenDiv.addEventListener('mouseenter', (e) => {
  hidden1.classList.remove('hidden');
})
shopwomenDiv.addEventListener('mouseleave', (e) => {
  hidden1.classList.add('hidden');
})
