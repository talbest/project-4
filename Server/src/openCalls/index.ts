import express, { Request, Response, NextFunction } from "express";

import {  getSummaryData } from "./buisnessLogic";

const router = express.Router();


router.get("/Summary-Data", getSummaryDataHandler);






async function getSummaryDataHandler(req, res, next) {
    const results = await getSummaryData();
    res.json({ message: "ok", results });
}


export default router;
