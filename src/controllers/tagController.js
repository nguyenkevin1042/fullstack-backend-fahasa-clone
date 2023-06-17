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

module.exports = {
    getTagByType: getTagByType,
    getProductsByTagKeyName: getProductsByTagKeyName
}