import subCategoryService from '../services/subCategoryService'
import redisService from '../redisService'

let addNewSubCategory = async (req, res) => {
    try {
        let data = await subCategoryService.handleAddNewSubCategory(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getAllSubCategoryByCategory = async (req, res) => {
    try {
        let category = req.query.category
        let data
        let dataFromRedis = await redisService.getData(`allSubCategoryByCategory-${category}`)
        if (dataFromRedis) {
            data = JSON.parse(dataFromRedis)
        } else {
            data = await subCategoryService.handleGetAllSubCategoryByCategory(category);
            await redisService.setData(`allSubCategoryByCategory-${category}`, JSON.stringify(data))
        }

        return res.status(200).json(data);

    } catch (error) {
        console.log(error)
    }
}

let getAllSubCategoryByKeyName = async (req, res) => {
    try {
        let keyName = req.query.keyName
        let data
        let dataFromRedis = await redisService.getData(`allSubCategoryByKeyName-${keyName}`)
        if (dataFromRedis) {
            data = JSON.parse(dataFromRedis)
        } else {
            data = await subCategoryService.handleGetAllSubCategoryByKeyName(keyName);
            await redisService.setData(`allSubCategoryByKeyName-${keyName}`, JSON.stringify(data))
        }

        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getAllSubCategory = async (req, res) => {
    try {
        let data
        let dataFromRedis = await redisService.getData('allSubCategory')
        if (dataFromRedis) {
            data = JSON.parse(dataFromRedis)
        } else {
            data = await subCategoryService.handleGetAllSubCategory();
            await redisService.setData('allSubCategory', JSON.stringify(data))
        }

        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let deleteSubCategory = async (req, res) => {
    try {
        let data = await subCategoryService.handleDeleteSubCategory(req.query.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let editSubCategory = async (req, res) => {
    try {
        let data = await subCategoryService.handleEditSubCategory(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addNewSubCategory: addNewSubCategory,
    getAllSubCategory: getAllSubCategory,
    getAllSubCategoryByCategory: getAllSubCategoryByCategory,
    getAllSubCategoryByKeyName: getAllSubCategoryByKeyName,
    deleteSubCategory: deleteSubCategory,
    editSubCategory: editSubCategory
}