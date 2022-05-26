import { orderModel } from "../db";

class OrderService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
}

const orderService = new OrderService(orderModel);

export { orderService }