import cartProductService from '../services/cartProductService'

let addToCart = async (req, res) => {
    try {
        let data = await cartProductService.handleAddToCart(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let deleteProductInCart = async (req, res) => {
    try {
        let data = await cartProductService.handleDeleteProductInCart(req.query.cartId, req.query.productId);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addToCart: addToCart,
    deleteProductInCart: deleteProductInCart
}