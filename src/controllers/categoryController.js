import categoryService from '../services/categoryService'

let addNewCategory = async (req, res) => {
    try {
        let data = await categoryService.handleAddNewCategory(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getAllSubCategory = async (req, res) => {
    try {
        let data = await categoryService.handleGetAllSubCategory();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addNewCategory: addNewCategory,
    getAllSubCategory: getAllSubCategory
}