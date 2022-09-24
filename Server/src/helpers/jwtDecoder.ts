import jwt from "jsonwebtoken";
export default function jwtDecoder(req, res, next) {
    const authorization = req?.headers?.authorization;
    return jwt.verify(authorization, process.env.SECRET, (err, decoded) => {
        if (err) {
            return next({ ...err, status: 401 });
        } else
            return decoded?.data

    });
}
