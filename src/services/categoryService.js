import db from '../models/index';

//1. ADD NEW CATEGORY
let handleAddNewCategory = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkParams = checkRequiredCategoryParams(inputData);

            if (checkParams.isValid === false) {
                resolve({
                    errCode: 1,
                    message: "Missing " + checkParams.element + " parameter!"
                })
            } else {
                //check if type is existed
                let existed = await db.SubCategory.findOne({
                    where: { type: inputData.type }
                })

                if (existed) {
                    resolve({
                        errCode: 1,
                        message: "This type is already existed!"
                    })
                } else {
                    await db.SubCategory.create({
                        name: inputData.name,
                        type: inputData.type,
                        categoryId: inputData.categoryId,
                        valueVI: inputData.valueVI,
                        valueEN: inputData.valueEN
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

//2. GET ALL SUB CATEGORIES
let handleGetAllSubCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.SubCategory.findAll();
            resolve({
                errCode: 0,
                data
            })

        } catch (error) {
            reject(error);
        }
    });
}

let checkRequiredCategoryParams = (dataInput) => {
    let arr = ['name', 'type', 'categoryId', 'valueVI', 'valueEN']
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
    handleAddNewCategory: handleAddNewCategory,
    handleGetAllSubCategory: handleGetAllSubCategory
}