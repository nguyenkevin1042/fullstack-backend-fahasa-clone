import db from '../models/index';

//1. ADD NEW CODE
let handleAddNewCode = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {

            let checkParams = checkRequiredCodesParams(inputData);


            if (checkParams.isValid === false) {
                resolve({
                    errCode: 1,
                    message: "Missing " + checkParams.element + " parameter!"
                })
            } else {
                //check if keyMap is existed
                let existed = await db.AllCode.findOne({
                    where: { keyMap: inputData.keyMap }
                })

                if (existed) {
                    resolve({
                        errCode: 1,
                        message: "This code is already existed!"
                    })
                } else {
                    await db.AllCode.create({
                        type: inputData.type,
                        keyMap: inputData.keyMap,
                        valueVI: inputData.valueVI,
                        valueEN: inputData.valueEN,
                    })
                    resolve({
                        errCode: 0,
                        message: "Add New Category successful"
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    });
}

let checkRequiredCodesParams = (dataInput) => {
    let arr = ['type', 'keyMap', 'valueVI', 'valueEN']
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

//2. GET ALL CODES
let handleGetAllCodes = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allCodes = await db.AllCode.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                    raw: true
                }
            })

            resolve({
                errCode: 0,
                allCodes
            })

        } catch (error) {
            reject(error);
        }
    });
}

//3. DELETE CODE
let handleDeleteCode = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    message: 'Missing id parameter!'
                })
            } else {
                let code = await db.AllCode.findOne({
                    where: { id: inputId }
                })

                if (code) {
                    await db.AllCode.destroy(
                        {
                            where: { id: inputId }
                        }
                    );
                    resolve({
                        errCode: 0,
                        message: 'Delete successful!'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        message: 'ID does not exist!'
                    })
                }
            }

        } catch (error) {
            reject(error);
        }
    });
}

//4. EDIT CODE
let handleEditCode = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {

            let checkParams = checkRequiredCodesParams(inputData)

            if (checkParams.isValid === false) {
                resolve({
                    errCode: 1,
                    message: "Missing " + checkParams.element + " parameter!"
                })
            } else {
                let existed = await db.AllCode.findOne({
                    where: { keyMap: inputData.keyMap }
                })
                if (existed) {
                    resolve({
                        errCode: 1,
                        message: "This code is already existed!"
                    })
                } else {
                    let code = await db.AllCode.findOne({
                        where: {
                            id: inputData.id
                        },
                        raw: false
                    })

                    if (code) {
                        code.type = inputData.type;
                        code.keyMap = inputData.keyMap;
                        code.valueVI = inputData.valueVI;
                        code.valueEN = inputData.valueEN;
                        await code.save()

                        resolve({
                            errCode: 0,
                            message: "Updated successful!"
                        })
                    } else {
                        resolve({
                            errCode: 2,
                            message: "Updated fail!"
                        })
                    }
                }

            }
        } catch (error) {
            reject(error);
        }
    });
}

//5. GET CODE BY TYPE
let handleGetCodeByType = (inputType) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!inputType) {
                resolve({
                    errCode: 1,
                    message: "Missing type parameter!"
                })
            } else {
                let data = await db.AllCode.findAll({
                    where: { type: inputType },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [
                        {
                            model: db.SubCategory,
                            include: [
                                {
                                    model: db.ChildCategory,
                                    attributes: {
                                        exclude: ['subCategory', 'createdAt', 'updatedAt']
                                    },
                                }
                            ],
                            attributes: {
                                exclude: ['category', 'createdAt', 'updatedAt']
                            },
                        }
                    ],
                    nested: true,
                    raw: false
                })

                if (data.length > 0) {
                    // switch (inputType) {
                    //     case 'category':
                    //         resolve({
                    //             errCode: 0,
                    //             categoriesData: data
                    //         })
                    //     case 'booklayout':
                    //         resolve({
                    //             errCode: 0,
                    //             bookLayoutData: data
                    //         })

                    //     default:
                    //         return null
                    // }
                    resolve({
                        errCode: 0,
                        data
                    })
                } else {
                    resolve({
                        errCode: 2,
                        message: "This category type does not existed!"
                    })
                }

            }
        } catch (error) {
            reject(error);
        }
    });
}

//6. GET CODE BY ID
let handleGetCodeById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    message: "Missing id parameter!"
                })
            } else {
                let data = await db.AllCode.findOne({
                    where: { id: inputId },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }

                })

                if (data) {
                    resolve({
                        errCode: 0,
                        data
                    })
                } else {
                    resolve({
                        errCode: 2,
                        message: "This id does not existed!"
                    })
                }

            }



        } catch (error) {
            reject(error);
        }
    });
}

//6. GET CODE BY KEY MAP
let handleGetCodeByKeyMap = (inputKeymap) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputKeymap) {
                resolve({
                    errCode: 1,
                    message: "Missing keyMap parameter!"
                })
            } else {
                let data = await db.AllCode.findOne({
                    where: { keyMap: inputKeymap },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    // include: [
                    //     {
                    //         model: db.SubCategory,
                    //         include: [
                    //             {
                    //                 model: db.ChildCategory,
                    //                 attributes: {
                    //                     exclude: ['createdAt', 'updatedAt']
                    //                 },
                    //                 include: [
                    //                     {
                    //                         model: db.Product,
                    //                         attributes: {
                    //                             exclude: ['image', 'createdAt', 'updatedAt']
                    //                         },
                    //                     }
                    //                 ],
                    //             }
                    //         ],
                    //         attributes: {
                    //             exclude: ['createdAt', 'updatedAt']
                    //         },
                    //     }
                    // ],
                    // nested: true,
                    // raw: false

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
    handleAddNewCode: handleAddNewCode,
    handleGetAllCodes: handleGetAllCodes,
    handleDeleteCode: handleDeleteCode,
    handleEditCode: handleEditCode,
    handleGetCodeByType: handleGetCodeByType,
    handleGetCodeById: handleGetCodeById,
    handleGetCodeByKeyMap: handleGetCodeByKeyMap
}