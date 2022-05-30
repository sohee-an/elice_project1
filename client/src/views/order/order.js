import { sidebar } from '../common/sidebar/sidebar.js'
import { changeNavbar, handleLogoutBtn } from '../common/navbar/navbar.js';
import { getCartItems } from '../localStorage.js';
import { addCommas } from '../useful-functions.js';
//import jwt from 'jsonwebtoken';
import * as Api from '../api.js';


sidebar();
changeNavbar();
handleLogoutBtn();


const purchaseBtn = document.getElementById('purchase-btn');
const findPostcodeBtn = document.getElementById('findPostcode');

getPaymentInfo();
addAllEvents();


function addAllEvents() {
    findPostcodeBtn.addEventListener("click", DaumPostcode);
    purchaseBtn.addEventListener("click", handleSubmit);
}

function getPaymentInfo() {
    let items = getCartItems();
    console.log(items);

    const amountElem = document.getElementById('d-amount');
    const priceElem = document.getElementById('d-price');
    const shippingElem = document.getElementById('d-shipping');
    const totalElem = document.getElementById('d-total-price');

    let itemAmount = items.reduce((acc, cur) => acc + Number(cur.quantity), 0);
    let itemPrice = items.reduce((acc, cur) => acc + Number((cur.price * cur.quantity)), 0);
    let shippingPrice = itemPrice? 3000:0;
    let totalPrice = itemPrice + shippingPrice;

    amountElem.innerText = addCommas(itemAmount)+'개';
    priceElem.innerText = '$'+addCommas(itemPrice);
    shippingElem.innerText = '$'+addCommas(shippingPrice);
    totalElem.innerText = '$'+addCommas(totalPrice);
}


function getUseridFromJwt(){
    const userToken = localStorage.getItem(token);
    console.log(userToken);

    if(!userToken){ // 유저 토큰이 없을 경우
        console.log('서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음');
        res.status(403).json({
            result: 'forbidden-approach',
            reason: '로그인한 유저만 사용할 수 있는 서비스입니다.',
        });
        window.location.href='/login';
        return;
    }
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const jwtDecoded = jwt.verify(userToken, secretKey);

    const userId = jwtDecoded.userId;

    return userId;
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
    const postcode = document.querySelector('#d-postcode').value;
    const address = document.querySelector('#d-address').value;
    const detailAddress = document.querySelector('#d-detail-address').value;
    const orderRequest = document.querySelector('#d-requests').selected;

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
        const cartItems = getCartItems().filter(e=>{ return {productId: e.id, quantity: e.quantity}; });
        const userId = getUseridFromJwt();

        const data = { 
            userId,
            name,
            phoneNumber,
            address : {
                postalCode: postcode,
                address1: address,
                address2: detailAddress,
            },
            orderRequest,
            cartItems : cartItems
        };
        
        await Api.post('/api/order', data);

        alert(`주문 및 결제가 완료되었습니다.`);

        // 로그인 페이지 이동
        window.location.href = './complete';
    } catch (err) {
      console.error(err.stack);
      alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
    }
  }
  

/* 다음 우편번호 서비스 api 사용 코드 */
function DaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('postcode').value = data.zonecode;
            document.getElementById('address').value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById('detail-address').focus();
        }
    }).open();
}