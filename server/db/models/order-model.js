import { model } from "mongoose";
import { orderService } from "../../services";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("orders", OrderSchema);

class OrderModel { 
    async create(userOrder) {
        const createdOrder = await Order.create(userOrder);
        return createdOrder;
      }
      
    async findUserOrderAll(userOrderId){// 아이디로 찾아가지고 오기 그리고 상품도 찾아옴
        const userOrder = await Order.find({userId:userOrderId}).populate('cartItems').populate('userId');
        return userOrder;
    }
    async findUsersOrder(){
        const userOrderAll =await Order.find({});
        return userOrderAll;
    }
  

}

const orderModel = new OrderModel();

export { orderModel };
