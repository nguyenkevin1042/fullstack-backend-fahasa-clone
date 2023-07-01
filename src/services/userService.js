import db from '../models/index';
import bcrypt from 'bcryptjs';
var salt = bcrypt.genSaltSync(10);
import emailService from './emailService';
import redisService from '../redisService'
import { v4 as uuidv4 } from 'uuid';
require("dotenv").config();

//1. GET ALL USERS
let handleGetAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt'],
                },
                include: [
                    {
                        model: db.AllCode,
                        attributes: ['valueVI', 'valueEN'],
                    }
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

//2.CREATE NEW USER
let buildUrlEmail = (token) => {
    let result = process.env.URL_REACT +
        "/verify-sign-up?token=" + token;
    return result;
}

let handleGetValidationKey = (inputEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputEmail) {
                resolve({
                    errCode: 1,
                    messageVI: "Email không được để trống!",
                    messageEN: "Email can not be left empty!"
                })
            } else {
                let key = Math.ceil(Math.random() * 1000000)
                let data = {
                    email: inputEmail,
                    validationKey: key
                }

                await redisService.setTimeoutData(`validationKeyFor-${inputEmail}`, 180, JSON.stringify(data))
                await emailService.sendValidationKeyEmail({
                    receiverEmail: inputEmail,
                    key: key
                })

                resolve({
                    errCode: 0,
                    messageVI: "Mã xác nhận đã được gửi qua email của quý khách. Vui lòng kiểm tra email!",
                    messageEN: "A code has been sent to your email. Please check your email!"
                })
            }
        } catch (error) {
            reject(error);
        }
    });
}

let handleCreateNewUser = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!dataInput.email) {
                resolve({
                    errCode: 1,
                    messageVI: "Email không được để trống!",
                    messageEN: "Email can not be left empty!"
                })
            } else if (!dataInput.password) {
                resolve({
                    errCode: 1,
                    messageVI: "Mật khẩu không được để trống!",
                    messageEN: "Password can not be left empty!"
                })
            } else {
                let isEmailExisted = await checkEmail(dataInput.email);

                if (isEmailExisted) {
                    resolve({
                        errCode: 2,
                        messageVI: "Email đã tồn tại",
                        messageEN: "Email is already existed!"
                    })
                } else {
                    let hashedPassword = await hashPasswordFromInput(dataInput.password);
                    let newUser
                    if (dataInput.isAdmin === true) {
                        await db.User.create({
                            firstName: '',
                            email: dataInput.email,
                            password: hashedPassword,
                            roleId: 'R1'
                        })
                    } else {
                        let newCustomerId
                        let randomName = "Customer_" + (Math.random() + 1).toString(36).substring(2)
                        await db.User.create({
                            firstName: randomName,
                            email: dataInput.email,
                            password: hashedPassword,
                            roleId: 'R3'
                        }).then(result => {
                            newCustomerId = result.id
                            newUser = result
                        });

                        await db.Cart.create({
                            userId: newCustomerId
                        })
                    }

                    resolve({
                        errCode: 0,
                        newUser,
                        messageVI: "Tạo tài khoản thành công!",
                        messageEN: "Create account successful!"
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    });
}

let checkRequiredSignUpParams = (dataInput) => {
    let arr = ['email', 'password']
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

let checkEmail = (emailInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: emailInput }
            })

            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }

        } catch (error) {
            reject(error);
        }
    });
}

let hashPasswordFromInput = (passwordInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hash = await bcrypt.hashSync(passwordInput, salt);

            resolve(hash);
        } catch (error) {
            reject(error);
        }
    });
}

//3. LOGIN
let handleAdminLogin = (inputEmail, inputPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputEmail) {
                resolve({
                    errCode: 1,
                    messageVI: "Email không được để trống!",
                    messageEN: "Email can not be left empty!"
                })
            } else if (!inputPassword) {
                resolve({
                    errCode: 1,
                    messageVI: "Mật khẩu không được để trống!",
                    messageEN: "Password can not be left empty!"
                })
            } else {
                let userData = {};

                let user = await db.User.findOne({
                    where: { email: inputEmail },
                    raw: true
                });

                //Check user existed or not
                if (user) {
                    let checkPassword = bcrypt.compareSync(inputPassword, user.password);

                    //Check input password vs password form DB
                    if (checkPassword) {
                        //check role R1
                        if (user.roleId === 'R1') {
                            let admin = await db.User.findOne({
                                where: { email: inputEmail, roleId: 'R1' },
                                raw: true
                            });
                            userData.errCode = 0;
                            delete user.password;
                            userData.user = admin;
                        } else {
                            userData.errCode = 4;
                            userData.messageVI = "Bạn không phải Admin. Bạn không có quyền truy cập";
                            userData.messageEN = "You are not an admin. You are not allowed to access";
                        }
                    } else {
                        userData.errCode = 2;
                        userData.messageVI = "Email/Mật khẩu sai. Vui lòng kiểm tra lại!";
                        userData.messageEN = "Email/Password is not correct. Please check again!";
                    }
                } else {
                    userData.errCode = 3;
                    userData.messageVI = "Email này không tồn tại trong hệ thống.";
                    userData.messageEN = "Email does not exist.";
                }
                resolve(userData)
            }
        } catch (error) {
            reject(error);
        }
    });
}

