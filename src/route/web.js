import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import allCodesController from "../controllers/allCodesController";
import categoryController from "../controllers/categoryController";
import subCategoryController from "../controllers/subCategoryController";
import childCategoryController from "../controllers/childCategoryController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);

    //USER
    router.get('/api/get-all-users', userController.getAllUsers);
    router.post('/api/create-new-user', userController.createNewUser);
    router.post('/api/login', userController.login);

    //ALL CODES
    router.get('/api/get-all-codes', allCodesController.getAllCodes);
    router.get('/api/get-code-by-type', allCodesController.getCodeByType);
    router.get('/api/get-code-by-id', allCodesController.getCodeById);
    router.post('/api/add-new-code', allCodesController.addNewCode);
    router.delete('/api/delete-code', allCodesController.deleteCode);
    router.put('/api/edit-code', allCodesController.editCode);

    //SUB CATEGORY
    // router.post('/api/add-new-category', categoryController.addNewCategory);
    router.post('/api/add-new-sub-category', subCategoryController.addNewSubCategory);
    router.get('/api/get-all-sub-category', subCategoryController.getAllSubCategory);
    router.get('/api/get-all-sub-category-by-category-type', subCategoryController.getAllSubCategoryByCategoryType);
    // router.post('/api/add-new-code', categoryCOntroller.addNewCode);
    // router.delete('/api/delete-code', categoryCOntroller.deleteCode);
    // router.put('/api/edit-code', categoryCOntroller.editCode);

    //CHILD CATEGORY
    router.get('/api/get-all-child-category', childCategoryController.getAllChildCategory);
    router.get('/api/get-all-child-category-by-id', childCategoryController.getAllChildCategoryBySubCatId);
    return app.use("/", router);

}

module.exports = initWebRoutes;