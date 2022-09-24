import express, { Request, Response, NextFunction } from "express";
import { login, register } from "./buisnessLogic";



const router = express.Router();

router.post("/login", loginhandler);
router.post("/register", registerHandler)


async function loginhandler(req, res, next) {
    const { email, password } = req.body;
    try {
        const results = await login(email, password);
        res.json({ message: "ok", results });
    } catch (error) {
        res.status(400).json({ message: error.message, error });
    }

}

async function registerHandler(req, res, next) {
    const { firstName, lastName, email, password,city,street } = req.body;
    try {
        const results = await register(firstName, lastName, email, password,city,street);
        res.json({ message: "ok", results });
    } catch (error) {
        res.status(400).json({ message: error.message, error });
    }


}


export default router;
