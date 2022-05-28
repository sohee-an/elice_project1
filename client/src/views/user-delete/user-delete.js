import { sidebar } from "../common/sidebar/sidebar.js";
import { changeNavbar, handleLogoutBtn } from "../common/navbar/navbar.js";
sidebar();
changeNavbar();
handleLogoutBtn();

const submitBtn = document.querySelector(".form-box .button");
const passwordInput = document.querySelector(".form-box .input");
const modal = document.querySelector(".modal");
const yesBtn = document.querySelector('#deleteCompleteBtn');
const closeBtn = document.querySelectorAll('.close');

// 회원정보 삭제 버튼 클릭시 모달창 띄움
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.add('is-active');
})

// 모달창 닫기
closeBtn.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('is-active');
  })
})

// 모달창 yes 버튼 클릭 시
// yesBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   if (passwordInput.value === password) {
//     alert('회원 정보가 삭제되었습니다.');
//     // db에서 회원정보 삭제
//   } else {
//     alert('비밀번호가 일치하지 않습니다.');
//   }
// })