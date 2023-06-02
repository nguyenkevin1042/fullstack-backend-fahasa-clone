import subCategoryService from '../services/subCategoryService'

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
        let data = await subCategoryService.handleGetAllSubCategoryByCategory(req.query.category);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getAllSubCategoryByKeyName = async (req, res) => {
    try {
        let data = await subCategoryService.handleGetAllSubCategoryByKeyName(req.query.keyName);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getAllSubCategory = async (req, res) => {
    try {
        let data = await subCategoryService.handleGetAllSubCategory();
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