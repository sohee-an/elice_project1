import { sidebar } from '../../common/sidebar/sidebar.js'
import { changeNavbar, handleLogoutBtn } from '../../common/navbar/navbar.js';
import { addCommas } from '../../useful-functions.js';
import * as Api from '../../api.js';


sidebar();
changeNavbar();
handleLogoutBtn();

createOrderList();

// 관리자 로그인 X -> 접근 불가
if (localStorage.getItem("role") !== "admin") {
    alert('관리자 전용 페이지입니다.');
    window.location.href = "/";
  }

// db 에서 유저의 주문내역 가져오기
async function createOrderList() {
    // const orders = await getOrderList();
    try {
        let orders = await Api.get('/api/orders/admin');
        orders = orders.reverse();
        console.log(orders)     ///  ===>>>배포시 삭제

        const orderListElem = document.querySelector('#order-list');

<<<<<<< HEAD
    const listHeader = `<li class="myorder-list-header"> 
        <div class="o-list-header">
            <div class="o-date">주문일</div> 
            <div class="o-user">주문한 유저</div>
            <div class="o-info">주문정보</div> 
            <div class="o-price">결제금액</div> 
            <div class="o-state">상태</div>
        </div>
    </li>`
    const orderList = orders.reduce((acc, cur) => {
        let orderInfo = `${cur.products[0].product.name}`;
        if(cur.products.length>1) orderInfo += ` 외  <strong>${cur.products.length-1}</strong> 건`;
=======
>>>>>>> 0d68b8f24d73491b4b466e5c2ceed76f137f57bc

        const listHeader = orderListElem.innerHTML;
        const orderList = orders.reduce((acc, cur) => {
            let orderInfo = `${cur.products[0].product.name}`;
            if (cur.products.length > 1) orderInfo += ` 외  <strong>${cur.products.length - 1}</strong> 건`;

            const productListHeader = `<div class="product-header">
            주문 상품 정보
        </div>
        `;
            // 해당 주문 클릭시 보일 제품별 상세 내역
            let productList = cur.products.reduce((acc, item) => {
                return acc + `<div class="product-div" id="product-${item.product._id}">
                <div class="p-img">
                    <input type="image" class="productImg" src="/uploads/${item.product.image}" onclick="window.location.href='/products/#/product/${item.product._id}'">
                </div>
                <div class="p-contents">    
                    <div class="p-info"> <p class="p-brand"> ${item.product.brand} </p> <strong > ${item.product.name} </strong> <br /> ${addCommas(item.product.price)} 원 / ${item.quantity} 개</div>
                </div>
            </div>
            `
            }, productListHeader);

<<<<<<< HEAD
        // 전체 주문내역
        let str = acc + `<li class="order" id="order-${cur._id}">
=======
            let str = acc + `<li class="order" id="order-${cur._id}">
>>>>>>> 0d68b8f24d73491b4b466e5c2ceed76f137f57bc
            <div class="o-list-main" id="main-${cur._id}">
                <div class="o-user" id="date-${cur._id}"> ${cur.orderTime}</div> 
                <div class="o-date" id="date-${cur._id}"> ${cur.userId.email}</div> 
                <div class="o-info" id="info-${cur._id}"> ${orderInfo} </div> 
                <div class="o-price" id="price-${cur._id}">${addCommas(cur.total)} 원</div> 
                <div class="o-state" id="state-${cur._id}">${cur.state} `;

            if (cur.state == '상품 준비중') {
                str += ` &nbsp <input type="button" value="주문 취소" class="cancel-order-btn" id="orderBtn-${cur._id}">`
            }
            str += `  </div>
            </div>
        </li>
        <div class="o-list-specific" id="specific-${cur._id}">
            ${productList}
            <div class="product-footer">
                <div class="o-name"> 받는사람: ${cur.name}</div>
                <div class="o-address"> 주소: ${cur.address.address1} ${cur.address.address2} (${cur.address.postalCode})</div>
                <div class="o-name"> 배송 요청사항: ${cur.orderRequest}</div>
            </div>
        </div>
        `
            return str;
        }, listHeader);
        orderListElem.innerHTML = orderList;


    } catch (err) {
        console.log("error message: " + err.message);
    }

    handleAllEvent();
}

function handleAllEvent() {
    const cancelOrderBtn = document.querySelector(".cancel-order-btn");
    const orderElem = document.querySelector("#order-list");

<<<<<<< HEAD
    // 주문 취소하기
    cancelOrderBtn.addEventListener("click", async (e)=>{   
        const orderId=e.target.id.split('-')[1];
=======
    cancelOrderBtn.addEventListener("click", async (e) => {   // 주문 취소하기
        const orderId = e.target.id.split('-')[1];
        const order = await Api.get('/api/orders');
        const result = await jQuery.ajax({
            url: "/api/payments/cancel", // 예: http://www.myservice.com/payments/cancel
            type: "POST",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({
                merchant_uid: orderId, // 예: ORD20180131-0000011
                cancel_request_amount: order.total, // 환불금액
                reason: "테스트 결제 환불", // 환불사유
            }),
        })
        console.log(result);
>>>>>>> 0d68b8f24d73491b4b466e5c2ceed76f137f57bc
        await Api.delete("/api/orders", orderId);
        alert("주문취소 및 환불 완료");
        window.location.reload();
    })

<<<<<<< HEAD
    // 주문 내역 토글 형태로 띄우기
    orderElem.addEventListener("click", (e)=>{
=======
    orderElem.forEach(item => item.addEventListener("click", (e) => {
>>>>>>> 0d68b8f24d73491b4b466e5c2ceed76f137f57bc
        let targetIdElem = document.querySelector('#target_id');
        let before_id = targetIdElem.value;
        let target_id = e.target.id.split('-')[1];
        console.log(before_id + "  " + target_id);

<<<<<<< HEAD
        if(target_id==before_id){   // 해당 토글 다시 클릭시
=======

        if (target_id == before_id) {
>>>>>>> 0d68b8f24d73491b4b466e5c2ceed76f137f57bc
            const beforeElem = document.querySelector(`#specific-${before_id}`);
            beforeElem.classList.add("o-list-specific");
            targetIdElem.value = "";
            return;
        }
<<<<<<< HEAD
        if(targetIdElem.value){  // 이전에 띄워진 토글 접기
=======
        if (targetIdElem.value) {  // 이미 선택된 주문내역이 있다면
>>>>>>> 0d68b8f24d73491b4b466e5c2ceed76f137f57bc
            const beforeElem = document.querySelector(`#specific-${before_id}`);
            beforeElem.classList.add("o-list-specific");
        }

        // 클릭한 토글 열기
        targetIdElem.value = target_id;
        const targetElem = document.querySelector(`#specific-${target_id}`);
        targetElem.classList.remove("o-list-specific");
    })

}