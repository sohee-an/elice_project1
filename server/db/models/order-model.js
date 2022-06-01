import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("orders", OrderSchema);

class OrderModel {
    async create(userOrder) {
        const createdOrder = await Order.create(userOrder);
        return createdOrder;
    }

    async findUserOrderAll(userOrderId) {// 아이디로 찾아가지고 오기 그리고 상품도 찾아옴
        const userOrder = await Order.find({ userId: userOrderId }).populate('userId').populate('products.product');
        return userOrder;
    }

    async findUsersOrder() {
        const userOrderAll = await Order.find({}).populate('userId').populate('products.product');
        return userOrderAll;
    }

    async remove(orderId) {
        const deletedOrder = await Order.deleteOne({ _id: orderId });
        return deletedOrder
    }

    /////////////////////////////////////기능 추가/////////////////////////////////////

    async findOrder(orderId) {
        const order = await Order.findOne({ _id: orderId });
        return order;
    }

    async updateOrder(orderId, paymentData) {
        const order = await Order.findOneAndUpdate({ _id: orderId }, { $set: paymentData });
        return order;
    }

    /////////////////////////////////////기능 추가/////////////////////////////////////
}

const orderModel = new OrderModel();

export { orderModel };
