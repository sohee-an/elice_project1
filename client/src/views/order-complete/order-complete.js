import { sidebar } from '../common/sidebar/sidebar.js'
import { changeNavbar, handleLogoutBtn } from '../common/navbar/navbar.js';


sidebar();
changeNavbar();
handleLogoutBtn();

const historyBtnElem = document.querySelector("#history-btn");
const continueBtnElem= document.querySelector("#continue-btn");

function addE