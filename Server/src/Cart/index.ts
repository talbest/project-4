import express, { Request, Response, NextFunction } from "express";
import jwtDecoder from "../helpers/jwtDecoder";
import isAdmin from "../middleWere/isAdmin";
import { addProduct, getCart, updateProduct, deleteCartItem, submitCart, editCartItem, getSummaryData, getLastCart, addProductToCart } from "./buisnessLogic";

const router = express.Router();
// router.delete("/:id", deleteProductHandler);
router.get("/", getCartHandler);
router.post("/", addProductHandler);
router.put("/editHandlerQuantity", editQuantityHandler);
router.get("/Summary-Data", getSummaryDataHandler);
router.delete("/cartItem/:id", deleteCartItemHandler);
router.put("/:id", updateProductHandler);
router.get("/lastCart", getLastCartHandler);
router.post("/add-To-Cart", addProductToCartHanlder);
router.post("/submitOrder", submitOrderHandler);




async function getCartHandler(req, res, next) {
    const { clearCartId } = req.query;
    const data = jwtDecoder(req, res, next)
    const results = await getCart(data, parseInt(clearCartId));
    res.json({ message: "ok", results });
}


async function addProductHandler(req, res, next) {
    const { name, categoryId, price, photoUrl } = req.body;
    const results = await addProduct(name, categoryId, price, photoUrl);
    res.json({ message: "ok", results });
}


async function getSummaryDataHandler(req, res, next) {
    const results = await getSummaryData();
    res.json({ message: "ok", results });
}

async function updateProductHandler(req, res, next) {
    const { name, categoryId, price, photoUrl } = req.body;
    const id = req.params.id;
    const result = await updateProduct(name, categoryId, price, photoUrl, id);
    res.json({ message: "ok", result });
}


async function deleteCartItemHandler(req, res, next) {
    const id = req.params.id;
    const data = jwtDecoder(req, res, next)
    const result = await deleteCartItem(id, data);
    res.json({ message: "ok", result });
}

async function getLastCartHandler(req, res, next) {
    const data = jwtDecoder(req, res, next)
    try {
        const result = await getLastCart(data);
        res.json({ message: "ok", result });
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}


async function addProductToCartHanlder(req, res, next) {
    const { productId, quantity } = req.body
    const data = jwtDecoder(req, res, next)
    try {
        const result = await addProductToCart(productId, quantity, data);
        res.json({ message: "ok", result });
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}


async function editQuantityHandler(req, res, next) {
    try {
        const data = jwtDecoder(req, res, next);
        const { productId, quantity } = req.body;
        const results = await editCartItem(data, productId, quantity);
        res.json({ message: "okey", results });
    } catch (error) {
        res.json({ message: "error", error });
    }
}

async function submitOrderHandler(req, res, next) {
    try {
        const data = jwtDecoder(req, res, next);
        const { cartId, totalPrice, city, street, date, creditCard } = req.body;
        console.log(req.body)
        const results = await submitCart(data, cartId, totalPrice, city, street, date, creditCard);
        res.json({ message: "okey", results });
    } catch (error) {
        res.json({ message: "error", error });
    }
}



export default router;
