import jwt from "jsonwebtoken";
export default function isAdmin(req, res, next) {
    const authorization = req?.headers?.authorization;
    jwt.verify(authorization, process.env.SECRET, (err, decoded) => {
        if (err) {
            return next({ ...err, status: 401 });
        } else {
            if (decoded?.data?.isAdmin) {
                return next();
            } else {
                return next({ message: "unautheraized", status: 401 });
            }
        }
    });
}