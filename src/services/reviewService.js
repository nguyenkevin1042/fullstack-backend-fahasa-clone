import db from '../models/index';

//1. CREATE NEW REVIEW
let handleCreateNewReview = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Review.create({
                productId: inputData.productId,
                reviewer: inputData.customerName,
                reviewText: inputData.reviewText,
                isAnonymous: inputData.isAnonymous,
                rating: inputData.selectedRating.keyMap,
                reviewedDate: inputData.reviewedDate
            })

            resolve({
                errCode: 0
            })

        } catch (error) {
            reject(error);
        }
    });
}

//2. GET REVIEW BY PRODUCT ID
let handleGetReviewByProductId = (inputProductId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputProductId) {
                resolve({
                    errCode: 1,
                    message: 'Missing productId'
                })
            } else {
                let reviewData = await db.Review.findAll({
                    where: { productId: inputProductId },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                })
                if (reviewData && reviewData.length > 0) {
                    resolve({
                        errCode: 0,
                        reviewData
                    })
                } else {
                    resolve({
                        errCode: 1,
                        messageVI: 'Sản phẩm này hiện chưa có đánh giá nào',
                        messageEN: 'This product currently does not have any reviews',
                    })
                }
            }

        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    handleCreateNewReview: handleCreateNewReview,
    handleGetReviewByProductId: handleGetReviewByProductId
}