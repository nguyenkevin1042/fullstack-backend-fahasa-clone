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
                await db.SubCategory.create({
                    categoryType: inputData.categoryType,
                    valueVI: inputData.valueVI,
                    valueEN: inputData.valueEN,
                })
                resolve({
                    errCode: 0,
                    message: "Add New Code successful"
                })
            }

        } catch (error) {
            reject(error);
        }
    });
}


let checkRequiredSubCategoryParams = (dataInput) => {
    let arr = ['categoryType', 'valueVI', 'valueEN']
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
                }
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
                }
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

module.exports = {
    handleGetAllSubCategory: handleGetAllSubCategory,
    handleAddNewSubCategory: handleAddNewSubCategory,
    handleGetAllSubCategoryByType: handleGetAllSubCategoryByType
}