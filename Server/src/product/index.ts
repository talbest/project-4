import express, { Request, Response, NextFunction } from "express";
import isAdmin from "../middleWere/isAdmin";
import { addProduct, getProducts, getCategories, updateProduct, deleteVacation, getSummaryData } from "./buisnessLogic";

const router = express.Router();
// router.delete("/:id", deleteProductHandler);
router.post("/", isAdmin, addProductHandler);
router.get("/", getProductsHandler);
router.get("/Summary-Data", getSummaryDataHandler);
router.get("/category", getCategoriesHandler);

router.put("/:id", isAdmin, updateProductHandler);


async function addProductHandler(req, res, next) {
    const { name, categoryId, price, photoUrl } = req.body;
    const results = await addProduct(name, categoryId, price, photoUrl);
    res.json({ message: "ok", results });
}

async function getProductsHandler(req, res, next) {
    const { category, byName } = req.query;
    const results = await getProducts(category, byName);
    res.json({ message: "ok", results });
}


async function getSummaryDataHandler(req, res, next) {
    const results = await getSummaryData();
    res.json({ message: "ok", results });
}

async function getCategoriesHandler(req, res, next) {
    const results = await getCategories();
    res.json({ message: "ok", results });
}


async function updateProductHandler(req, res, next) {
    const { name, categoryId, price, photoUrl } = req.body;
    const id = req.params.id;
    updateProduct(name, categoryId, price, photoUrl, id);
    res.json({ message: "ok", });
}






async function deleteVacationHandler(req, res, next) {
    const id = req.params.id;
    deleteVacation(id);
    res.json({ message: "ok", });
}

// INSERT INTO `task3`.`meeting` (`starting_Time`, `ending_time`, `description`, `location`, `devTeam_id`) VALUES ('\"00:00:00\"', '\"00:00:00\"', '\"desc\"', '\"location', '\"devTeam\"');

// async function deleteUserHandler(req, res, next) {
//     const results = await deleteUser(req.params.id);
//     res.json({ message: "ok", results });
// }


// async function getCategoriesHandler(req, res, next) {
//   const results = await getCategories();
//   res.json({ message: "ok", categories: results });
// }

export default router;
