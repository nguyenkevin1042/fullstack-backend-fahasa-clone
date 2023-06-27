import productTagService from '../services/productTagService'
import redisService from '../redisService'

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
        let tagId = req.query.tagId
        let data
        let dataFromRedis = await redisService.getData(`allProductsByTagId${tagId}`)
        if (dataFromRedis) {
            data = JSON.parse(dataFromRedis)
        } else {
            data = await productTagService.handleGetProductByTagId(tagId);
            await redisService.setData(`allProductsByTagId${tagId}`, JSON.stringify(data))
        }

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