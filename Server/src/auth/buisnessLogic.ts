import { getConnection } from "../db";
import {
    loginQuerry,
    getRegisterQuery,
    CheckQuery,


} from "./query";
import md5 from "md5"
import { signToken } from "./signHandler";



async function login(email, password) {

    const query = loginQuerry();
    const [result] = await getConnection().execute(query, [email, md5(password)]);
    if (result.length === 0) {
        throw new Error("somthing went wrong");
    }
    const token = signToken(result[0])


    return token;
}

async function register(firstName, lastName, email, password, city, street) {
    const CheckAvailable = CheckQuery();
    const [checkResult] = await getConnection().execute(CheckAvailable, [email]);
    if (checkResult.length > 0) {
        throw new Error("somthing went wrong");
    }
    else {
        const query = getRegisterQuery();
        const [result] = await getConnection().execute(query, [firstName, lastName, email, md5(password), city, street]);
        return result;
    }
}



export { login, register };