import categoryService from '../services/categoryService'

let addNewCategory = async (req, res) => {
    try {
        let data = await categoryService.handleAddNewCategory(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getAllCategory = async (req, res) => {
    try {
        let data = await categoryService.handleGetAllCategory();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addNewCategory: addNewCategory,
    getAllCategory: getAllCategory
}