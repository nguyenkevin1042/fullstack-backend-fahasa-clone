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
                let existed = await db.AllCodes.findOne({
                    where: { keyMap: inputData.keyMap }
                })

                if (existed) {
                    resolve({
                        errCode: 1,
                        message: "This code is already existed!"
                    })
                } else {
                    await db.AllCodes.create({
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

let handleConvertToKeyName = (inputName) => {
    inputName = this.handleConvertToNonAccentVietnamese(inputName)
    inputName = inputName.split(' ').join('-');
    inputName = inputName.toLowerCase();
    return inputName;
}

let handleConvertToNonAccentVietnamese = (string) => {
    string = string.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    string = string.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    string = string.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    string = string.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    string = string.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    string = string.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    string = string.replace(/đ/g, "d");

    string = string.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "a");
    string = string.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "e");
    string = string.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "i");
    string = string.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "o");
    string = string.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "u");
    string = string.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "y");
    string = string.replace(/Đ/g, "d");

    return string;
}

//2. GET ALL CODES
let handleGetAllCodes = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let allCodes = await db.AllCodes.findAll({
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
                let code = await db.AllCodes.findOne({
                    where: { id: inputId }
                })

                if (code) {
                    await db.AllCodes.destroy(
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




            // resolve({
            //     errCode: 0,
            //     code
            // })

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
                let code = await db.AllCodes.findOne({
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
                let data = await db.AllCodes.findAll({
                    where: { type: inputType },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [
                        {
                            model: db.SubCategory,
                            as: 'subCategoryData'
                        },
                    ],
                    nested: true,
                    raw: true
                })

                if (data.length > 0) {
                    resolve({
                        errCode: 0,
                        data
                    })
                } else {
                    resolve({
                        errCode: 2,
                        message: "This categpry type does not existed!"
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
                let data = await db.AllCodes.findAll({
                    where: { id: inputId },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [
                        {
                            model: db.SubCategory,
                            as: 'subCategoryData',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                        },
                    ]
                })

                if (data.length > 0) {
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

module.exports = {
    handleAddNewCode: handleAddNewCode,
    handleGetAllCodes: handleGetAllCodes,
    handleDeleteCode: handleDeleteCode,
    handleEditCode: handleEditCode,
    handleGetCodeByType: handleGetCodeByType,
    handleGetCodeById: handleGetCodeById
}