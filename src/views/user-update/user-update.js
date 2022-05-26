import { sidebar } from "../sidebar/sidebar.js";
import { changeNavbar, handleLogoutBtn } from "../navbar/navbar.js";
sidebar();
changeNavbar();
handleLogoutBtn();

const switchBtn = document.querySelectorAll(".switch");
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
