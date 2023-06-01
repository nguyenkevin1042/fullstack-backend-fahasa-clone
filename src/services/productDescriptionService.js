import db from '../models/index';

let handleAddProductDescription = (inputProductType, dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkParams;
            let resultId;

            if (inputProductType === 'book') {
                checkParams = checkRequiredBookDescriptionParams(dataInput)
                if (checkParams.isValid === false) {
                    resolve({
                        errCode: 1,
                        message: "Missing " + checkParams.element + " parameter!"
                    })
                } else {
                    await db.BookDescription.create({
                        supplier: dataInput.supplier,
                        author: dataInput.author,
                        translator: dataInput.translator,
                        publisher: dataInput.publisher,
                        language: dataInput.language,
                        pages: dataInput.pages,
                    }).then(result => resultId = result.id);
                }

            }
            if (inputProductType === 'toy') {
                checkParams = checkRequiredToyDescriptionParams(dataInput)
                if (checkParams.isValid === false) {
                    resolve({
                        errCode: 1,
                        message: "Missing " + checkParams.element + " parameter!"
                    })
                } else {
                    await db.ToyDescription.create({
                        age: dataInput.age,
                        supplier: dataInput.supplier,
                        publishYear: dataInput.publishYear,
                        brand: dataInput.brand,
                        origin: dataInput.origin,
                        madeBy: dataInput.madeBy,
                        color: dataInput.color,
                        specification: dataInput.specification,
                        warning: dataInput.warning,
                        usage: dataInput.usage,
                    }).then(result => resultId = result.id);
                }

            }
            if (inputProductType === 'stationary') {
                checkParams = checkRequiredStationaryDescriptionParams(dataInput)
                if (checkParams.isValid === false) {
                    resolve({
                        errCode: 1,
                        message: "Missing " + checkParams.element + " parameter!"
                    })
                } else {
                    await db.StationaryDescription.create({
                        supplier: dataInput.supplier,
                        brand: dataInput.brand,
                        origin: dataInput.origin,
                        color: dataInput.color,
                        material: dataInput.material,
                        quantity: dataInput.quantity,
                        madeBy: dataInput.madeBy,
                    }).then(result => resultId = result.id);
                }

            }

            resolve(resultId)

        } catch (error) {
            reject(error);
        }
    });
}


let checkRequiredBookDescriptionParams = (dataInput) => {
    let arr = ['supplier', 'author', 'translator', 'publisher', 'language', 'pages']
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

let checkRequiredToyDescriptionParams = (dataInput) => {
    let arr = ['age', 'supplier', 'publishYear', 'brand', 'origin',
        'madeBy', 'color', 'specification', 'warning', 'usage']
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

let checkRequiredStationaryDescriptionParams = (dataInput) => {
    let arr = ['supplier', 'brand', 'origin', 'color',
        'material', 'quantity', 'madeBy']
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

    handleAddProductDescription: handleAddProductDescription
}