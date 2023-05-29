import childCategoryService from '../services/childCategoryService'

let addNewChildCategory = async (req, res) => {
    try {
        let data = await childCategoryService.handleAddNewChildCategory(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getAllChildCategory = async (req, res) => {
    try {
        let data = await childCategoryService.handleGetAllChildCategory();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getAllChildCategoryBySubCatId = async (req, res) => {
    try {
        let data = await childCategoryService.handleGetAllChildCategoryBySubCatId(req.query.subCategoryId);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let deleteChildCategory = async (req, res) => {
    try {
        let data = await childCategoryService.handleDeleteChildCategory(req.query.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllChildCategory: getAllChildCategory,
    getAllChildCategoryBySubCatId: getAllChildCategoryBySubCatId,
    addNewChildCategory: addNewChildCategory,
    deleteChildCategory: deleteChildCategory
}