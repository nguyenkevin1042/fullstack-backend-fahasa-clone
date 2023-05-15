import allCodesService from '../services/allCodesService'

let addNewCode = async (req, res) => {
    try {
        let data = await allCodesService.handleAddNewCode(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getAllCodes = async (req, res) => {
    try {
        let data = await allCodesService.handleGetAllCodes();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let deleteCode = async (req, res) => {
    try {
        let data = await allCodesService.handleDeleteCode(req.body.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let editCode = async (req, res) => {
    try {
        let data = await allCodesService.handleEditCode(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getCodeByType = async (req, res) => {
    try {
        let data = await allCodesService.handleGetCodeByType(req.query.type);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addNewCode: addNewCode,
    getAllCodes: getAllCodes,
    deleteCode: deleteCode,
    editCode: editCode,
    getCodeByType: getCodeByType
}
