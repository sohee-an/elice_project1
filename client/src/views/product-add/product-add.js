import { sidebar } from "../../common/sidebar/sidebar.js";
import { changeNavbar, handleLogoutBtn } from "../../common/navbar/navbar.js";
sidebar();
changeNavbar();
handleLogoutBtn();

const titleInput = document.querySelector('#titleInput');
const largeCategoryInput = document.querySelector('#largeCategory');
const mediumCategoryInput = document.querySelector('#mediumCategory');
const brandInput = document.querySelector('#brandInput');
const shortDescInput = document.querySelector('#shortDescInput');
const imageInput = document.querySelector("#imageInput");
const priceInput = document.querySelector('#priceInput');

const searchKeywordInput = document.querySelector("#searchKeywordInput");
const fileNameSpan = document.querySelector("#fileNameSpan");
const addKeywordBtn = document.querySelector("#addKeywordBtn");
const keywordContainer = document.querySelector("#keywordContainer");
const submitBtn = document.querySelector("#submitBtn");

// 사진 업로드 하면 fileNameSpan.innerText = 파일 이름
imageInput.addEventListener("input", () => {
  fileNameSpan.innerText = imageInput.value.substr(12);
})

// 검색 키워드 추가 버튼
addKeywordBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (searchKeywordInput.value) {
    const tagId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
    keywordContainer.innerHTML += `
      <div class="control" id="${tagId}">
        <div class="tags has-addons">
          <span class="tag is-link is-light">${searchKeywordInput.value}</span>
          <a class="tag is-link is-light is-delete"></a>
        </div>
      </div>
    `
    searchKeywordInput.value = "";
    initDeleteHandler();
  }
})

// 검색 키워드 삭제 버튼
function initDeleteHandler() {
  const deleteTagBtns = document.querySelectorAll(".tag.is-delete");
  deleteTagBtns.forEach(el => {
    el.addEventListener("click", (e) => {
      e.target.closest(".control").remove()
    })
  })
}