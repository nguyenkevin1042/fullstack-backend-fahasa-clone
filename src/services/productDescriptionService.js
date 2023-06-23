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
                        chapter: dataInput.chapter,
                    }).then(result => resultId = result.id);
                }
            }
            console.log(resultId)
            // if (inputProductType === 'toy') {
            //     checkParams = checkRequiredToyDescriptionParams(dataInput)
            //     if (checkParams.isValid === false) {
            //         resolve({
            //             errCode: 1,
            //             message: "Missing " + checkParams.element + " parameter!"
            //         })
            //     } else {
            //         await db.ToyDescription.create({
            //             age: dataInput.age,
            //             supplier: dataInput.supplier,
            //             publishYear: dataInput.publishYear,
            //             brand: dataInput.brand,
            //             origin: dataInput.origin,
            //             madeBy: dataInput.madeBy,
            //             color: dataInput.color,
            //             material: dataInput.material,
            //             specification: dataInput.specification,
            //             warning: dataInput.warning,
            //             usage: dataInput.usage,
            //         }).then(result => resultId = result.id);
            //     }

            // }
            // if (inputProductType === 'stationary') {
            //     checkParams = checkRequiredStationaryDescriptionParams(dataInput)
            //     if (checkParams.isValid === false) {
            //         resolve({
            //             errCode: 1,
            //             message: "Missing " + checkParams.element + " parameter!"
            //         })
            //     } else {
            //         await db.StationaryDescription.create({
            //             supplier: dataInput.supplier,
            //             brand: dataInput.brand,
            //             origin: dataInput.origin,
            //             color: dataInput.color,
            //             material: dataInput.material,
            //             quantity: dataInput.quantity,
            //             madeBy: dataInput.madeBy,
            //         }).then(result => resultId = result.id);
            //     }

            // }

            resolve({
                errCode: 0,
                resultId
            })

        } catch (error) {
            reject(error);
        }
    });
}

let handleUpdateProductDescription = (inputProductType, dataInput,
    bookDescriptionId, stationaryDescriptionId, toyDescriptionId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkParams, resultId;

            if (inputProductType === 'book') {
                checkParams = checkRequiredBookDescriptionParams(dataInput)
                if (checkParams.isValid === false) {
                    resolve({
                        errCode: 1,
                        message: "Missing " + checkParams.element + " parameter!"
                    })
                } else {
                    let existed = await db.BookDescription.findOne({
                        where: { id: bookDescriptionId },
                        raw: false
                    })

                    if (existed) {
                        existed.supplier = dataInput.supplier
                        existed.author = dataInput.author
                        existed.translator = dataInput.translator
                        existed.publisher = dataInput.publisher
                        existed.language = dataInput.language
                        existed.pages = dataInput.pages
                        existed.chapter = dataInput.chapter
                        await existed.save();
                    } else {
                        await db.BookDescription.create({
                            supplier: dataInput.supplier,
                            author: dataInput.author,
                            translator: dataInput.translator,
                            publisher: dataInput.publisher,
                            language: dataInput.language,
                            pages: dataInput.pages,
                            chapter: dataInput.chapter,
                        }).then(result => resultId = result.id);
                    }

                    resolve({
                        errCode: 0,
                        message: "Update Book Description Successful",
                        resultId
                    })
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
                    let existed = await db.ToyDescription.findOne({
                        where: { id: toyDescriptionId },
                        raw: false
                    })

                    if (existed) {
                        existed.age = dataInput.age
                        existed.supplier = dataInput.supplier
                        existed.brand = dataInput.brand
                        existed.origin = dataInput.origin
                        existed.madeBy = dataInput.madeBy
                        existed.color = dataInput.color
                        existed.material = dataInput.material
                        existed.specification = dataInput.specification
                        existed.warning = dataInput.warning
                        existed.usage = dataInput.usage

                        await existed.save();
                    } else {
                        await db.ToyDescription.create({
                            age: dataInput.age,
                            supplier: dataInput.supplier,
                            publishYear: dataInput.publishYear,
                            brand: dataInput.brand,
                            origin: dataInput.origin,
                            madeBy: dataInput.madeBy,
                            color: dataInput.color,
                            material: dataInput.material,
                            specification: dataInput.specification,
                            warning: dataInput.warning,
                            usage: dataInput.usage,
                        }).then(result => resultId = result.id);
                    }

                    resolve({
                        errCode: 0,
                        message: "Update Toy Description Successful",
                        resultId
                    })
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
                    let existed = await db.StationaryDescription.findOne({
                        where: { id: stationaryDescriptionId },
                        raw: false
                    })

                    if (existed) {
                        existed.supplier = dataInput.supplier
                        existed.brand = dataInput.brand
                        existed.origin = dataInput.origin
                        existed.color = dataInput.color
                        existed.material = dataInput.material
                        existed.quantity = dataInput.quantity
                        existed.madeBy = dataInput.madeBy
                        await existed.save();
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

                    resolve({
                        errCode: 0,
                        message: "Update Stationary Description Successful",
                        resultId
                    })
                }
            }

        } catch (error) {
            reject(error);
        }
    });
}

let handleDeleteProductDescription = (bookDescriptionId, stationaryDescriptionId, toyDescriptionId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (bookDescriptionId) {
                let data = await db.BookDescription.findOne({
                    where: { id: bookDescriptionId }
                })
                if (data) {
                    await db.BookDescription.destroy({
                        where: { id: bookDescriptionId }
                    })
                }
            }
            if (stationaryDescriptionId) {
                await db.StationaryDescription.destroy({
                    where: { id: stationaryDescriptionId }
                })
            }
            if (bookDescriptionId) {
                await db.ToyDescription.destroy({
                    where: { id: toyDescriptionId }
                })
            }
        } catch (error) {
            reject(error);
        }
    });
}


let checkRequiredBookDescriptionParams = (dataInput) => {
    let arr = ['supplier', 'author']
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
    let arr = ['age', 'supplier', 'brand', 'origin',
        'madeBy', 'color', 'material', 'specification', 'warning', 'usage']
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
    handleDeleteProductDescription: handleDeleteProductDescription,
    handleAddProductDescription: handleAddProductDescription,
    handleUpdateProductDescription: handleUpdateProductDescription
}