import { sidebar } from '../common/sidebar/sidebar.js'
import { changeNavbar, handleLogoutBtn } from '../common/navbar/navbar.js';
import { getCartItems, setCartItems, addToCart, removeFromCart} from '../localStorage.js';
import { addCommas, convertToNumber } from '../useful-functions.js';
//import daum from 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';


sidebar();
changeNavbar();
handleLogoutBtn();

document.getElementById('findPostcode').addEventListener("click", DaumPostcode)
getPaymentInfo();

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