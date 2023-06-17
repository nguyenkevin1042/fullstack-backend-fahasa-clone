import db from '../models/index';
import cartProductService from '../services/cartProductService'

//1. CREATE NEW BILL
let handleCreateNewBill = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkParams = checkRequiredBillParams(inputData);
            if (checkParams.isValid === false) {
                resolve({
                    errCode: 1,
                    message: "Missing " + checkParams.element + " parameter!"
                })
            } else {
                //1. Create bill
                await db.Bill.create({
                    orderedDate: inputData.orderedDate,
                    userId: inputData.userId,
                    userAddressId: inputData.userAddressId,
                    paymentType: inputData.paymentType,
                    totalPrice: inputData.totalPrice,
                    status: 'S1',
                })
                //2. Save product to bill product Table

                //3. Delete product out of cartproduct
                let listProduct = inputData.listProduct;
                for (let index = 0; index < listProduct.length; index++) {
                    let cartId = listProduct[index].cartId
                    let productId = listProduct[index].productId
                    await cartProductService.handleDeleteProductInCart(cartId, productId)
                }

                resolve({
                    errCode: 0,
                    message: 'success'
                })
            }

        } catch (error) {
            reject(error);
        }
    });
}

//2. GET ALL BILLS BY USER ID
let handleGetBillByUserId = (inputUserId) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!inputUserId) {
                resolve({
                    errCode: 1,
                    message: "Missing userId parameter!"
                })
            } else {
                let data = await db.Bill.findAll({
                    where: { userId: inputUserId },
                    include: [
                        {
                            model: db.AllCode,
                            attributes: ['valueVI', 'valueEN']
                        },
                        {
                            model: db.UserAddress,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            }
                        }
                    ]
                })

                if (data && data.length > 0) {
                    resolve({
                        errCode: 0,
                        data
                    })
                } else {
                    resolve({
                        errCode: 1,
                        messageVI: 'Bạn hiện tại chưa có đơn hàng nào',
                        messageEN: 'You currently do not have any orders'
                    })
                }
            }

        } catch (error) {
            reject(error);
        }
    });
}

let checkRequiredBillParams = (dataInput) => {
    let arr = ['orderedDate', 'userId', 'userAddressId', 'paymentType', 'totalPrice']
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

//3. GET ALL BILL
let handleGetAllBill = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Bill.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                include: [
                    {
                        model: db.AllCode,
                        attributes: ['keyMap', 'valueVI', 'valueEN']
                    },
                    {
                        model: db.UserAddress,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }
                ],
                nested: true,
                raw: false
            })

            if (data && data.length > 0) {
                resolve({
                    errCode: 0,
                    data
                })
            } else {
                resolve({
                    errCode: 1,
                    data: []
                })
            }

        } catch (error) {
            reject(error);
        }
    });
}

//4. UPDATE BILL STATUS
let handleUpdateBillStatus = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.billId) {
                resolve({
                    errCode: 1,
                    message: "Missing billId parameter!"
                })
            } else if (!inputData.statusKeyMap) {
                resolve({
                    errCode: 1,
                    message: "Missing statusKeyMap parameter!"
                })
            } else {
                let data = await db.Bill.findOne({
                    where: { id: inputData.billId }
                })
                console.log(data)
                if (data) {
                    data.status = inputData.statusKeyMap
                    await data.save()

                    resolve({
                        errCode: 0,
                        message: "Success"
                    })
                }
            }

        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    handleCreateNewBill: handleCreateNewBill,
    handleGetBillByUserId: handleGetBillByUserId,
    handleGetAllBill: handleGetAllBill,
    handleUpdateBillStatus: handleUpdateBillStatus
}