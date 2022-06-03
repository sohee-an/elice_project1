import { sidebar } from "../../common/sidebar/sidebar.js";
import { changeNavbar, handleLogoutBtn } from "../../common/navbar/navbar.js";
import * as Api from "../../api.js";
sidebar();
changeNavbar();
handleLogoutBtn();

// 관리자 로그인 X -> 접근 불가
if (localStorage.getItem("role") !== "admin") {
  alert('관리자 전용 페이지입니다.');
  window.location.href = "/";
}

const usersContainer = document.querySelector("#usersContainer");
const usersCount = document.querySelector("#usersCount");
const adminCount = document.querySelector("#adminCount");
const modal = document.querySelector(".modal");
const deleteCompleteBtn = document.querySelector("#deleteCompleteBtn");
const closeBtn = document.querySelectorAll(".close");

getUsers();

// 유저 목록 가져오기
async function getUsers() {
  const res = await Api.get('/api/userlist');
  usersCount.innerText = res.length;
  adminCount.innerText = res.filter(el => el.role === "admin").length;

  res.forEach(el => {
    const { _id, email, createdAt, fullName, role } = el;
    const setDate = (createdAt) => createdAt.slice(0, 10);
    const setEmail = (email) => email.slice(0, 3) + "*".repeat(email.length - 3);
    const setName = (fullName) => fullName.slice(0, 1) + "*".repeat(fullName.length - 1);

    const column = `<div class="columns orders-item" id="user-${_id}">
      <div class="column">${setDate(createdAt)}</div>
      <div class="column">${setEmail(email)}</div>
      <div class="column">${setName(fullName)}</div>
      <div class="column">
        <div class="select">
          <select id="roleSelectBox-${_id}" class="has-background-link-light has-text-link">
            <option value="basic-user" class="has-background-link-light has-text-link" ${role === "basic-user" ? "selected" : null}>일반사용자</option>
            <option value="admin" class="has-background-danger-light has-text-danger" ${role === "admin" ? "selected" : null}>관리자</option>
          </select>
        </div>
      </div>
      <div class="column">
        <button class="button delete-btn" id="deleteBtn-${_id}">회원정보 삭제</button>
      </div>
    </div>
    `
    usersContainer.insertAdjacentHTML('beforeend', column);
  })

  initEventHandlers();
}

// 이벤트 핸들러
function initEventHandlers() {
  const selects = document.querySelectorAll("select");
  const options = document.querySelectorAll("option");
  const deleteBtn = document.querySelectorAll(".delete-btn");

  // 회원 role 수정
  selects.forEach(el => {
    el.addEventListener('change', changeRole);
  })

  options.forEach(el => {
    if (el.selected && el.value === "admin") {
      el.closest('select').classList.add('has-background-danger-light', 'has-text-danger');
      el.closest('select').classList.remove('has-background-link-light', 'has-text-link');
    }
  })

  // 회원 삭제 버튼 - 모달창 띄움
  deleteBtn.forEach(el => {
    el.addEventListener('click', deleteUser);
  })

  // 모달창 닫기
  closeBtn.forEach(el => {
    el.addEventListener('click', closeModal);
  })
}

// 회원 role 수정
async function changeRole(e) {
  const userId = e.target.id.slice(14);
  const role = e.target.value;

  try {
    await Api.patch('/api/adminRole', userId, { role });
    alert('권한이 수정되었습니다.');
    window.location.reload();
  } catch (err) {
    alert(`회원 정보 수정 과정에서 오류가 발생하였습니다: ${err.message}`);
    window.location.reload();
  }
}

// 회원 정보 삭제
async function deleteUser(e) {
  openModal(e);
  const userId = e.target.id.slice(10);

  // 모달창 확인 버튼 - 회원정보 삭제
  deleteCompleteBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await Api.delete('/api/adminDel', userId);
      alert('회원 정보가 안전하게 삭제되었습니다.');
      window.location.reload();
    } catch (err) {
      alert(`회원 정보 삭제 과정에서 오류가 발생하였습니다: ${err.message}`);
      window.location.reload();
    }
  })
}

// 모달창 열기 / 닫기
function openModal(e) {
  e.preventDefault();
  modal.classList.add("is-active");
}

function closeModal(e) {
  e.preventDefault();
  modal.classList.remove("is-active");
}