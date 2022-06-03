// import * as Api from '/api.js'
import { sidebar } from '../common/sidebar/sidebar.js'
import { changeNavbar, handleLogoutBtn } from '../common/navbar/navbar.js';
import { getCartItems, setCartItems, addToCart, removeFromCart } from '../localStorage.js';
import { addCommas, convertToNumber } from '../useful-functions.js';

sidebar();
changeNavbar();
handleLogoutBtn();

const itemListElem = document.getElementById("item-list");
document.getElementById("purchase-btn").addEventListener("click", async (e) => {
    e.preventDefault();

    if (!localStorage.getItem('token')) {  // 로그인 되어있는 경우
        alert('로그인이 필요합니다.');
        window.location.href = "/login";
    } else if (getCartItems().length == 0) {
        alert('구매할 물건을 선택하세요.');
        window.location.href = "/?beforePage='/'";
    } else {
        window.location.href = "/order";
    }

})

createItemList();
updateItemList();
deleteItem();


// 로컬 스토리지 장바구니에 담은 내역 화면에 불러오기
function createItemList() {
    let items = getCartItems();
    console.log(items);
    let newItems = ``;
    if (items.length == 0) newItems = `<li>장바구니가 비어있습니다.</li>`;
    else newItems = items.reduce((acc, cur) => {
        return acc + `<li id="item${cur.item}">
        <div class="item"> 
            <div> <input type="checkbox" class="checked" id="checkbox-${cur.id}" checked/> </div>
            <input type="image" class="item-img" src="/uploads/${cur.image}" onclick="window.location.href='/products/#/product/${cur.id}'">
            <div class="item-info">
                <p>${cur.name}</p>
                <div class="quantity">
                    <input type="button" value="-" class="minus-btn" />
                    <input type="number" class="quantity-input" min="1" max="50" value="${cur.quantity}"/>
                    <input type="button" value="+" class="plus-btn" />
                </div>
            </div>
            <div class="item-price">
                <p>${addCommas(cur.price)} 원</p> X <p class="p-quantity">${cur.quantity}개</p> = <p class="p-price"> ${addCommas(cur.price * cur.quantity)} 원</p>
            </div>
            <input type="hidden" class="item-id" name="itemId" value="${cur.id}">
        </div>
    </li>
    `}, ``);
    itemListElem.innerHTML = newItems;
    getPaymentInfo();

}

// 물건 수량 변경 시 화면에 업데이트
function updateItemList() {
    let items = getCartItems();

    const quantityControlElem = document.querySelectorAll(".item");
    quantityControlElem.forEach(elem => {

        const minusElem = elem.querySelector('.minus-btn');
        const plusElem = elem.querySelector('.plus-btn');
        const inputElem = elem.querySelector('.quantity-input');
        const elem_id = elem.querySelector('.item-id').value;   // 해당 아이템 아이디
        const quantityElem = elem.querySelector('.p-quantity');
        const priceElem = elem.querySelector('.p-price');

        let item = items.find(e => e.id == elem_id);

        minusElem.addEventListener("click", () => {
            if (inputElem.value > 1) {   // 아이템이 1개 이상일 때 수량 감소가능
                inputElem.value--;
                item.quantity--;
                addToCart(item);
                getPaymentInfo();
                quantityElem.innerText = `${addCommas(item.quantity)}개`;
                priceElem.innerText = `${addCommas(item.quantity * item.price)}개`;
            }
        })
        plusElem.addEventListener("click", () => {
            if (inputElem.value < 100) {   // 아이템이 100개 이하일 때 수량 증가가능
                inputElem.value++;
                item.quantity++;
                addToCart(item);
                getPaymentInfo();
                quantityElem.innerText = `${addCommas(item.quantity)}개`;
                priceElem.innerText = `${addCommas(item.quantity * item.price)}개`;
            }
        })
    })
}


// 체크박스, 전체삭제, 선택삭제 클릭 시 로컬스토리지와 화면에 반영
function deleteItem() {

    const selectAllElem = document.querySelector('#select-all');
    const deleteAllElem = document.querySelector('#delete-all');
    const deleteSelectedElem = document.querySelector('#delete-selected');

    // [ ] 체크박스 클릭 시
    selectAllElem.addEventListener('click', () => {
        const allItemElem = document.querySelectorAll('.checked');
        allItemElem.forEach(e => {
            e.checked = selectAllElem.checked;
        })
    })


    // 모든 상품 삭제시 -> 경고 창 확인 클릭시 장바구니 비우기
    deleteAllElem.addEventListener('click', () => {
        if (confirm("장바구니의 모든 상품을 삭제합니다.")) {
            setCartItems([]);
            getPaymentInfo();
            itemListElem.innerHTML = `<li>장바구니가 비어있습니다.</li>`;
        }
    })

    // 선택한 상품 삭제
    deleteSelectedElem.addEventListener('click', () => {
        const allItemElem = document.querySelectorAll('.checked');
        allItemElem.forEach(e => {
            if (e.checked) {
                removeFromCart(e.id.split('-')[1]);
                createItemList();
            }
        })
        if (getCartItems.empty()) itemListElem.innerHTML = `<li>장바구니가 비어있습니다.</li>`;
    })


}

// 결제 정보 보여주기 
/** 추가 구현 ***
 * 결제 정보 암호화 저장
 * 
 */
function getPaymentInfo() {
    let items = getCartItems();

    const amountElem = document.getElementById('p-amount');
    const priceElem = document.getElementById('p-price');
    const shippingElem = document.getElementById('p-shipping');
    const totalElem = document.getElementById('p-total-price');

    let itemAmount = items.reduce((acc, cur) => acc + Number(cur.quantity), 0);
    let itemPrice = items.reduce((acc, cur) => acc + Number((cur.price * cur.quantity)), 0);
    let shippingPrice = itemPrice ? 100 : 0;
    let totalPrice = itemPrice + shippingPrice;

    amountElem.innerText = addCommas(itemAmount) + '개';
    priceElem.innerText = addCommas(itemPrice) + ' 원';
    shippingElem.innerText = addCommas(shippingPrice) + ' 원';
    totalElem.innerText = addCommas(totalPrice) + ' 원';
}

