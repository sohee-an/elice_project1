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
    const orders =  await Api.get('/api/orders');
    console.log(orders)

    const orderListElem = document.querySelector('#order-list');
    

    const listHeader = orderListElem.innerHTML;
    const orderList = orders.reduce((acc, cur) => {
        let orderInfo = `${cur.products[0]}`;
        if(cur.products.length>1) orderInfo += ` 외  <strong>${cur.products.length-1}</strong> 건`;

        return acc + `<li id="item${cur.item}">
            <div class="o-list-main">
                <div class="o-date"> ${cur.orderTime}</div> 
                <div class="o-info"> ${orderInfo} </div> 
                <div class="o-price">${addCommas(cur.total)}</div> 
                <div class="o-state">${cur.state} 
                    <input type="button" value="주문 취소" class="cancel-order-btn" id="order-${cur._id}">
                </div>
            </div>
     </li>
     `}, listHeader);
     orderListElem.innerHTML=orderList;
    
     handleAllEvent();

}

async function handleAllEvent(){
    const cancelOrderBtn = document.querySelector(".cancel-order-btn");
    const orderElem = document.querySelectorAll(".o-list-main");

    await cancelOrderBtn.addEventListener("click", (e)=>{
        const orderId=e.target.id.split('-')[1];
        Api.delete("/api/orders", orderId);
    })
}