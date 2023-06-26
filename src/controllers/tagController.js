import tagService from '../services/tagService'
import redisService from '../redisService'

let getTagByType = async (req, res) => {
    try {
        let data = await tagService.handleGetTagByType(req.query.type);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getProductsByTagKeyName = async (req, res) => {
    try {
        let data = await tagService.handleGetProductsByTagKeyName(req.query.keyName);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getAllTag = async (req, res) => {
    try {
        redisService.redisConnect();

        let data
        let dataFromRedis = await redisService.getData('allTags')
        if (dataFromRedis) {
            data = JSON.parse(dataFromRedis)
        } else {
            data = await tagService.handleGetAllTag();
            await redisService.setData('allTags', JSON.stringify(data))
        }

        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getAllTagWithoutProductData = async (req, res) => {
    try {
        let data = await tagService.handleGetAllTagWithoutProductData();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getTagByType: getTagByType,
    getProductsByTagKeyName: getProductsByTagKeyName,
    getAllTag: getAllTag,
    getAllTagWithoutProductData: getAllTagWithoutProductData

}