import cartService from '../services/cartService'
import redisService from '../redisService'

let getCartByUserId = async (req, res) => {
    try {
        let userId = req.query.userId
        let data
        let dataFromRedis = await redisService.getData(`cartDataByUserID-${userId}`)
        if (dataFromRedis) {
            data = JSON.parse(dataFromRedis)
        } else {
            data = await cartService.handleGetCartByUserId(req.query.userId);
            await redisService.setData(`cartDataByUserID-${userId}`, JSON.stringify(data))
        }

        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getCartByUserId: getCartByUserId
}