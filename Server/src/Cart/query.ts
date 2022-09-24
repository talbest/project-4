
const getCartQuerry = (): string => {
    return `SELECT * FROM project4db.carts WHERE userId =? AND setteled=0`;
}

const createCartQuerry = (): string => {
    return `INSERT INTO project4db.carts (userId) VALUES (?)`;
}

const clearCartQuerry = (): string => {
    return `DELETE  FROM project4db.CartItem where cartId=?;`;
}

const getItemQuery = (): string => {
    return `SELECT 
    project4db.CartItem.id as cartItemId,
    project4db.CartItem.productId,
    project4db.products.categoryId,
    project4db.CartItem.cartId,
    project4db.products.name,
    project4db.CartItem.quantity,
    project4db.products.price,
    project4db.CartItem.totalPrice,
    project4db.products.photoUrl
    FROM project4db.CartItem
    JOIN  project4db.products
    ON project4db.CartItem.productId = project4db.products.id
    WHERE cartId = ?`;
}

const addProductQuery = (): string => {
    return `INSERT INTO project4db.products (name, categoryId, price, photoUrl) VALUES (?, ?, ?, ?)`;
}


const getProductsByNameQuerry = (): string => {
    return `SELECT * FROM project4db.products WHERE name LIKE ?`;
}

const getAllProductsQuerry = (): string => {
    return `SELECT * FROM project4db.products`;
}


const getsummaryDataQuery = (): string => {
    return `select (select count(*) from project4db.products ) as productCount , (select count(*) from project4db.Orders )   as  numberOfOrders `;
}

const updateProductQuery = (): string => {
    return `UPDATE project4db.products SET name=?, categoryId=?, price=?, photoUrl=?  WHERE id=? `;

}

const deleteCartItemQuery = (): string => {
    return `DELETE FROM project4db.CartItem WHERE cartId=? AND id=?`;
}

const getLastCartyQuery = (): string => {
    return "SELECT * FROM project4db.carts WHERE userId = ? AND setteled = 1 ORDER BY created DESC LIMIT 1"
}

const insertProductQuery = (): string => {
    return `INSERT INTO project4db.CartItem
        (cartId, productId, quantity, totalPrice) VALUES (?, ?, ?, ?)`;
}

const getProductDetails = (): string => {
    return "SELECT * FROM project4db.products WHERE id = ? "
}

const checkIfProductExistInCartQuery = (): string => {
    return `SELECT * FROM project4db.CartItem WHERE cartId = ? AND productId = ?`;
}

const updateProductQuerry = (): string => {
    return `UPDATE project4db.CartItem SET quantity = ?, totalPrice = ? WHERE cartId = ? AND productId = ?`;
}
// const deleteUsersQuery = (): string => {
//     return `DELETE FROM task3.users where id=?;`;;
// };

const sattleCartQuery = (): string => {
    return `UPDATE project4db.carts SET setteled = 1 WHERE id = ? `;

}

const submitOrderQuery = (): string => {
    return `INSERT INTO project4db.Orders (cartId, totalPrice, deliveryCity, deliveryStreet,deliveryDate,creditShort,userID) VALUES (?, ?, ?, ?,?,?,?) `;

}




export { addProductQuery, submitOrderQuery, clearCartQuerry, sattleCartQuery, updateProductQuerry, checkIfProductExistInCartQuery, getProductDetails, insertProductQuery, getItemQuery, createCartQuerry, getCartQuerry, getAllProductsQuerry, updateProductQuery, deleteCartItemQuery, getsummaryDataQuery, getProductsByNameQuerry, getLastCartyQuery };