let handleCustomerLogin = (inputEmail, inputPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputEmail) {
                resolve({
                    errCode: 1,
                    messageVI: "Email không được để trống!",
                    messageEN: "Email can not be left empty!"
                })
            } else if (!inputPassword) {
                resolve({
                    errCode: 1,
                    messageVI: "Mật khẩu không được để trống!",
                    messageEN: "Password can not be left empty!"
                })
            } else {
                let userData = {};

                let user = await db.User.findOne({
                    where: { email: inputEmail },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [
                        {
                            model: db.AllCode,
                            as: 'genderData',
                            attributes: ['id', 'keyMap', 'valueVI', 'valueEN'],
                        },
                        {
                            model: db.Cart,
                            attributes: ['id'],
                            include: [
                                {
                                    model: db.CartProduct,
                                    attributes: {
                                        exclude: ['createdAt', 'updatedAt']
                                    },
                                },
                            ]
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
                });

                //Check user existed or not
                if (user) {
                    let checkPassword = await bcrypt.compareSync(inputPassword, user.password);

                    //Check input password vs password form DB
                    if (checkPassword) {
                        userData.errCode = 0;
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 2;
                        userData.messageVI = "Email/Mật khẩu sai. Vui lòng kiểm tra lại!";
                        userData.messageEN = "Email/Password is not correct. Please check again!";
                    }
                } else {
                    userData.errCode = 3;
                    userData.messageVI = "Email này không tồn tại trong hệ thống. Vui lòng đăng ký một tài khoản mới";
                    userData.messageEN = "Email does not exist. Please sign up a new account";
                }
                resolve(userData)
            }
        } catch (error) {
            reject(error);
        }
    });
}

//4. UPDATE USER
let handleUpdateUser = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkParams = checkRequiredUpdateParams(dataInput);
            if (checkParams.isValid === false) {
                resolve({
                    errCode: 1,
                    message: "Missing " + checkParams.element + " parameter!"
                })
            } else {
                let user = await db.User.findOne({
                    where: { email: dataInput.email },
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

                if (user) {
                    user.firstName = dataInput.firstName
                    user.lastName = dataInput.lastName
                    user.phoneNumber = dataInput.phoneNumber
                    user.email = dataInput.email
                    user.gender = dataInput.gender

                    await user.save();

                    resolve({
                        errCode: 0,
                        user,
                        messageVI: "Lưu thay đổi thành công!",
                        messageEN: "Save changes successful!",
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    });
}

//5. CHANGE PASSWORD
let handleChangePassword = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataFromRedis = await redisService.getData(`validationKeyFor-${dataInput.email}`)
            if (dataFromRedis) {
                let data = JSON.parse(dataFromRedis)
                let keyFromRedis = data.validationKey.toString();

                if (dataInput.key === keyFromRedis) {
                    let user = await db.User.findOne({
                        where: { email: dataInput.email },
                        raw: false
                    })

                    if (user) {
                        let hashedPassword = await hashPasswordFromInput(dataInput.password);

                        user.password = hashedPassword
                        await user.save()

                        resolve({
                            errCode: 0
                        })
                    } else {
                        resolve({
                            errCode: 1,
                            messageVI: "Không tìm thấy email của quý khách!",
                            messageEN: "Can not find your email!"
                        })
                    }

                } else {
                    resolve({
                        errCode: 1,
                        messageVI: "Mã xác nhận này sai. Vui lòng kiểm tra lại!",
                        messageEN: "This code is wrong. Please check again!"
                    })
                }
            } else {
                resolve({
                    errCode: 1,
                    messageVI: "Mã xác nhận này đã hết hạn. Vui lòng lấy mã mới!",
                    messageEN: "This code is expired. Please get a new code!"
                })
            }
        } catch (error) {
            reject(error);
        }
    });
}

//check input
let checkRequiredUpdateParams = (dataInput) => {
    let arr = ['firstName', 'lastName', 'email', 'phoneNumber']
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

let checkRequiredChangePasswordParams = (dataInput) => {
    let arr = ['email', 'key.', 'key']
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
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleAdminLogin: handleAdminLogin,
    handleCustomerLogin: handleCustomerLogin,
    handleUpdateUser: handleUpdateUser,
    handleGetValidationKey: handleGetValidationKey,
    handleChangePassword: handleChangePassword
}