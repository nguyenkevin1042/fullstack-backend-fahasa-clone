import db from '../models/index';

//1. CREATE NEW ADDRESS
let handleCreateNewAddress = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkParams = checkRequiredAddressParams(dataInput);
            if (checkParams.isValid === false) {
                resolve({
                    errCode: 1,
                    message: "Missing " + checkParams.element + " parameter!"
                })
            } else {
                await db.UserAddress.create({
                    fullName: dataInput.fullName,
                    phoneNumber: dataInput.phoneNumber,
                    country: dataInput.country,
                    province: dataInput.province,
                    district: dataInput.district,
                    ward: dataInput.ward,
                    addressDetail: dataInput.addressDetail,
                    addressType: dataInput.addressType,
                    userId: dataInput.userId
                })

                let user = await db.User.findOne({
                    where: { id: dataInput.userId },
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    },
                    include: [
                        {
                            model: db.Cart,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                            include: [{
                                model: db.CartProduct,
                                attributes: {
                                    exclude: ['createdAt', 'updatedAt']
                                },
                            },
                            ],
                        },
                        {
                            model: db.UserAddress,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                        }
                    ],
                    nested: true,
                    raw: false
                })

                resolve({
                    errCode: 0,
                    user,
                    message: 'Create success'
                })
            }
        } catch (error) {
            reject(error);
        }
    });
}

let checkRequiredAddressParams = (dataInput) => {
    let arr = ['fullName', 'phoneNumber', 'country', 'province',
        'district', 'ward', 'addressDetail', 'addressType']
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
    handleCreateNewAddress: handleCreateNewAddress
}