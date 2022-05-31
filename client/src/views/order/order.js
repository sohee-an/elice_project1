import { sidebar } from '../common/sidebar/sidebar.js'
import { changeNavbar, handleLogoutBtn } from '../common/navbar/navbar.js';
import { getCartItems,  setCartItems, getOrderInfo, setOrderInfo} from '../localStorage.js';
import { addCommas } from '../useful-functions.js';
import * as Api from '../api.js';


sidebar();
changeNavbar();
handleLogoutBtn();

const amountElem = document.getElementById('d-amount');
const priceElem = document.getElementById('d-price');
const shippingElem = document.getElementById('d-shipping');
const totalElem = document.getElementById('d-total-price');
const purchaseBtn = document.getElementById('purchase-btn');

const nameElem = document.querySelector('#d-name');
const phoneNumberElem = document.querySelector('#d-phoneNumber');
const postcodeElem = document.querySelector('#sample4_postcode');
const addressElem = document.querySelector('#sample4_roadAddress');
const detailAddressElem = document.querySelector('#sample4_detailAddress');
const orderRequesElem = document.querySelector('#d-requests');
const userInputElem = document.querySelector('#d-requests-input');


/** 전역변수로 말고 재구현 **/
let totalPrice=0;

getPaymentInfo();
callOrderInfo();
handleAllEvent();


function handleAllEvent() {
    purchaseBtn.addEventListener("click", handleSubmit);
    orderRequesElem.addEventListener("change", handleSelect);
    window.addEventListener('beforeunload', storeOrderInfo);
}

function getPaymentInfo() {
    let items = getCartItems();

    let itemAmount = items.reduce((acc, cur) => acc + Number(cur.quantity), 0);
    let itemPrice = items.reduce((acc, cur) => acc + Number((cur.price * cur.quantity)), 0);
    let shippingPrice = itemPrice? 3000:0;
    totalPrice = itemPrice + shippingPrice;

    amountElem.innerText = addCommas(itemAmount)+'개';
    priceElem.innerText = '$'+addCommas(itemPrice);
    shippingElem.innerText = '$'+addCommas(shippingPrice);
    totalElem.innerText = '$'+addCommas(totalPrice);
}

function callOrderInfo() {
    const orderInfo = getOrderInfo();

    nameElem.value= orderInfo.name;
    phoneNumberElem.value= orderInfo.phoneNumber;
    postcodeElem.value= orderInfo.postcode;
    addressElem.value= orderInfo.address;
    detailAddressElem.value= orderInfo.detailAddress;
}

function storeOrderInfo() {

    let name = nameElem.value;
    let phoneNumber = phoneNumberElem.value;
    let postcode = postcodeElem.value;
    let address = addressElem.value;
    let detailAddress = detailAddressElem.value;
    let orderRequest = orderRequesElem.value;

    const orderInfo = {
        name,
        phoneNumber,
        postcode,
        address,
        detailAddress,
        orderRequest
    }
    setOrderInfo(orderInfo);
}


/**** 추가 구현
 * 입력된 값이 형태에 맞는지 확인
 * 
 * 
 */
async function handleSubmit(e) {
    e.preventDefault();

    const name = document.querySelector('#d-name').value;
    const phoneNumber= document.querySelector('#d-phoneNumber').value;
    const postcode = document.querySelector('#sample4_postcode').value;
    const address = document.querySelector('#sample4_roadAddress').value;
    const detailAddress = document.querySelector('#sample4_detailAddress').value;
    const orderRequest = document.querySelector('#d-requests').value;
    if(orderRequest == 'userInput') orderRequest = userInputElem.value;

    console.log(orderRequest);
    if(!localStorage.getItem('token')){ // 로그인 안되어있을 경우
        window.location = '/login';
        return;
    }

    if (!name || !phoneNumber || !postcode || !detailAddress || !address) { // 주문 정보 필드 입력이 완료되지 않았을 경우
        
      return alert(`주문 정보를 입력해주세요.`);
    }
    
    if (getCartItems().length==0) {   // 장바구니에 물건이 담겨있지 않는 경우
        alert(`구매할 제품이 없습니다. 제품을 선택해주세요.`);
        window.location.href ='/products';
        return;
    }

   
    try {
        const cartItems = getCartItems().map( item => { return {id: item.id, quantity: item.quantity }});
        console.log(cartItems);

        const data = { 
            name,
            phoneNumber,
            address : {
                postalCode: postcode,
                address1: address,
                address2: detailAddress,
            },
            orderRequest,
            cartItems,
            totalPrice
        };

        console.log(data);
        
        await Api.post('/api/orders', data);

        alert(`주문 및 결제가 완료되었습니다.`);
        setCartItems([]);

        // 로그인 페이지 이동
        window.location.href = './complete';
    } catch (err) {
      console.error(err.stack);
      alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
}
  
function handleSelect() {
    if(orderRequesElem.value=="userinput"){
        userInputElem.style.display = "block";
        return;
    }
    userInputElem.style.display = "none";

}
