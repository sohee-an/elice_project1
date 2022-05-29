import { sidebar } from '../common/sidebar/sidebar.js'
import { changeNavbar, handleLogoutBtn } from '../common/navbar/navbar.js';
import { getCartItems, setCartItems, addToCart, removeFromCart} from '../localStorage.js';
import { addCommas, convertToNumber } from '../useful-functions.js';
import * as Api from '../api.js';

//import daum from 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';


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

async function handleSubmit(e) {
    e.preventDefault();

    const name = document.querySelector('#d-name').value;
    const phoneNumber= document.querySelector('#d-phoneNumber').value;
    const postcode = document.querySelector('#d-postcode').value;
    const address = document.querySelector('#d-address').value;
    const detailAddress = document.querySelector('#d-detail-address').value;
    const orderRequest = document.querySelector('#d-requests').value;

  
    if (!name || !phoneNumber || !postcode || !detailAddress || !address) {
        
      return alert(`주문 정보를 입력해주세요. ${name}님`);
    }
    
    if (localStorage.)
    // 회원가입 api 요청
    try {
        const cartItems = getCartItems().;


        const data = { 
            name,
            phoneNumber,
            address : {
                postalCode: postcode,
                address1: address,
                address2: detailAddress,
            },
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
  
function getPaymentInfo() {
    let items = getCartItems();

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