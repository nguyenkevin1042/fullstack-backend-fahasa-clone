import subCategoryService from '../services/subCategoryService'

let addNewSubCategory = async (req, res) => {
    try {
        let data = await subCategoryService.handleAddNewSubCategory(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getAllSubCategoryByCategoryId = async (req, res) => {
    try {
        let data = await subCategoryService.handleGetAllSubCategoryByCategoryId(req.query.categoryId);
        console.log(data)
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

module.exports = {
    addNewSubCategory: addNewSubCategory,
    getAllSubCategory: getAllSubCategory,
    getAllSubCategoryByCategoryId: getAllSubCategoryByCategoryId
}