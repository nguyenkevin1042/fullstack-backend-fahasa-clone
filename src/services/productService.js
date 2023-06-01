import db from '../models/index';
import productDescriptionService from './productDescriptionService'

//1. ADD NEW PRODUCT
let handleAddNewProduct = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkParams = checkRequiredProductParams(inputData);
            if (checkParams.isValid === false) {
                resolve({
                    errCode: 1,
                    message: "Missing " + checkParams.element + " parameter!"
                })
            } else {
                let resultId = await productDescriptionService.handleAddProductDescription(inputData.productType, inputData.descriptionData);
                let insertedProductId

                await db.Product.create({
                    name: inputData.name,
                    price: inputData.price,
                    discount: inputData.discount,
                    weight: inputData.weight,
                    height: inputData.height,
                    width: inputData.width,
                    length: inputData.length,
                    childCategoryId: inputData.childCategoryId,
                    image: inputData.image,
                }).then(result => insertedProductId = result.id);

                let insertedProduct = await db.Product.findOne({
                    where: { id: insertedProductId },
                    raw: false
                })

                if (insertedProduct && inputData.productType === 'book') {
                    insertedProduct.bookDescriptionId = resultId;
                } else if (inputData.productType === 'toy') {
                    insertedProduct.toyDescriptionId = resultId;
                } else {
                    insertedProduct.stationaryDescriptionId = resultId;
                }

                await insertedProduct.save();

                resolve({
                    errCode: 0,
                    message: "Add New Product successful"
                })
            }

        } catch (error) {
            reject(error);
        }
    });
}

//2. GET ALL PRODUCTS
let handleGetAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allProducts = await db.Product.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                // include: [
                //     {
                //         model: db.BookDescription,
                //         as: 'bookDescriptionData',
                //         attributes: {
                //             exclude: ['createdAt', 'updatedAt']
                //         },
                //     },
                // ],
                // nested: true,
                // raw: false
            })

            resolve({
                errCode: 0,
                allProducts
            })

        } catch (error) {
            reject(error);
        }
    });
}

let checkRequiredProductParams = (dataInput) => {
    let arr = ['name', 'price', 'discount', 'weight', 'length', 'width', 'height',
        'image', 'childCategoryId', 'productType']
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
    handleAddNewProduct: handleAddNewProduct,
    handleGetAllProduct: handleGetAllProduct
}