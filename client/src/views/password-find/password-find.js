import { sidebar } from '../../common/sidebar/sidebar.js';
import { changeNavbar, handleLogoutBtn } from "../../common/navbar/navbar.js";
import * as Api from "../../api.js";
sidebar();
changeNavbar();
handleLogoutBtn();

const submitBtn = document.querySelector('#submitBtn');
const modal = document.querySelector('.modal');
const confirmBtn = document.querySelector("#confirmBtn");
const closeBtn = document.querySelectorAll(".close");
const emailInput = document.querySelector('#emailInput');
const userEmail = document.querySelector('#userEmail');

initEventHandlers();

// 이벤트 핸들러
function initEventHandlers() {
  submitBtn.addEventListener('click', findEmail);

  closeBtn.forEach(el => {
    el.addEventListener('click', closeModal);
  })

  confirmBtn.addEventListener('click', () => {
    window.location.href = "/login";
  })
}

// 이메일 있으면 모달창
async function findEmail(e) {
  e.preventDefault();
  modal.classList.add("is-active");
  // try {
  //   const email = emailInput.value;
  //   await Api.get('', { email });
  //   userEmail.innerText = email;
    
  // } catch (err) {
  //   alert(err.message);
  // }
}

function closeModal(e) {
  e.preventDefault();
  modal.classList.remove("is-active");
}