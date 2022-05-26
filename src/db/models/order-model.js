import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("orders", OrderSchema);

class OrderModel {

}

const orderModel = new OrderModel();

export { orderModel };