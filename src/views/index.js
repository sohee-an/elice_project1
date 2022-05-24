import Products_screen from "./products_screen.js";

const router = ()=>{
  const main = document.getElementById("producItemContainer");
  main.innerHTML = Products_screen.render();
}

window.addEventListener('load',router)