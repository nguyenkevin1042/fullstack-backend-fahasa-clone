import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import allCodesController from "../controllers/allCodesController";

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
    router.post('/api/add-new-code', allCodesController.addNewCode);
    router.delete('/api/delete-code', allCodesController.deleteCode);
    router.put('/api/edit-code', allCodesController.editCode);

    return app.use("/", router);

}

module.exports = initWebRoutes;