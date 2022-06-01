import { sidebar } from '../../common/sidebar/sidebar.js'
import { changeNavbar, handleLogoutBtn } from '../../common/navbar/navbar.js';
// import * as Api from '../api.js';


sidebar();
changeNavbar();
handleLogoutBtn();

createOrderList();

// db 에서 유저의 주문내역 가져오기
async function getOrderList() {
    try{
        fetch(`/users`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then((res)=>res.json())
          .then((data)=>console.log(data));
    } catch(e){
        console.log(e);
        return { error: e.response.data.message || e.message };
    }

}

async function createOrderList() {
    // const orders = await getOrderList();
    await console.log(getOrderList());
    const orders = [{
        date: '2022-05-05',
        total: 2000000,
        state: '배송 준비중'
    }]
    // console.log(orders);

    const orderListElem = document.querySelector('#order-list');
    

    const listHeader = orderListElem.innerHTML;
    const orderList = orders.reduce((acc, cur) => {
        return acc + `<li id="item${cur.item}">
            <div class="o-list-main">
                <div class="o-date">${cur.date}</div> 
                <div class="o-info"> 주문 정보 </div> 
                <div class="o-price">${cur.total}</div> 
                <div class="o-state">${cur.state} <input type="button" value="주문 취소" class="del-order-btn"></div>
            </div>
     </li>
     `}, listHeader);
     orderListElem.innerHTML=orderList;

}