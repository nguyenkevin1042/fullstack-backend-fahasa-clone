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

let login = async (req, res) => {
    try {
        let data = await userService.handleLogin(req.body.email, req.body.password);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}


// let getAllUsers = async (req, res) => {
//     try {

//     } catch (error) {
//         console.log(error)
//     }
// }


module.exports = {
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    login: login
}
