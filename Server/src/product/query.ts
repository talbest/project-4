

const addProductQuery = (): string => {
    return `INSERT INTO project4db.products (name, categoryId, price, photoUrl) VALUES (?, ?, ?, ?)`;
}

const getProductsByCategoryQuerry = (): string => {
    return `SELECT * FROM project4db.products WHERE categoryId =?`;
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

const getCategoriesQuery = (): string => {
    return `SELECT * FROM project4db.catagory`;

}
const deleteVacationQuery = (): string => {
    return `DELETE FROM Project3db.vacations WHERE id=?`;
}
// const deleteUsersQuery = (): string => {
//     return `DELETE FROM task3.users where id=?;`;;
// };


export { addProductQuery, getCategoriesQuery, getProductsByCategoryQuerry, getAllProductsQuerry, updateProductQuery, deleteVacationQuery, getsummaryDataQuery, getProductsByNameQuerry };



