const loginQuerry = (): string => {
    return `SELECT * FROM project4db.users where email=? and password=?`;
};

const getRegisterQuery = (): string => {
    return `INSERT INTO project4db.users (firstName, lastName, email, password,city,street) VALUES (?, ?, ?, ?,?,?)`;
}

const CheckQuery = (): string => {
    return `SELECT * FROM project4db.users where email=?`;
}



export { loginQuerry, getRegisterQuery, CheckQuery };