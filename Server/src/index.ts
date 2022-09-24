import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import bodyParser from "body-parser";
import { initDB, getConnection } from "./db";
import auhRouter from "./auth";
import productRouter from "./product"
import CartRouter from "./Cart"
import verifyToken from "./middleWere/verifyToken";
import allRouter from "./openCalls"

initDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get("/h", async (req, res) => {
    return res.send("Api is working!");
});
app.use("/auth", auhRouter);
app.use("/all", allRouter)
app.use(verifyToken)
app.use("/product", productRouter)
app.use("/cart", CartRouter)


app.use((error, req, res, next) => {
    console.log(error);
    if (error.status) return res.status(error.status).json({ message: "Unauthorized" });
    return res.status(error?.status ? error?.status : 500).json({ message: error?.message ? error?.message : "Something went wrong" });
});

const { PORT } = process.env;
app.listen(PORT, () => {
    console.log("listening to port ", PORT);
});
