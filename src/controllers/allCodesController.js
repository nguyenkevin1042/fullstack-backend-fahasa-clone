import allCodesService from '../services/allCodesService'
import redisService from '../redisService'

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
        redisService.redisConnect();

        let data
        let dataFromRedis = await redisService.getData('allCodes')
        if (dataFromRedis) {
            data = dataFromRedis
        } else {
            data = await allCodesService.handleGetAllCodes();
            redisService.setData('allCodes', JSON.stringify(data))
        }

        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let deleteCode = async (req, res) => {
    try {
        let data = await allCodesService.handleDeleteCode(req.query.id);
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

let getCodeById = async (req, res) => {
    try {
        let data = await allCodesService.handleGetCodeById(req.query.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getCodeByKeyMap = async (req, res) => {
    try {
        let data = await allCodesService.handleGetCodeByKeyMap(req.query.keyMap);
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
    getCodeByType: getCodeByType,
    getCodeById: getCodeById,
    getCodeByKeyMap: getCodeByKeyMap
}
