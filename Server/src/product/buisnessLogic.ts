import { getConnection } from "../db";
import {
    addProductQuery, getProductsByCategoryQuerry, getCategoriesQuery, getAllProductsQuerry, updateProductQuery, deleteVacationQuery, getsummaryDataQuery, getProductsByNameQuerry


} from "./query";


async function addProduct(name, categoryId, price, photoUrl) {
    const query = addProductQuery();
    const [result] = await getConnection().execute(query, [name, categoryId, price, photoUrl]);;
    return result;
}



async function getProducts(category = null, byName = null) {
    if (category !== null) {
        const query = getProductsByCategoryQuerry();
        const [result] = await getConnection().execute(query, [category]);
        return result;
    }
    else if (byName !== null) {
        const query = getProductsByNameQuerry()
        const [result] = await getConnection().execute(query, [`%${byName}%`]);

        return result;
    }
    else {
        const query = getAllProductsQuerry();
        const [result] = await getConnection().execute(query);
        return result
    }
}

async function getSummaryData() {
    const query = getsummaryDataQuery();
    const [result] = await getConnection().execute(query);
    return result;
}

async function getCategories() {
    const query = getCategoriesQuery();
    const [result] = await getConnection().execute(query);
    return result;
}

async function updateProduct(name, categoryId, price, photoUrl, id) {
    const query = updateProductQuery();
    const [result] = await getConnection().execute(query, [name, categoryId, price, photoUrl, id]);
    return result;
}

async function deleteVacation(id) {
    const query = deleteVacationQuery();
    const [result] = await getConnection().execute(query, [id]);
    return result;
}


export { addProduct, getProducts, getCategories, updateProduct, deleteVacation, getSummaryData };