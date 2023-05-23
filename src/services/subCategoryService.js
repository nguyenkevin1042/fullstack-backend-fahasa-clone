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
                    categoryId: inputData.categoryId,
                    valueVI: inputData.valueVI,
                    valueEN: inputData.valueEN,
                })
                resolve({
                    errCode: 0,
                    message: "Add New Code successful"
                })
            }
            // let data = await db.SubCategory.findAll({
            //     where: { categoryId: inputCategoryId }
            // });
            // resolve({
            //     errCode: 0,
            //     data
            // })

        } catch (error) {
            reject(error);
        }
    });
}


let checkRequiredSubCategoryParams = (dataInput) => {
    let arr = ['categoryId', 'valueVI', 'valueEN']
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


let handleGetAllSubCategoryByCategoryId = (inputCategoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(inputCategoryId)
            let data = await db.SubCategory.findAll({
                where: { categoryId: inputCategoryId },
                raw: true
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

let handleGetAllSubCategory = (inputCategoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(inputCategoryId)
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
    handleGetAllSubCategoryByCategoryId: handleGetAllSubCategoryByCategoryId
}