import { sidebar } from "../common/sidebar/sidebar.js";
import { changeNavbar, handleLogoutBtn } from "../common/navbar/navbar.js";
import * as Api from "../api.js";
sidebar();
changeNavbar();
handleLogoutBtn();

const switchBtn = document.querySelectorAll(".switch");
const submitBtn = document.querySelector(".button-submit");
const modal = document.querySelector(".modal");
const saveBtn = document.querySelector("#saveCompleteBtn");
const closeBtn = document.querySelectorAll(".close");

const fullName = document.querySelector("#name").value;
const password = document.querySelector("#password").value;
const passwordConfirm = document.querySelector("#password-confirm").value;
const postalCode = document.querySelector("#sample4_postcode").value;
const address1 = document.querySelector("#sample4_roadAddress").value;
const address2 = document.querySelector("#sample4_detailAddress").value;
const phoneNumber = document.querySelector("#phoneNumber").value;

// 스위치 기능
switchBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("password") ||
      e.target.classList.contains("address")
    ) {
      handleClassSwitch(e);
    } else {
      handleSwitch(e);
    }
  });
});

// 저장하기 버튼 클릭 시 모달창 띄움
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.add("is-active");
});

// 모달창 닫기
closeBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("is-active");
  });
});

// 모달창 저장 완료 버튼 클릭 시
saveBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (password !== passwordConfirm) {
    alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
  }

  try {
    const address = {
      postalCode: postalCode,
      address1: address1,
      address2: address2,
    };
    const data = { fullName, password, address, phoneNumber };
    const result = await Api.post("/api/users/:userId", data);

    // 업데이트 사항을 form에 표시

    // 토큰 삭제
    localStorage.removeItem("token");

    // 기본 페이지로 이동
    window.location.href = "/";
  } catch (err) {
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
});

function handleClassSwitch(e) {
  const password = document.querySelector(".password-container");
  const address = document.querySelector(".address-container");

  if (e.target.classList.contains("password")) {
    const input = password.querySelectorAll(".input-switch");
    main(input);
  } else {
    const input = address.querySelectorAll(".input-switch");
    main(input);
  }

  function main(input) {
    if (!e.target.classList.contains("active")) {
      input.forEach((el) => {
        el.disabled = false;
        el.focus();
        el.classList.add("active");
      });
      e.target.classList.add("active");
    } else {
      input.forEach((el) => {
        el.disabled = true;
        el.classList.remove("active");
      });
      e.target.classList.remove("active");
    }
  }
}

function handleSwitch(e) {
  const input = e.target.previousElementSibling;
  const checkbox = e.target.querySelector(".checkbox");

  if (!e.target.classList.contains("active")) {
    checkbox.checked = true;
    input.disabled = false;
    input.focus();
    input.classList.add("active");
    e.target.classList.add("active");
  } else {
    checkbox.checked = false;
    input.disabled = true;
    input.classList.remove("active");
    e.target.classList.remove("active");
  }
}
