<<<<<<< HEAD:src/views/home/home.js
// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.
=======
import { sidebar } from '../common/sidebar/sidebar.js'
import { changeNavbar, handleLogoutBtn } from '../common/navbar/navbar.js';
sidebar();
changeNavbar();
handleLogoutBtn();
>>>>>>> backend-product-api:client/src/views/home/home.js

import * as Api from '/api.js';
import { randomId } from '/useful-functions.js';

// 요소(element), input 혹은 상수
const landingDiv = document.querySelector('#landingDiv');
const greetingDiv = document.querySelector('#greetingDiv');

<<<<<<< HEAD:src/views/home/home.js
addAllElements();
addAllEvents();
=======
  // Add a click event on each of them
  $navbarBurgers.forEach(el => {
    el.addEventListener('click', () => {
>>>>>>> backend-product-api:client/src/views/home/home.js

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {
  insertTextToLanding();
  insertTextToGreeting();
}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  landingDiv.addEventListener('click', alertLandingText);
  greetingDiv.addEventListener('click', alertGreetingText);
}

function insertTextToLanding() {
  landingDiv.insertAdjacentHTML(
    'beforeend',
    `
      <h2>n팀 쇼핑몰의 랜딩 페이지입니다. 자바스크립트 파일에서 삽입되었습니다.</h2>
    `
  );
}

function insertTextToGreeting() {
  greetingDiv.insertAdjacentHTML(
    'beforeend',
    `
      <h1>반갑습니다! 자바스크립트 파일에서 삽입되었습니다.</h1>
    `
  );
}

function alertLandingText() {
  alert('n팀 쇼핑몰입니다. 안녕하세요.');
}

function alertGreetingText() {
  alert('n팀 쇼핑몰에 오신 것을 환영합니다');
}

<<<<<<< HEAD:src/views/home/home.js
async function getDataFromApi() {
  // 예시 URI입니다. 현재 주어진 프로젝트 코드에는 없는 URI입니다.
  const data = await Api.get('/api/user/data');
  const random = randomId();

  console.log({ data });
  console.log({ random });
}
=======
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
>>>>>>> backend-product-api:client/src/views/home/home.js
