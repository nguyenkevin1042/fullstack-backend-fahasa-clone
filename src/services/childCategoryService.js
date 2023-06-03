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

//2. GET ALL CHILD CATEGORY BY SUBCATEGORY 
let handleGetAllChildCategoryBySubCat = (subCategory) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!subCategory) {
                resolve({
                    errCode: 1,
                    message: "Missing subCategory parameter!"
                })
            } else {
                let data = await db.ChildCategory.findAll({
                    where: { subCategory: subCategory },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                });

                if (data.length > 0) {
                    resolve({
                        errCode: 0,
                        data
                    })
                } else {
                    resolve({
                        errCode: 1,
                        message: 'This subCategory is not existed'
                    })
                }

            }
            // 

        } catch (error) {
            reject(error);
        }
    });
}

//3. GET CHILD CATEGORY BY KEY NAME
let handleGetChildCategoryByKeyName = (keyName) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!keyName) {
                resolve({
                    errCode: 1,
                    message: "Missing keyName parameter!"
                })
            } else {
                let data = await db.ChildCategory.findAll({
                    where: { keyName: keyName },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [
                        {
                            model: db.SubCategory,
                            include: [
                                {
                                    model: db.AllCode,
                                    attributes: {
                                        exclude: ['createdAt', 'updatedAt']
                                    },
                                }
                            ],
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                        }
                    ],
                    nested: true,
                    raw: false
                });

                if (data.length > 0) {
                    resolve({
                        errCode: 0,
                        data
                    })
                } else {
                    resolve({
                        errCode: 1,
                        message: 'This childCategory is not existed'
                    })
                }

            }

        } catch (error) {
            reject(error);
        }
    });
}

//4. ADD NEW CHILD CATEGORY
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
                let existed = await db.ChildCategory.findOne({
                    where: { keyName: inputData.keyName }
                })


                if (existed) {
                    resolve({
                        errCode: 1,
                        message: "This Child Category is already existed"
                    })
                } else {
                    await db.ChildCategory.create({
                        subCategory: inputData.subCategory,
                        keyName: inputData.keyName,
                        valueVI: inputData.valueVI,
                        valueEN: inputData.valueEN,
                    })
                    resolve({
                        errCode: 0,
                        message: "Add New Child Category successful"
                    })
                }

            }
        } catch (error) {
            reject(error);
        }
    });
}


let checkRequiredChildCategoryParams = (dataInput) => {
    let arr = ['subCategory', 'keyName', 'valueVI', 'valueEN']
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

//5. DELETE CHILD CATEGORY
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
    handleGetAllChildCategoryBySubCat: handleGetAllChildCategoryBySubCat,
    handleGetChildCategoryByKeyName: handleGetChildCategoryByKeyName,
    handleAddNewChildCategory: handleAddNewChildCategory,
    handleDeleteChildCategory: handleDeleteChildCategory
}