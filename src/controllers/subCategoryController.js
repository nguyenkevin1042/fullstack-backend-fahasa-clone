import subCategoryService from '../services/subCategoryService'

let addNewSubCategory = async (req, res) => {
    try {
        let data = await subCategoryService.handleAddNewSubCategory(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getAllSubCategoryByCategoryType = async (req, res) => {
    try {
        let data = await subCategoryService.handleGetAllSubCategoryByType(req.query.categoryType);
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

module.exports = {
    addNewSubCategory: addNewSubCategory,
    getAllSubCategory: getAllSubCategory,
    getAllSubCategoryByCategoryType: getAllSubCategoryByCategoryType,
    deleteSubCategory: deleteSubCategory
}