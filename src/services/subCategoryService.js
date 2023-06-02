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
                    where: { keyName: inputData.keyName }
                })

                if (existed) {
                    resolve({
                        errCode: 1,
                        message: "This sub category is already existed"
                    })
                } else {
                    await db.SubCategory.create({
                        categoryType: inputData.categoryType,
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
    let arr = ['categoryType', 'keyName', 'valueVI', 'valueEN']
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


let handleGetAllSubCategoryByType = (inputCategoryType) => {
    return new Promise(async (resolve, reject) => {
        try {

            let data = await db.SubCategory.findAll({
                where: { categoryType: inputCategoryType },
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

module.exports = {
    handleGetAllSubCategory: handleGetAllSubCategory,
    handleAddNewSubCategory: handleAddNewSubCategory,
    handleGetAllSubCategoryByType: handleGetAllSubCategoryByType,
    handleDeleteSubCategory: handleDeleteSubCategory
}