import jwt_decode from "jwt-decode";
export function inAdmin() {
    if (!localStorage.getItem("token")) return false
    const decodeToken: any = jwt_decode(localStorage.getItem("token") || "");
    return !!parseInt(decodeToken?.data?.isAdmin);
}

export function getUserCity() {
    if (!localStorage.getItem("token")) return false
    const decodeToken: any = jwt_decode(localStorage.getItem("token") || "");
    return decodeToken?.data?.city;
}

export function getUserstreet() {
    if (!localStorage.getItem("token")) return false
    const decodeToken: any = jwt_decode(localStorage.getItem("token") || "");
    return decodeToken?.data?.street;
}

export function validateCreditCard(credit: string) {
    const regex = /(\d{4}[-. ]?){4}|\d{4}[-. ]?\d{6}[-. ]?\d{5}/
    return regex.test(credit)
}