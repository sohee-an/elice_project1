import { sidebar } from '../common/sidebar/sidebar.js'
import { changeNavbar, handleLogoutBtn } from '../common/navbar/navbar.js';
import { getCartItems, storeOrderInfo } from '../localStorage.js';
import { addCommas } from '../useful-functions.js';
import * as Api from '../api.js';


sidebar();
changeNavbar();
handleLogoutBtn();


const purchaseBtn = document.getElementById('purchase-btn').addEventListener("click", handleSubmit);


getPaymentInfo();



function getPaymentInfo() {
    let items = getCartItems();
    console.log(items);

    const amountElem = document.getElementById('d-amount');
    const priceElem = document.getElementById('d-price');
    const shippingElem = document.getElementById('d-shipping');
    const totalElem = document.getElementById('d-total-price');

    let itemAmount = items.reduce((acc, cur) => acc + Number(cur.quantity), 0);
    let itemPrice = items.reduce((acc, cur) => acc + Number((cur.price * cur.quantity)), 0);
    let shippingPrice = itemPrice ? 3000 : 0;
    let totalPrice = itemPrice + shippingPrice;

    amountElem.innerText = addCommas(itemAmount) + '개';
    priceElem.innerText = '$' + addCommas(itemPrice);
    shippingElem.innerText = '$' + addCommas(shippingPrice);
    totalElem.innerText = '$' + addCommas(totalPrice);
}


/**** 추가 구현
 * 입력된 값이 형태에 맞는지 확인
 * 
 * 
 */
async function handleSubmit(e) {
    e.preventDefault();

    const name = document.querySelector('#d-name').value;
    const phoneNumber = document.querySelector('#d-phoneNumber').value;
    const postcode = document.querySelector('#sample4_postcode').value;
    const address = document.querySelector('#sample4_roadAddress').value;
    const detailAddress = document.querySelector('#sample4_detailAddress').value;
    const orderRequest = document.querySelector('#d-requests').value;

    console.log(orderRequest);
    if (!localStorage.getItem('token')) { // 로그인 안되어있을 경우
        window.location = '/login';
        return;
    }

    if (!name || !phoneNumber || !postcode || !detailAddress || !address) { // 주문 정보 필드 입력이 완료되지 않았을 경우

        return alert(`주문 정보를 입력해주세요.`);
    }

    if (getCartItems().length == 0) {   // 장바구니에 물건이 담겨있지 않는 경우
        alert(`구매할 제품이 없습니다. 제품을 선택해주세요.`);
        window.location.href = '/products';
        return;
    }

    try {
        const cartItems = getCartItems().map(e => { return { productId: e.id, quantity: e.quantity }; });

        const data = {
            name,
            phoneNumber,
            address: {
                postalCode: postcode,
                address1: address,
                address2: detailAddress,
            },
            orderRequest,
            cartItems: cartItems
        };


        console.log(data);

        await Api.post('/api/orders', data);

        alert(`주문 및 결제가 완료되었습니다.`);

        // 로그인 페이지 이동
        window.location.href = '/complete';
    } catch (err) {
        console.error(err.stack);
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
}

