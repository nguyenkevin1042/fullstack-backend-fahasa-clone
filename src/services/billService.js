import db from '../models/index';
import cartProductService from '../services/cartProductService'
import emailService from './emailService';
import moment from 'moment';


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
                let listProduct = inputData.listProduct
                let createdBill;
                await db.Bill.create({
                    orderedDate: inputData.orderedDate,
                    userId: inputData.userId,
                    userAddressId: inputData.userAddressId,
                    paymentType: inputData.paymentType,
                    totalPrice: inputData.totalPrice,
                    status: 'S1',
                }).then(result => createdBill = result)

                //2. Save product to bill product Table
                for (let index = 0; index < listProduct.length; index++) {
                    await db.BillProduct.create({
                        billId: createdBill.id,
                        productId: listProduct[index].productId,
                        quantity: listProduct[index].quantity,
                        totalPrice: listProduct[index].totalPrice
                    })
                }

                //3. Delete product out of cart product
                for (let index = 0; index < listProduct.length; index++) {
                    let cartId = listProduct[index].cartId
                    let productId = listProduct[index].productId
                    await cartProductService.handleDeleteProductInCart(cartId, productId)
                }

                //4. send email
                let user = await db.User.findOne({
                    where: { id: inputData.userId },
                    attributes: ['email']
                })
                let orderedDate = moment(createdBill.orderedDate).format('DD/MM/YYYY')

                await emailService.sendOrderingSuccessEmail({
                    orderId: createdBill.id,
                    receiverEmail: user.email,
                    orderedDate: orderedDate,
                    totalPrice: parseFloat(createdBill.totalPrice),
                    orderedProductLength: listProduct.length
                })

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
                    attributes: {
                        exclude: ['paymentType', 'createdAt', 'updatedAt']
                    },
                    order: [
                        ['orderedDate', 'DESC'],
                    ],
                    include: [
                        {
                            model: db.AllCode,
                            attributes: ['valueVI', 'valueEN']
                        },
                        {
                            model: db.UserAddress,
                            attributes: ['fullName']
                        },
                        {
                            model: db.BillProduct,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                            include: [
                                {
                                    model: db.Product,
                                    attributes: ['price', 'discount']
                                },
                            ]
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
                order: [
                    ['orderedDate', 'DESC'],
                ],
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
                    where: { id: inputData.billId },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                    raw: false
                })

                if (data) {
                    //1. Update bill status
                    data.status = inputData.statusKeyMap
                    await data.save()

                    //2. Send email to customer
                    let user = await db.User.findOne({
                        where: { id: data.userId },
                        attributes: ['email']
                    })

                    await emailService.sendEmailWhenOrderStatusChange({
                        orderId: data.id,
                        receiverEmail: user.email,
                        billStatus: data.status
                    })

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

//5. GET BILL BY ID
let handleGetBillById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!inputId) {
                resolve({
                    errCode: 1,
                    message: "Missing id parameter!"
                })
            } else {
                let data = await db.Bill.findOne({
                    where: { id: inputId },
                    attributes: {
                        exclude: ['paymentType', 'createdAt', 'updatedAt']
                    },
                    include: [
                        {
                            model: db.AllCode,
                            attributes: ['valueVI', 'valueEN']
                        },
                        {
                            model: db.UserAddress,
                            attributes: ['fullName']
                        },
                        {
                            model: db.BillProduct,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                            include: [
                                {
                                    model: db.Product,
                                    attributes: ['image', 'name', 'id', 'price']
                                },
                            ]
                        }
                    ],
                    nested: true,
                    raw: false
                })

                if (data) {
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

module.exports = {
    handleCreateNewBill: handleCreateNewBill,
    handleGetBillByUserId: handleGetBillByUserId,
    handleGetAllBill: handleGetAllBill,
    handleUpdateBillStatus: handleUpdateBillStatus,
    handleGetBillById: handleGetBillById
}