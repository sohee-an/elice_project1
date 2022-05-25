// products.html과 연결
import { sidebar } from './sidebar/sidebar.js';
import Products_screen from "./products_screen.js";

sidebar();
const routes = {
  "/": Products_screen,
  "/product/:product_id": Products_screen,
}

const router = ()=>{
  const main = document.getElementById("producItemContainer");
  main.innerHTML = Products_screen.render();
}
//페이지 로드 시
window.addEventListener('load',router)