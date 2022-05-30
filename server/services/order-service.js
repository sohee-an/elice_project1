import { orderModel } from "../db";

class OrderService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    //상품 주문한거 db에 저장
    async addOrder(newOrder){
        //객체에 할당함 // 
        const { userId,name, phoneNumber,cartItems,total,address,orderRequest,orderTime} = newOrder;
        
        
       // CartItems를  상품아이디랑 수량을 넣음 
        for(let i =0; i <cartItems.length; i++){
            const productId = cartItems[i].productId;
            const quantity=Number(cartItems[i].quantity);

            const newUserOrder= {userId,name,phoneNumber,productId,quantity,total,address,orderRequest,orderTime};
            console.log(" 모음!!!!!!!!!!!!!")
            console.log(newUserOrder);
           const createdOrder=await this.orderModel.create(newUserOrder);

        }
        
    }

    async getUserOrder(userOrderId){// 상품구매한 유저 아이디 들어감 
        // 상품 정보다 찾아옴. 유저 정보다 다 찾아옴
        const userOrder= await this.orderModel.findUserOrderAll(userOrderId);
        console.log(userOrder);
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1');
        console.log(userOrder[0].orderTime);
       
      

}
}

const orderService = new OrderService(orderModel);

export { orderService }