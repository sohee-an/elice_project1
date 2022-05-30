import { orderModel } from "../db";

class OrderService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    //상품 주문한거 db에 저장
    async addOrder(newOrder) {
        //객체에 할당함 // 
        const createdOrder = await this.orderModel.create(newOrder);
        return createdOrder;
    }

    async getUserOrder(userOrderId) {// 상품구매한 유저 아이디 들어감 
        // 상품 정보다 찾아옴. 유저 정보다 다 찾아옴
        const userOrder = await this.orderModel.findUserOrderAll(userOrderId);
        console.log(userOrder);
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1');
        console.log(userOrder[0].orderTime);
    }
}

const orderService = new OrderService(orderModel);

export { orderService }