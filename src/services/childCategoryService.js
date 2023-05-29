import db from '../models/index';

//1. GET ALL CHILD CATEGORY
let handleGetAllChildCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.ChildCategory.findAll();
            resolve({
                errCode: 0,
                data
            })

        } catch (error) {
            reject(error);
        }
    });
}

//2. GET ALL CHILD CATEGORY BY SUBCATEGORY ID
let handleGetAllChildCategoryBySubCatId = (subCategoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(subCategoryId);return;
            let data = await db.ChildCategory.findAll({
                where: { subCategoryId: subCategoryId },
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

//3. ADD NEW CHILD CATEGORY
let handleAddNewChildCategory = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkParams = checkRequiredChildCategoryParams(inputData);

            if (checkParams.isValid === false) {
                resolve({
                    errCode: 1,
                    message: "Missing " + checkParams.element + " parameter!"
                })
            } else {
                await db.ChildCategory.create({
                    subCategoryId: inputData.subCategoryId,
                    valueVI: inputData.valueVI,
                    valueEN: inputData.valueEN,
                })
                resolve({
                    errCode: 0,
                    message: "Add New Child Category successful"
                })
            }
        } catch (error) {
            reject(error);
        }
    });
}


let checkRequiredChildCategoryParams = (dataInput) => {
    let arr = ['subCategoryId', 'valueVI', 'valueEN']
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

//4. DELETE CHILD CATEGORY
let handleDeleteChildCategory = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    message: 'Missing id parameter!'
                })
            } else {
                let code = await db.ChildCategory.findOne({
                    where: { id: inputId }
                })

                if (code) {
                    await db.ChildCategory.destroy(
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

module.exports = {
    handleGetAllChildCategory: handleGetAllChildCategory,
    handleGetAllChildCategoryBySubCatId: handleGetAllChildCategoryBySubCatId,
    handleAddNewChildCategory: handleAddNewChildCategory,
    handleDeleteChildCategory: handleDeleteChildCategory
}