import productTagService from '../services/productTagService'

let createProductTag = async (req, res) => {
    try {
        let data = await productTagService.handleCreateProductTag(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let deleteProductTag = async (req, res) => {
    try {
        let data = await productTagService.handleDeleteProductTag(req.query.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let updateProductTag = async (req, res) => {
    try {
        let data = await productTagService.handleUpdateProductTag(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getProductByTagId = async (req, res) => {
    try {
        let data = await productTagService.handleGetProductByTagId(req.query.tagId);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createProductTag: createProductTag,
    updateProductTag: updateProductTag,
    deleteProductTag: deleteProductTag,
    getProductByTagId: getProductByTagId
}