import db from '../models/index';

//1. ADD NEW SUB CATEGORY
let handleAddNewSubCategory = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkParams = checkRequiredSubCategoryParams(inputData);
            if (checkParams.isValid === false) {
                resolve({
                    errCode: 1,
                    message: "Missing " + checkParams.element + " parameter!"
                })
            } else {
                let existed = await db.SubCategory.findOne({
                    where: {
                        category: inputData.category,
                        keyName: inputData.keyName
                    }
                })

                if (existed) {
                    resolve({
                        errCode: 1,
                        message: "This sub category is already existed"
                    })
                } else {
                    await db.SubCategory.create({
                        category: inputData.category,
                        keyName: inputData.keyName,
                        valueVI: inputData.valueVI,
                        valueEN: inputData.valueEN,
                    })
                    resolve({
                        errCode: 0,
                        message: "Add New SubCategory successful"
                    })
                }

            }

        } catch (error) {
            reject(error);
        }
    });
}


let checkRequiredSubCategoryParams = (dataInput) => {
    let arr = ['category', 'keyName', 'valueVI', 'valueEN']
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

//2. GET ALL SUB CATEGORY BY CATEGORY TYPE
let handleGetAllSubCategoryByType = (inputCategoryType) => {
    return new Promise(async (resolve, reject) => {
        try {

            let data = await db.SubCategory.findAll({
                where: { category: inputCategoryType },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [
                    {
                        model: db.ChildCategory,
                        as: 'childCategoryData',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        limit: 4,
                    },
                ],
                nested: true,
                raw: false
            });
            resolve({
                errCode: 0,
                data
            })

        } catch (error) {
            reject(error);
        }
    });
}

//3. GET ALL SUB CATEGORY
let handleGetAllSubCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.SubCategory.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                // include: [
                //     {
                //         model: db.Allcodes,
                //         as: 'mainCategoryData'
                //     },
                // ],
                // nested: true,
                // raw: true

            });
            resolve({
                errCode: 0,
                data
            })

        } catch (error) {
            reject(error);
        }
    });
}

//4. DELETE SUB CATEGORY
let handleDeleteSubCategory = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    message: "Missing id parameter!"
                })
            } else {
                let data = await db.SubCategory.findOne({
                    where: { id: inputId }
                });
                if (data) {
                    await db.SubCategory.destroy(
                        {
                            where: { id: inputId }
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

//5. EDIT SUB CATEGORY
let handleEditSubCategory = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {

            let checkParams = checkRequiredSubCategoryParams(inputData)

            if (checkParams.isValid === false) {
                resolve({
                    errCode: 1,
                    message: "Missing " + checkParams.element + " parameter!"
                })
            } else {
                // let existed = await db.AllCode.findOne({
                //     where: { keyMap: inputData.keyMap }
                // })
                // if (existed) {
                //     resolve({
                //         errCode: 1,
                //         message: "This code is already existed!"
                //     })
                // } else {
                //     let code = await db.AllCode.findOne({
                //         where: {
                //             id: inputData.id
                //         },
                //         raw: false
                //     })

                //     if (code) {
                //         code.type = inputData.type;
                //         code.keyMap = inputData.keyMap;
                //         code.valueVI = inputData.valueVI;
                //         code.valueEN = inputData.valueEN;
                //         await code.save()

                //         resolve({
                //             errCode: 0,
                //             message: "Updated successful!"
                //         })
                //     } else {
                //         resolve({
                //             errCode: 2,
                //             message: "Updated fail!"
                //         })
                //     }
                // }

            }
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    handleGetAllSubCategory: handleGetAllSubCategory,
    handleAddNewSubCategory: handleAddNewSubCategory,
    handleGetAllSubCategoryByType: handleGetAllSubCategoryByType,
    handleDeleteSubCategory: handleDeleteSubCategory,
    handleEditSubCategory: handleEditSubCategory
}