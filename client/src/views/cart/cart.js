import { addCommas, convertToNumber } from '../useful-functions.js';
// import * as Api from '/api.js'
import { sidebar } from '../common/sidebar/sidebar.js'
import { changeNavbar, handleLogoutBtn } from '../common/navbar/navbar.js';
sidebar();
changeNavbar();
handleLogoutBtn();

const itemListElem = document.getElementById("item-list");
const purchaseBtnElem = document.getElementById("purchase-btn");

/** Needed
 * local storage와 연결 필요
 */

const items = 

createItemList();
updateItemList();
deleteItem();


// 아이템 렌더링을 위한 div 생성
/** 추가 구현
 * 아이템 개수 +, - 기능 ==> 
 * 아이템 삭제 기능
 */
function createItemList() {

    let newItems = ``;
    if (items.length == 0) newItems = `<li>장바구니가 비어있습니다.</li>`;
    else newItems = items.reduce((acc, cur) => {
        return acc + ` <li id="item${cur.item}">
        <div class="item"> 
            <div> <input type="checkbox" class="checked" id="checkbox-${cur._id}" checked/> </div>
            
            <input type="image" class="item-img" src="${cur.image}">
            <div class="item-info">
                <p>${cur.name}</p>
                <div class="quantity">
                    <input type="button" value="-" class="minus-btn" id="minus-${cur._id}" />
                    <input type="number" class="quantity-input" id="quantity-${cur._id}" min="1" max="50" value="${cur.quantity}"/>
                    <input type="button" value="+" class="plus-btn" id="plus-${cur._id}" />
                </div>
            </div>
            <div class="item-price">
                <p>${cur.price}원</p> X <p>${cur.quantity}개</p> = <p> ${cur.price * cur.quantity}원 </p>
            </div>
        </div>
    </li>
    `}, ``);
    itemListElem.innerHTML = newItems;
    getPaymentInfo();

}

function updateItemList() {
    const quantityControlElem = document.querySelectorAll(".quantity");
    quantityControlElem.forEach(elem => {

        const minusElem = elem.querySelector('.minus-btn');
        const plusElem = elem.querySelector('.plus-btn');
        const inputElem = elem.querySelector('.quantity-input');
        const elem_id = inputElem.id.split('-')[1];   // 해당 아이템 아이디


        minusElem.addEventListener("click", () =>{
            if(inputElem.value > 1){   // 아이템이 1개 이상일 때 수량 감소가능
                items.find( e => e._id==elem_id ).quantity--;
                inputElem.value--;
                getPaymentInfo();
            }
        })
        plusElem.addEventListener("click", () =>{
            if(inputElem.value < 100){   // 아이템이 100개 이하일 때 수량 증가가능
                items.find( e => e._id==elem_id ).quantity++;

                inputElem.value++;
                getPaymentInfo();
            }
        })
    })
}

function deleteItem() {
    const selectAllElem = document.querySelector('#select-all');
    const deleteAllElem = document.querySelector('#delete-all');
    const deleteSelectedElem = document.querySelector('#delete-selected');
    const allItemElem = document.querySelectorAll('.checked');

    // [ ] 체크박스 클릭 시
    selectAllElem.addEventListener('click', ()=> {
        allItemElem.forEach(e=>{
            e.checked=selectAllElem.checked;
        }) 
    })

    // 모든 상품 삭제시 -> 경고 창
    deleteAllElem.addEventListener('click', ()=> {
        if(confirm("장바구니의 모든 상품을 삭제합니다.")){
            items=[];
            itemListElem.innerHTML=`장바구니가 비어있습니다.`;
            getPaymentInfo();
        }
    })

    // 선택한 상품 삭제


}

// 결제 정보 보여주기 
/** 추가 구현 ***
 * 결제 정보 암호화 저장
 * 
 */
function getPaymentInfo() {
    const amountElem = document.getElementById('p-amount');
    const priceElem = document.getElementById('p-price');
    const shippingElem = document.getElementById('p-shipping');
    const totalElem = document.getElementById('p-total-price');

    let itemAmount = items.reduce((acc, cur) => acc + Number(cur.quantity), 0);
    let itemPrice = items.reduce((acc, cur) => acc + Number((cur.price * cur.quantity)), 0);
    let shippingPrice = 3000;
    let totalPrice = itemPrice + shippingPrice;

    amountElem.innerText = addCommas(itemAmount);
    priceElem.innerText = addCommas(itemPrice);
    shippingElem.innerText = addCommas(shippingPrice);
    totalElem.innerText = addCommas(totalPrice);
}

async function purchaseBtn(e) {
    e.preventDefault();
  
    if(localStorage.getItem('token')){  // 로그인 되어있는 경우

    }
    else {
        alert('구매를 위해서는 로그인해야 합니다.')
    }
  
}