import productTagService from '../services/productTagService'

let createProductTag = async (req, res) => {
    try {
        let data = await productTagService.handleCreateProductTag(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    createProductTag: createProductTag
}