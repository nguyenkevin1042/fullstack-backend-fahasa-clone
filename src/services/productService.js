import db from '../models/index';

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
                console.log(inputData)
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
                })
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


let checkRequiredProductParams = (dataInput) => {
    let arr = ['name', 'price', 'discount', 'weight', 'length', 'width', 'height',
        'image', 'childCategoryId']
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
    handleAddNewProduct: handleAddNewProduct
}