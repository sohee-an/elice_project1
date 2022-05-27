import { sidebar } from "../common/sidebar/sidebar.js";
import { changeNavbar, handleLogoutBtn } from "../common/navbar/navbar.js";
sidebar();
changeNavbar();
handleLogoutBtn();

const submitBtn = document.querySelector(".form-box .button");
const input = document.querySelector(".form-box .input");
const modal = document.querySelector(".modal");

// submit 버튼 클릭시
// 모달창 classList.add('is-active')

// 모달창 yes 버튼 클릭 시
// 비밀번호를 전달해주고
// 틀리면 -> alert
// 맞으면 -> alert, db에서 회원정보 삭제

// 모달창 닫기
// 아니오 버튼
// background
// x버튼
