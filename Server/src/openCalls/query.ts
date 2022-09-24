


const getsummaryDataQuery = (): string => {
    return `select (select count(*) from project4db.products ) as productCount , (select count(*) from project4db.Orders )   as  numberOfOrders `;
}




export { getsummaryDataQuery };



