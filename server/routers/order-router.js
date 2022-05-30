import { Router } from "express";
import is from '@sindresorhus/is';// DLRJ S

import { loginRequired } from '../middlewares';
import { orderService } from "../services";


const orderRouter = Router();


orderRouter.post('/', loginRequired, async function (req, res, next) {

    console.log(req.body)

    // 데이터 가지고옴 
    const userId = req.currentUserId;
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const cartItems = req.body.cartItems;
    //const total = req.body.total;
    const address = req.body.address;
    const orderRequest = req.body.orderRequest;

    const products = cartItems.map(e => {
        return {
            product: e.productId,
            quantity: e.quantity
        }
    })

    //데이터를 넣음
    const newOrder = await orderService.addOrder({
        userId,
        name,
        phoneNumber,
        products,
        address,
        //total,
        orderRequest,
    });

    res.status(201).json(newOrder);

});

// 상품조회하기 ㅜㅜ...
orderRouter.get('/', loginRequired, async function (req, res, next) {
    const userId = req.currentUserId;// 유저 아이디 찾음 
    //const userId = req.params.userId;
    const userOrder = await orderService.getUserOrder(userId);

    res.status(200).json(userOrder);
});

// 관리자가 상품조회하기 
orderRouter.get("/admin", async function (req, res) {
    const usersOrders = await orderService.usersOrders();
    res.status(200).json(usersOrders);
});


orderRouter.delete('/:id', async (req, res, next) => {
    const id = req.params.id

    const deletedOrder = await orderService.deleteOrder(id);

    res.status(200).json(deletedOrder);
})

export { orderRouter }