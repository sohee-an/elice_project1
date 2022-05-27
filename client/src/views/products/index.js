// products.html과 연결
import { sidebar } from '../common/sidebar/sidebar.js';
import Products_screen from "./products_screen.js";
import { parseRequestUrl } from './utils.js';
import ProductScreen from './screens/ProductScreen.js';
import Error404Screen from './screens/Error404Screen.js';

sidebar();
const routes = {
  "/": Products_screen,
  "/product/:id": ProductScreen,
}

const router = async () => {
  const request = parseRequestUrl();
  console.log(request)
  const parseUrl = (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');

  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  const main = document.getElementById("producItemContainer");
  main.innerHTML = await screen.render();
}
//페이지 로드 시
window.addEventListener('load', router);
window.addEventListener('hashchange', router);