import { sidebar } from "../../common/sidebar/sidebar.js";
import { changeNavbar, handleLogoutBtn } from "../../common/navbar/navbar.js";
sidebar();
changeNavbar();
handleLogoutBtn();

const imageInput = document.querySelector("#imageInput");
const searchKeywordInput = document.querySelector("#searchKeywordInput");
const fileNameSpan = document.querySelector("#fileNameSpan");
const addKeywordBtn = document.querySelector("#addKeywordBtn");
const keywordContainer = document.querySelector("#keywordContainer");
const submitBtn = document.querySelector("#submitBtn");
const submitForm = document.querySelector("#submitForm");

// 관리자 로그인 X -> 접근 불가
if (localStorage.getItem("role") !== "admin") {
  alert('관리자 전용 페이지입니다.');
  window.location.href = "/";
}

submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData(submitForm);

    const name = formData.get("name")
    const price = formData.get("price");
    const description = formData.get("description");
    const brand = formData.get("brand");
    const largeCategory = formData.get("largeCategory");
    const mediumCategory = formData.get("mediumCategory");
    const img = formData.get("img");

    if (!name || !price || !description || !brand || !largeCategory || !mediumCategory || !img) {
      return alert('상품 정보를 모두 기입해 주세요')
    }

    await fetch("/api/products/register", {
      method: "POST",
      body: formData
    })

    alert('상품 추가가 완료되었습니다.');
    window.location.href = "/admin";

  } catch (err) {
    alert(`상품 추가 과정에서 오류가 발생하였습니다: ${err.message}`);
  }
})

// 사진 업로드 하면 fileNameSpan.innerText = 파일 이름
imageInput.addEventListener("input", () => {
  fileNameSpan.innerText = imageInput.value.substr(12);
})

// 검색 키워드 추가 버튼
// addKeywordBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   if (searchKeywordInput.value) {
//     const tagId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6);
//     keywordContainer.innerHTML += `
//       <div class="control" id="${tagId}">
//         <div class="tags has-addons">
//           <span class="tag is-link is-light">${searchKeywordInput.value}</span>
//           <a class="tag is-link is-light is-delete"></a>
//         </div>
//       </div>
//     `
//     searchKeywordInput.value = "";
//     initDeleteHandler();
//   }
// })

// 검색 키워드 삭제 버튼
// function initDeleteHandler() {
//   const deleteTagBtns = document.querySelectorAll(".tag.is-delete");
//   deleteTagBtns.forEach(el => {
//     el.addEventListener("click", (e) => {
//       e.target.closest(".control").remove()
//     })
//   })
// }