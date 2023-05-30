import db from '../models/index';
import bcrypt from 'bcryptjs';
var salt = bcrypt.genSaltSync(10);

//1. GET ALL USERS
let handleGetAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                attributes: {
                    exclude: ['password'],
                    raw: true
                }
            });

            resolve({
                errCode: 0,
                data: data
            })

        } catch (error) {
            reject(error);
        }
    });
}

//2.CREATE NEW USER
let handleCreateNewUser = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkParams = checkRequiredSignUpParams(dataInput);
            if (checkParams.isValid === false) {
                resolve({
                    errCode: 1,
                    message: "Missing " + checkParams.element + " parameter!"
                })
            } else {
                let isEmailExisted = await checkEmail(dataInput.email);

                if (isEmailExisted) {
                    resolve({
                        errCode: 2,
                        message: "Email is already existed"
                    })
                } else {
                    let hashedPassword = await hashPasswordFromInput(dataInput.password);

                    if (dataInput.isAdmin === true) {
                        await db.User.create({
                            firstName: dataInput.firstName,
                            lastName: dataInput.lastName,
                            email: dataInput.email,
                            password: hashedPassword,
                            phoneNumber: dataInput.phoneNumber,
                            roleId: 'R1'
                        })
                    } else {
                        await db.User.create({
                            firstName: dataInput.firstName,
                            lastName: dataInput.lastName,
                            email: dataInput.email,
                            password: hashedPassword,
                            phoneNumber: dataInput.phoneNumber,
                            roleId: 'R3'
                        })
                    }

                    resolve({
                        errCode: 0,
                        message: "Save new user successful"
                    })

                }
            }

        } catch (error) {
            reject(error);
        }
    });
}

let checkRequiredSignUpParams = (dataInput) => {
    let arr = ['firstName', 'lastName', 'email', 'phoneNumber',
        'password']
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
                    message: "Email can not be left empty!"
                })
            } else if (!inputPassword) {
                resolve({
                    errCode: 1,
                    message: "Password can not be left empty!"
                })
            } else {
                let userData = {};

                let user = await db.User.findOne({
                    where: { email: inputEmail },
                    raw: true
                });

                //Check user existed or not
                if (user) {
                    let checkPassword = await bcrypt.compareSync(inputPassword, user.password);

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
                            userData.message = "You are not an admin. You are not allowed to access";
                        }
                    } else {
                        userData.errCode = 2;
                        userData.message = "Password is not correct";
                    }
                } else {
                    userData.errCode = 3;
                    userData.message = "Email does not exist";
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
                    message: "Email can not be left empty!"
                })
            } else if (!inputPassword) {
                resolve({
                    errCode: 1,
                    message: "Password can not be left empty!"
                })
            } else {
                let userData = {};

                let user = await db.User.findOne({
                    where: { email: inputEmail },
                    raw: true
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
                        userData.message = "Password is not correct";
                    }
                } else {
                    userData.errCode = 3;
                    userData.message = "Email does not exist";
                }
                resolve(userData)
            }
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleAdminLogin: handleAdminLogin,
    handleCustomerLogin: handleCustomerLogin

}