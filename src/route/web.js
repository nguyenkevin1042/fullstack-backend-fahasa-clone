import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import allCodesController from "../controllers/allCodesController";
import productController from "../controllers/productController";
import subCategoryController from "../controllers/subCategoryController";
import childCategoryController from "../controllers/childCategoryController";
import cartProductController from "../controllers/cartProductController";
import cartController from "../controllers/cartController";
import userAddressController from "../controllers/userAddressController";
import billController from "../controllers/billController";
import tagController from "../controllers/tagController";
import productTagController from "../controllers/productTagController";
import reviewController from "../controllers/reviewController";


let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    // router.get('/about', homeController.getAboutPage);

    //USER
    router.get('/api/get-all-users', userController.getAllUsers);
    router.post('/api/create-new-user', userController.createNewUser);
    router.post('/api/update-user', userController.updateUser);
    router.post('/api/admin/login', userController.adminLogin);
    router.post('/api/customer/login', userController.customerLogin);
    router.post('/api/get-validation-key', userController.getValidationKey);
    router.post('/api/change-password', userController.changePassword);

    //USER ADDRESS
    router.post('/api/create-new-address', userAddressController.createNewAddress);

    //ALL CODES
    router.get('/api/get-all-codes', allCodesController.getAllCodes);
    router.get('/api/get-code-by-type', allCodesController.getCodeByType);
    router.get('/api/get-code-by-key-map', allCodesController.getCodeByKeyMap);
    router.get('/api/get-code-by-id', allCodesController.getCodeById);
    router.post('/api/add-new-code', allCodesController.addNewCode);
    router.delete('/api/delete-code', allCodesController.deleteCode);
    router.put('/api/edit-code', allCodesController.editCode);

    //SUB CATEGORY
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
    router.post('/api/update-product-discount', productController.updateProductDiscount)
    router.get('/api/get-all-product', productController.getAllProduct);
    router.get('/api/get-product-by-id', productController.getProductById);
    router.get('/api/get-all-product-by-category', productController.getAllProductByCategory);
    router.get('/api/get-all-product-by-sub-category', productController.getAllProductBySubCategory);
    router.get('/api/get-all-product-by-child-category', productController.getAllProductByChildCategory);
    router.get('/api/get-product-by-key-name', productController.getProductByKeyName);
    router.get('/api/get-product-by-name', productController.getProductByName);
    router.delete('/api/delete-product', productController.deleteProduct);

    //CART
    router.get('/api/get-cart-by-user-id', cartController.getCartByUserId);

    //CART PRODUCT
    router.post('/api/add-to-cart', cartProductController.addToCart);
    router.post('/api/update-cart', cartProductController.updateCart);
    router.delete('/api/delete-product-in-cart', cartProductController.deleteProductInCart);

    //BILL
    router.post('/api/create-new-bill', billController.createNewBill);
    router.get('/api/get-all-bill', billController.getAllBill);
    router.get('/api/get-bill-by-user-id', billController.getBillByUserId);
    router.get('/api/get-bill-by-id', billController.getBillById);
    router.post('/api/update-bill-status', billController.updateBillStatus);

    //TAG
    router.get('/api/get-product-by-tag-key-name', tagController.getProductsByTagKeyName);
    router.get('/api/get-tag-by-type', tagController.getTagByType);
    router.get('/api/get-all-tag', tagController.getAllTag);
    router.get('/api/get-all-tag-without-product', tagController.getAllTagWithoutProductData);

    //PRODUCT TAG
    router.post('/api/create-product-tag', productTagController.createProductTag);
    router.get('/api/get-product-by-tag-id', productTagController.getProductByTagId);
    router.post('/api/update-product-tag', productTagController.updateProductTag);
    router.delete('/api/delete-product-tag', productTagController.deleteProductTag);

    //REVIEW
    router.post('/api/create-new-review', reviewController.createNewReview);
    router.get('/api/get-review-by-product-id', reviewController.getReviewByProductId);

    return app.use("/", router);

}

module.exports = initWebRoutes;