import cartService from '../services/cartService'

let getCartByUserId = async (req, res) => {
    try {
        let data = await cartService.handleGetCartByUserId(req.query.userId);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getCartByUserId: getCartByUserId
}