import cartProductService from '../services/cartProductService'
import redisService from '../redisService'

let addToCart = async (req, res) => {
    try {
        let userId = req.body.userId
        await redisService.deleteData(`cartDataByUserID-${userId}`)
        let data = await cartProductService.handleAddToCart(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let updateCart = async (req, res) => {
    try {
        let userId = req.body.userId
        await redisService.deleteData(`cartDataByUserID-${userId}`)

        let data = await cartProductService.handleUpdateCart(req.body);

        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let deleteProductInCart = async (req, res) => {
    try {
        let userId = req.query.userId
        await redisService.deleteData(`cartDataByUserID-${userId}`)

        let data = await cartProductService.handleDeleteProductInCart(req.query.cartId, req.query.productId);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addToCart: addToCart,
    deleteProductInCart: deleteProductInCart,
    updateCart: updateCart
}