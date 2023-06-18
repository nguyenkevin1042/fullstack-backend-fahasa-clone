import tagService from '../services/tagService'

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
        let data = await tagService.handleGetAllTag();
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