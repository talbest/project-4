import { getConnection } from "../db";
import {
    getsummaryDataQuery,


} from "./query";




async function getSummaryData() {
    const query = getsummaryDataQuery();
    const [result] = await getConnection().execute(query);
    return result;
}




export { getSummaryData };