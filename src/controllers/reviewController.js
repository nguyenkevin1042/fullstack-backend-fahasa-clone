import reviewService from '../services/reviewService'
import redisService from '../redisService'

let createNewReview = async (req, res) => {
    try {
        let data = await reviewService.handleCreateNewReview(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getReviewByProductId = async (req, res) => {
    try {
        let data
        let productId = req.query.productId
        let dataFromRedis = await redisService.getData(`reviewsByProductId-${productId}`)
        if (dataFromRedis) {
            data = JSON.parse(dataFromRedis)
        } else {
            data = await reviewService.handleGetReviewByProductId(productId);
            await redisService.setData(`reviewsByProductId-${productId}`, JSON.stringify(data))
        }
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    createNewReview: createNewReview,
    getReviewByProductId: getReviewByProductId
}