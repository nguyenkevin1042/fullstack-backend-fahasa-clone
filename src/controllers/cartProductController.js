import cartProductService from '../services/cartProductService'

let addToCart = async (req, res) => {
    try {
        let data = await cartProductService.handleAddToCart(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addToCart: addToCart
}