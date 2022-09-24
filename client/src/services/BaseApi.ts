import axios from "../utils/axios";
export class BaseApi {
    static loginAction(data: any) {
        return axios.post('auth/login', data);
    }

    static registerAction(data: any) {
        return axios.post('auth/register', data);
    }


    static getSummaryData() {
        return axios.get('all/Summary-Data');
    }

    static getCart() {
        return axios.get('cart');
    }

    static getLastCart() {
        return axios.get('cart/lastCart');
    }


    static editQuantity(productId: string, quantity: number) {
        return axios.put('cart/editHandlerQuantity', { productId: productId, quantity: quantity });
    }

    static deleteProduct(productId: string) {
        return axios.delete(`cart/cartItem/${productId}`);
    }


    static clearCart(cartId: string) {
        return axios.get(`cart?clearCartId=${cartId}`);
    }

    static getCategories() {
        return axios.get(`product/category`);
    }

    static getProducts(category: string = "") {
        return axios.get(`product${category ? `?category=${category}` : ""}`);
    }

    static addProduct(productId: string, quantity = 1) {
        return axios.post(`cart/add-To-Cart`, { productId: productId, quantity: quantity });
    }

    static getProductsBySearch(valueToFind: string = "") {
        return axios.get(`product${valueToFind ? `?byName=${valueToFind}` : ""}`);
    }

    static createProduct(data: any) {
        return axios.post(`product`, data);
    }

    static updateProduct(id: any, data: any) {
        return axios.put(`product/${id}`, data);
    }


    static submitOrder(data: any) {
        return axios.post(`cart/submitOrder`, data);
    }

}