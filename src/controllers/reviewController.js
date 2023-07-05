import reviewService from '../services/reviewService'

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
        let data = await reviewService.handleGetReviewByProductId(req.query.productId);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    createNewReview: createNewReview,
    getReviewByProductId: getReviewByProductId
}