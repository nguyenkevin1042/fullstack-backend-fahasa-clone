import db from '../models/index';

//1. ADD PRODUCT TO CART
let handleAddToCart = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkParams = checkRequiredCartProductParams(inputData);

            if (checkParams.isValid === false) {
                resolve({
                    errCode: 1,
                    message: "Missing " + checkParams.element + " parameter!"
                })
            } else {
                let data = await db.CartProduct.findOne({
                    where: {
                        cartId: inputData.cartId,
                        productId: inputData.productId
                    },
                    raw: false,
                    force: true
                })

                let calTotalPrice
                if (data) {
                    data.quantity += inputData.quantity
                    calTotalPrice = inputData.productPrice * data.quantity
                    data.totalPrice = Number(calTotalPrice.toFixed(2))

                    await data.save();

                    resolve({
                        errCode: 0,
                        messageVI: 'Sản phẩm đã được thêm thành công vào giỏ hàng của bạn',
                        messageEN: 'This product has been added to your cart'
                    })
                } else {
                    calTotalPrice = inputData.productPrice * inputData.quantity

                    await db.CartProduct.create({
                        cartId: inputData.cartId,
                        productId: inputData.productId,
                        quantity: inputData.quantity,
                        totalPrice: calTotalPrice.toFixed(2)
                    })

                    resolve({
                        errCode: 0,
                        messageVI: 'Sản phẩm đã được thêm thành công vào giỏ hàng của bạn',
                        messageEN: 'This product has been added to your cart'
                    })
                }

            }
        } catch (error) {
            reject(error);
        }
    });
}

//2. DELETE PRODUCT IN CART
let handleDeleteProductInCart = (inputCartId, inputProductId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputCartId) {
                resolve({
                    errCode: 1,
                    messageVI: 'Missing inputCartId',
                    messageEN: 'Missing inputCartId'
                })
            } else {
                let data = await db.CartProduct.findOne({
                    where: {
                        cartId: inputCartId,
                        productId: inputProductId
                    },
                    raw: false,
                    force: true
                })

                if (data) {
                    await db.CartProduct.destroy(
                        {
                            where: {
                                cartId: inputCartId,
                                productId: inputProductId
                            }
                        }
                    );
                    resolve({
                        errCode: 0,
                        message: 'Delete successful!'
                    })
                }

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
    handleAddToCart: handleAddToCart,
    handleDeleteProductInCart: handleDeleteProductInCart
}