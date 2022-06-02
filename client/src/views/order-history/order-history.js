import { sidebar } from '../../common/sidebar/sidebar.js'
import { changeNavbar, handleLogoutBtn } from '../../common/navbar/navbar.js';
import { addCommas } from '../../useful-functions.js';
import * as Api from '../../api.js';


sidebar();
changeNavbar();
handleLogoutBtn();

createOrderList();


// db 에서 유저의 주문내역 가져오기
async function createOrderList() {
    // const orders = await getOrderList();
    const orders = await Api.get('/api/orders');
    console.log(orders)

    const orderListElem = document.querySelector('#order-list');


    const listHeader = orderListElem.innerHTML;
    const orderList = orders.reduce((acc, cur) => {
        let orderInfo = `${cur.products[0].product.name}`;
        if (cur.products.length > 1) orderInfo += ` 외  <strong>${cur.products.length - 1}</strong> 건`;

        const productListHeader = `<div class="product-header">
            <div class="p-img"></div>
            <div class="p-info">제품정보</div>
            <div class="p-quantity">수량</div>
            <div class="p-review">리뷰/별점 작성하기</div>
        </div>
        `;
        // 해당 주문 클릭시 보일 제품별 상세 내역
        let productList = cur.products.reduce((acc, item) => {
            return acc + ` <div class="product" id="product-${item.product._id}">
                <div class="p-img"><input type="image" class="productImg" src="/uploads/${item.product.image}" onclick="window.location.href='/products/#/product/${item.product._id}'"></div>
                <div class="p-info">${item.product.name} <br /> ${addCommas(item.product.price)} 원</div>
                <div class="p-quantity">${item.quantity}</div>
                <div class="p-review"><input type="button" class="reviewBtn" value="리뷰 작성하기"></div>
            </div>
            `
        }, productListHeader);

        let str = acc + `<li class="order" id="order-${cur._id}">
            <div class="o-list-main" id="main-${cur._id}">
                <div class="o-date" id="date-${cur._id}"> ${cur.orderTime}</div> 
                <div class="o-info" id="info-${cur._id}"> ${orderInfo} </div> 
                <div class="o-price" id="price-${cur._id}">${addCommas(cur.total)} 원</div> 
                <div class="o-state" id="state-${cur._id}">${cur.state} `;

        if (cur.state == '상품 준비중') {
            str += ` &nbsp <input type="button" value="주문 취소" class="cancel-order-btn" id="orderBtn-${cur._id}">`
        }
        str += `  </div>
            </div>
        </li>
        <div class="o-list-specific" id="specific-${cur._id}">${productList}</div>
        `
        return str;
    }, listHeader);
    orderListElem.innerHTML = orderList;

    handleAllEvent();

}

function handleAllEvent() {
    const cancelOrderBtn = document.querySelector(".cancel-order-btn");
    const orderElem = document.querySelectorAll(".order");

    cancelOrderBtn && cancelOrderBtn.addEventListener("click", async (e) => {
        const orderId = e.target.id.split('-')[1];
        await Api.delete("/api/orders/", orderId);
        alert('주문이 취소 되었습니다.');
        window.location.reload();
    })

    orderElem.forEach(item => item.addEventListener("click", (e) => {
        let targetIdElem = document.querySelector('#target_id');
        let before_id = targetIdElem.value;
        let target_id = e.target.id.split('-')[1];
        console.log(before_id + "  " + target_id);


        if (target_id == before_id) {
            const beforeElem = document.querySelector(`#specific-${before_id}`);
            beforeElem.classList.add("o-list-specific");
            targetIdElem.value = "";
            return;
        }
        if (targetIdElem.value) {  // 이미 선택된 주문내역이 있다면
            const beforeElem = document.querySelector(`#specific-${before_id}`);
            beforeElem.classList.add("o-list-specific");
        }

        targetIdElem.value = target_id;
        const targetElem = document.querySelector(`#specific-${target_id}`);
        targetElem.classList.remove("o-list-specific");
    }));
}