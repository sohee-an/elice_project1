import Products_screen from "./products_screen.js";

const router = ()=>{
  const main = document.getElementById("producItemContainer");
  main.innerHTML = Products_screen.render();
}
//페이지 로드 시
window.addEventListener('load',router)