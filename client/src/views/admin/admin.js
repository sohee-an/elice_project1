import { sidebar } from '../common/sidebar/sidebar.js';
import { changeNavbar, handleLogoutBtn } from "../../common/navbar/navbar.js";
// import * as Api from "../api.js";
sidebar();
changeNavbar();
handleLogoutBtn();

// 관리자 로그인 X -> 접근 불가
if (localStorage.getItem("role") !== "admin") {
  alert('관리자 전용 페이지입니다.');
  window.location.href = "/";
}