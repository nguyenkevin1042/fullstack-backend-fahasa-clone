import userService from '../services/userService'

let getAllUsers = async (req, res) => {
    try {
        let data = await userService.handleGetAllUsers();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let createNewUser = async (req, res) => {
    try {
        let data = await userService.handleCreateNewUser(req.body);

        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let updateUser = async (req, res) => {
    try {
        let data = await userService.handleUpdateUser(req.body);

        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let adminLogin = async (req, res) => {
    try {
        let data = await userService.handleAdminLogin(req.body.email, req.body.password);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let customerLogin = async (req, res) => {
    try {
        let data = await userService.handleCustomerLogin(req.body.email, req.body.password);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getValidationKey = async (req, res) => {
    try {
        let data = await userService.handleGetValidationKey(req.body.email);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let changePassword = async (req, res) => {
    try {
        let data = await userService.handleChangePassword(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    adminLogin: adminLogin,
    customerLogin: customerLogin,
    updateUser: updateUser,
    getValidationKey: getValidationKey,
    changePassword: changePassword
}
