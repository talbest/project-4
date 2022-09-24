import { getConnection } from "../db";
import {
    addProductQuery, getCartQuerry, getItemQuery, submitOrderQuery, sattleCartQuery, updateProductQuerry, getLastCartyQuery, checkIfProductExistInCartQuery, getProductDetails, clearCartQuerry, insertProductQuery, updateProductQuery, deleteCartItemQuery, createCartQuerry, getsummaryDataQuery, getProductsByNameQuerry
} from "./query";


async function addProduct(name, categoryId, price, photoUrl) {
    const query = addProductQuery();
    const [result] = await getConnection().execute(query, [name, categoryId, price, photoUrl]);;
    return result;
}

async function getCart(data, clearCartId = null) {

    const query = getCartQuerry();
    const [resultCart] = await getConnection().execute(query, [data?.id]);
    let usingCart = null
    if (resultCart.length === 0) {
        const query = createCartQuerry();
        const [result] = await getConnection().execute(query, [data?.id]);
        usingCart = result.id
    }
    else {
        usingCart = resultCart[0].id
        if (clearCartId !== null) {
            if (resultCart[0].id === clearCartId) {
                const query = clearCartQuerry();
                const [result] = await getConnection().execute(query, [clearCartId]);
            }
        }
    }

    if (usingCart) {
        const getCartItemQuery = getItemQuery();
        const [result] = await getConnection().execute(getCartItemQuery, [usingCart]);
        return { result, resultCart }
    }


}



async function getSummaryData() {
    const query = getsummaryDataQuery();
    const [result] = await getConnection().execute(query);
    return result;
}

async function updateProduct(name, categoryId, price, photoUrl, id) {
    const query = updateProductQuery();
    const [result] = await getConnection().execute(query, [name, categoryId, price, photoUrl, id]);
    return result;
}

async function deleteCartItem(id, data) {
    const cartQuery = getCartQuerry();
    const [resultCart] = await getConnection().execute(cartQuery, [data?.id]);
    const cartId = resultCart?.[0]?.id

    const query = deleteCartItemQuery();
    const [result] = await getConnection().execute(query, [cartId, id]);
    return result;
}

async function getLastCart(data) {
    const query = getLastCartyQuery();
    const [cartResult] = await getConnection().execute(query, [data.id]);
    const cartId = cartResult?.[0]?.id
    if (cartResult.length === 0) {
        return []
    }

    const getCartItemQuery = getItemQuery();
    const [result] = await getConnection().execute(getCartItemQuery, [cartId]);
    return { result, cartResult }
}

async function addProductToCart(productId, quantity, data) {
    let TotalQuantity = quantity
    const query = getCartQuerry();
    const [cartResult] = await getConnection().execute(query, [data.id]);
    const cartId = cartResult?.[0]?.id

    const isProductExsist = checkIfProductExistInCartQuery();
    const [resultExsit] = await getConnection().execute(isProductExsist, [cartId, productId]);


    if (resultExsit.length > 0) {
        TotalQuantity += resultExsit?.[0]?.quantity
    }

    const productDeatailsQuery = getProductDetails()
    const [productDetails] = await getConnection().execute(productDeatailsQuery, [productId]);
    const totalPrice = productDetails?.[0]?.price * TotalQuantity

    if (resultExsit.length > 0) {
        const updateProductQuery = updateProductQuerry()
        const [result] = await getConnection().execute(updateProductQuery, [TotalQuantity, totalPrice, cartId, productId,]);
        return result
    }
    else {
        const ProductQuery = insertProductQuery();
        const [result] = await getConnection().execute(ProductQuery, [cartId, productId, quantity, totalPrice]);
        return result
    }

}

async function editCartItem(data = null, productId = null, quantity = null) {
    const getCartquery = getCartQuerry();
    const [result] = await getConnection().execute(getCartquery, [data.id]);
    const cartID = result?.[0]?.id;
    if (quantity <= 0) {
        const isProductExsist = checkIfProductExistInCartQuery();
        const [resultExsit] = await getConnection().execute(isProductExsist, [cartID, productId]);

        const deleteProductQuery = deleteCartItemQuery();
        const [resulDeleteCart] = await getConnection().execute(deleteProductQuery, [cartID, resultExsit?.[0]?.id]);
        return resulDeleteCart;
    } else {
        const productInfo = getProductDetails();
        const [resultInfo] = await getConnection().execute(productInfo, [productId]);
        const totalPrice = resultInfo?.[0]?.price * quantity;
        const editProductQuery = updateProductQuerry();
        const [resulEditCart] = await getConnection().execute(editProductQuery, [quantity, totalPrice, cartID, productId]);
        return resulEditCart;
    }
}

async function submitCart(data, cartId = null, totalPrice = null, city = null, street = null, date = null, creditCard = null) {

    const sattellCartQuery = sattleCartQuery()
    const [settled] = await getConnection().execute(sattellCartQuery, [cartId]);

    const query = submitOrderQuery();
    const [result] = await getConnection().execute(query, [cartId, totalPrice, city, street, date, creditCard, data.id]);
    return result;
}





export { addProduct, getCart, updateProduct, submitCart, deleteCartItem, getSummaryData, getLastCart, addProductToCart, editCartItem };