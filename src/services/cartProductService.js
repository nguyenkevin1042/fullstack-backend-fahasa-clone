import db from '../models/index';

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
                    }
                })

                if (data) {
                    data.quantity += inputData.quantity
                    await data.save();

                    resolve({
                        errCode: 0,
                        messageVI: 'Sản phẩm đã được thêm thành công vào giỏ hàng của bạn',
                        messageEN: 'This product has been added to your cart'
                    })
                } else {
                    await db.CartProduct.create({
                        cartId: inputData.cartId,
                        productId: inputData.productId,
                        quantity: inputData.quantity
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
    handleAddToCart: handleAddToCart
}