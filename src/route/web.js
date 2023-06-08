import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import allCodesController from "../controllers/allCodesController";
import productController from "../controllers/productController";
import subCategoryController from "../controllers/subCategoryController";
import childCategoryController from "../controllers/childCategoryController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);

    //USER
    router.get('/api/get-all-users', userController.getAllUsers);
    router.post('/api/create-new-user', userController.createNewUser);
    router.post('/api/admin/login', userController.adminLogin);
    router.post('/api/customer/login', userController.customerLogin);

    //ALL CODES
    router.get('/api/get-all-codes', allCodesController.getAllCodes);
    router.get('/api/get-code-by-type', allCodesController.getCodeByType);
    router.get('/api/get-code-by-key-map', allCodesController.getCodeByKeyMap);
    router.get('/api/get-code-by-id', allCodesController.getCodeById);
    router.post('/api/add-new-code', allCodesController.addNewCode);
    router.delete('/api/delete-code', allCodesController.deleteCode);
    router.put('/api/edit-code', allCodesController.editCode);

    //SUB CATEGORY
    // router.post('/api/add-new-category', categoryController.addNewCategory);
    router.post('/api/add-new-sub-category', subCategoryController.addNewSubCategory);
    router.get('/api/get-all-sub-category', subCategoryController.getAllSubCategory);
    router.get('/api/get-all-sub-category-by-category', subCategoryController.getAllSubCategoryByCategory);
    router.get('/api/get-all-sub-category-by-key-name', subCategoryController.getAllSubCategoryByKeyName);
    router.delete('/api/delete-sub-category', subCategoryController.deleteSubCategory);
    router.put('/api/edit-sub-category', subCategoryController.editSubCategory);
    //CHILD CATEGORY
    router.get('/api/get-all-child-category', childCategoryController.getAllChildCategory);
    router.get('/api/get-all-child-category-by-sub-category', childCategoryController.getAllChildCategoryBySubCat);
    router.get('/api/get-child-category-by-key-name', childCategoryController.getChildCategoryByKeyName);
    router.post('/api/add-new-child-category', childCategoryController.addNewChildCategory);
    router.delete('/api/delete-child-category', childCategoryController.deleteChildCategory);

    //PRODUCT
    router.post('/api/add-new-product', productController.addNewProduct);
    router.post('/api/update-product', productController.updateProduct)
    router.get('/api/get-all-product', productController.getAllProduct);
    router.get('/api/get-all-product-by-category', productController.getAllProductByCategory);
    // router.get('/api/get-all-product-by-sub-category', productController.getAllProductBySubCategory);
    // router.get('/api/get-all-product-by-child-category', productController.getAllProductByChildCategory);
    router.get('/api/get-product-by-key-name', productController.getProductByKeyName);
    router.delete('/api/delete-product', productController.deleteProduct);

    return app.use("/", router);

}

module.exports = initWebRoutes;