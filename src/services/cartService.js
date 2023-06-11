import db from '../models/index';

let handleGetCartByUserId = (inputUserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputUserId) {
                resolve({
                    errCode: 1,
                    messageVI: 'Missing userId',
                    messageEN: 'Missing userId'
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
                            },
                            include: [
                                {
                                    model: db.Product,
                                    attributes: {
                                        exclude: ['createdAt', 'updatedAt']
                                    }
                                }
                            ]
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

let checkRequiredCartProductParams = (dataInput) => {
    let arr = ['cartId', 'productId', 'quantity']
    let isValid = true;
    let element = '';
    for (let index = 0; index < arr.length; index++) {
        if (!dataInput[arr[index]]) {
            isValid = false;
            element = arr[index]
            break;
        }

    }
    return {
        isValid: isValid,
        element: element
    }
}

module.exports = {
    handleGetCartByUserId: handleGetCartByUserId
}