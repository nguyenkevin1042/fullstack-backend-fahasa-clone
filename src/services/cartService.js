import db from '../models/index';

let handleGetCartByUserId = (inputUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputUserId) {
                resolve({
                    errCode: 1,
                    message: 'Missing userId'
                })
            } else {
                let data = await db.Cart.findOne({
                    where: {
                        userId: inputUserId,
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [
                        {
                            model: db.CartProduct,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            }
                        },
                    ],
                    nested: true,
                    raw: false
                })

                resolve({
                    errCode: 0,
                    data
                })
            }
        } catch (error) {
            reject(error);
        }
    });
}


module.exports = {
    handleGetCartByUserId: handleGetCartByUserId,

}