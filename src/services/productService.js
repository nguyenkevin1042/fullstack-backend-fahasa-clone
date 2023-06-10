import { forEach, result } from 'lodash';
import db from '../models/index';
import productDescriptionService from './productDescriptionService'

//1. ADD NEW PRODUCT
let handleAddNewProduct = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkParams = checkRequiredProductParams(inputData);
            if (checkParams.isValid === false) {
                resolve({
                    errCode: 1,
                    message: "Missing " + checkParams.element + " parameter!"
                })
            } else {
                let result = await productDescriptionService.handleAddProductDescription(inputData.productType, inputData.descriptionData);
                let insertedProductId

                if (result.errCode === 0) {
                    await db.Product.create({
                        name: inputData.name,
                        keyName: inputData.keyName,
                        price: inputData.price,
                        discount: inputData.discount,
                        weight: inputData.weight,
                        height: inputData.height,
                        width: inputData.width,
                        length: inputData.length,
                        publishYear: inputData.publishYear,
                        categoryKeyName: inputData.categoryKeyName,
                        image: inputData.image,
                    }).then(result => insertedProductId = result.id);

                    await db.ProductMarkdown.create({
                        productId: insertedProductId,
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                    })

                    let insertedProduct = await db.Product.findOne({
                        where: { id: insertedProductId },
                        raw: false
                    })

                    if (insertedProduct && inputData.productType === 'book') {
                        insertedProduct.bookDescriptionId = result.resultId;
                    } else if (inputData.productType === 'toy') {
                        insertedProduct.toyDescriptionId = result.resultId;
                    } else {
                        insertedProduct.stationaryDescriptionId = result.resultId;
                    }

                    await insertedProduct.save();

                    resolve({
                        errCode: 0,
                        message: "Add New Product successful"
                    })
                } else {
                    resolve(result)
                }
            }

        } catch (error) {
            reject(error);
        }
    });
}

//2. GET ALL PRODUCTS
let handleGetAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allProducts = await db.Product.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [
                    {
                        model: db.BookDescription,
                        as: 'bookDescriptionData',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                    },
                    {
                        model: db.StationaryDescription,
                        as: 'stationaryDescriptionData',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                    },
                    {
                        model: db.ToyDescription,
                        as: 'toyDescriptionData',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                    },
                    {
                        model: db.ProductMarkdown,
                        as: 'markdownData',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                    },
                    {
                        model: db.ChildCategory,
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
                allProducts
            })

        } catch (error) {
            reject(error);
        }
    });
}

//3. GET PRODUCT BY KEYNAME
let handleGetProductByKeyName = (inputKeyName) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputKeyName) {
                resolve({
                    errCode: 1,
                    message: "Missing keyName parameter!"
                })
            } else {
                let product = await db.Product.findOne({
                    where: { keyName: inputKeyName },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [
                        {
                            model: db.BookDescription,
                            as: 'bookDescriptionData',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                        },
                        {
                            model: db.StationaryDescription,
                            as: 'stationaryDescriptionData',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                        },
                        {
                            model: db.ToyDescription,
                            as: 'toyDescriptionData',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                        },
                        {
                            model: db.ProductMarkdown,
                            as: 'markdownData',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                        }
                    ],
                    nested: true,
                    raw: false
                })

                if (product) {
                    resolve({
                        errCode: 0,
                        product
                    })
                } else {
                    resolve({
                        errCode: 1,
                        message: "Product with this keyName is not existed"
                    })
                }
            }

        } catch (error) {
            reject(error);
        }
    });
}

//4. DELETE PRODUCT
let handleDeleteProduct = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    message: 'Missing id parameter!'
                })
            } else {
                let data = await db.Product.findOne({
                    where: { id: inputId }
                })

                if (data) {
                    await db.Product.destroy(
                        {
                            where: { id: inputId }
                        }
                    );
                    await db.ProductMarkdown.destroy(
                        {
                            where: { productId: inputId }
                        }
                    );
                    resolve({
                        errCode: 0,
                        message: 'Delete product successful!'
                    })
                } else {
                    resolve({
                        errCode: 1,
                        message: 'Product id is not existed'
                    })
                }
            }

        } catch (error) {
            reject(error);
        }
    });
}

//5. UPDATE PRODUCT
let handleUpdateProduct = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkParams = checkRequiredProductParams(inputData);

            if (checkParams.isValid === false) {
                resolve({
                    errCode: 1,
                    message: "Missing " + checkParams.element + " parameter!"
                })
            } else {

                let existedProduct = await db.Product.findOne({
                    where: { id: inputData.id },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [
                        {
                            model: db.BookDescription,
                            as: 'bookDescriptionData',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                        },
                        {
                            model: db.ProductMarkdown,
                            as: 'markdownData',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                        }
                    ],
                    nested: true,
                    raw: false
                })

                if (existedProduct) {
                    // Firstly, updated product table
                    existedProduct.name = inputData.name
                    existedProduct.keyName = inputData.keyName
                    existedProduct.price = inputData.price
                    existedProduct.discount = inputData.discount
                    existedProduct.weight = inputData.weight
                    existedProduct.height = inputData.height
                    existedProduct.width = inputData.width
                    existedProduct.length = inputData.length
                    existedProduct.publishYear = inputData.publishYear
                    existedProduct.categoryKeyName = inputData.categoryKeyName
                    existedProduct.image = inputData.image

                    //Secondly, update Markdown
                    let existedMarkdown = await db.ProductMarkdown.findOne({
                        where: { productId: inputData.id },
                        raw: false
                    })

                    if (existedMarkdown) {
                        existedMarkdown.contentHTML = inputData.contentHTML
                        existedMarkdown.contentMarkdown = inputData.contentMarkdown
                        await existedMarkdown.save()
                    } else {
                        await db.ProductMarkdown.create({
                            productId: inputData.id,
                            contentHTML: inputData.contentHTML,
                            contentMarkdown: inputData.contentMarkdown,
                        })
                    }

                    //finally, updated product description
                    let result = await productDescriptionService.handleUpdateProductDescription
                        (inputData.productType, inputData.descriptionData, inputData.bookDescriptionId,
                            inputData.stationaryDescriptionId, inputData.toyDescriptionId);

                    if (inputData.productType === 'book') {
                        existedProduct.bookDescriptionId = result.resultId;
                    }
                    if (inputData.productType === 'stationary') {
                        existedProduct.stationaryDescriptionId = result.resultId;
                    }
                    if (inputData.productType === 'toy') {
                        existedProduct.toyDescriptionId = result.resultId;
                    }


                    if (result.errCode === 0) {
                        await existedProduct.save()
                        resolve({
                            errCode: 0,
                            message: 'Update successful'
                        })
                    } else {
                        resolve({
                            errCode: 1,
                            message: 'Update Fail'
                        })
                    }
                } else {
                    resolve({
                        errCode: 1,
                        message: "This product is not existed"
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    });
}

//6. GET ALL PRODUCTS BY CATEGORY
let handleGetAllProductByCategory = (inputCategory) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputCategory) {
                resolve({
                    errCode: 1,
                    message: 'Missing category parameter!'
                })
            } else {
                let data = await db.AllCode.findAll({
                    where: { keyMap: inputCategory },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [
                        {
                            model: db.SubCategory,
                            include: [
                                {
                                    model: db.ChildCategory,
                                    attributes: {
                                        exclude: ['createdAt', 'updatedAt']
                                    },
                                    include: [
                                        {
                                            model: db.Product,
                                            attributes: ['name', 'keyName', 'price', 'discount', 'image']
                                        }
                                    ],
                                }
                            ],
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                        }
                    ],
                    nested: true,
                    raw: false

                })

                if (data && data.length > 0) {
                    let allProducts = []
                    let subCategories = data[0].SubCategories

                    for (let i = 0; i < subCategories.length; i++) {
                        let childCategory = subCategories[i].ChildCategories

                        for (let j = 0; j < childCategory.length; j++) {
                            let products = childCategory[j].Products

                            for (let k = 0; k < products.length; k++) {
                                allProducts.push(products[k])
                            }
                        }
                    }

                    resolve({
                        errCode: 0,
                        message: "Success",
                        allProducts
                    })
                } else {
                    resolve({
                        errCode: 1,
                        message: "This category does not exist"
                    })
                }


            }
        } catch (error) {
            reject(error);
        }
    });
}

//7. GET ALL PRODUCTS BY SUB CATEGORY
let handleGetAllProductBySubCategory = (inputCategory, inputSubCategory) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputCategory) {
                resolve({
                    errCode: 1,
                    message: 'Missing category parameter!'
                })
            }
            else if (!inputSubCategory) {
                resolve({
                    errCode: 1,
                    message: 'Missing sub category parameter!'
                })
            } else {

                let data = await db.SubCategory.findAll({
                    where: {
                        category: inputCategory,
                        keyName: inputSubCategory
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [
                        {
                            model: db.ChildCategory,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                            include: [
                                {
                                    model: db.Product,
                                    attributes: ['name', 'keyName', 'price', 'discount', 'image']
                                }
                            ],
                        }
                    ],
                    nested: true,
                    raw: false

                })

                let allProducts = []
                if (data && data.length > 0) {
                    let childCategory = data[0].ChildCategories

                    for (let i = 0; i < childCategory.length; i++) {
                        let products = childCategory[i].Products

                        for (let j = 0; j < products.length; j++) {
                            allProducts.push(products[j])

                        }
                    }

                    resolve({
                        errCode: 0,
                        message: "Success",
                        allProducts
                    })
                } else {
                    resolve({
                        errCode: 1,
                        message: 'These categories are not existed'
                    })
                }


            }
        } catch (error) {
            reject(error);
        }
    });
}

//8. GET ALL PRODUCTS BY CHILD CATEGORY
let handleGetAllProductByChildCategory = (inputSubCategory, inputChildCategory) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputSubCategory) {
                resolve({
                    errCode: 1,
                    message: 'Missing sub category parameter!'
                })
            }
            else if (!inputChildCategory) {
                resolve({
                    errCode: 1,
                    message: 'Missing child category parameter!'
                })
            } else {

                let data = await db.ChildCategory.findAll({
                    where: {
                        subCategory: inputSubCategory,
                        keyName: inputChildCategory
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [
                        {
                            model: db.Product,
                            attributes: ['name', 'keyName', 'price', 'discount', 'image']

                        }
                    ],
                    nested: true,
                    raw: false

                })

                let allProducts = []
                if (data && data.length > 0) {
                    let products = data[0].Products

                    for (let i = 0; i < products.length; i++) {
                        allProducts.push(products[i])
                    }

                    resolve({
                        errCode: 0,
                        message: "Success",
                        allProducts
                    })
                } else {
                    allProducts = []
                    resolve({
                        errCode: 1,
                        // message: 'These categories are not existed',
                        allProducts
                    })
                }


            }
        } catch (error) {
            reject(error);
        }
    });
}

//9. GET PRODUCT BY NAME
let handleGetProductByName = (inputName) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputName) {
                resolve({
                    errCode: 1,
                    message: "Missing name parameter!"
                })
            } else {
                resolve({
                    errCode: 0,
                    inputName
                })
                // let product = await db.Product.findOne({
                //     where: { keyName: inputKeyName },
                //     attributes: {
                //         exclude: ['createdAt', 'updatedAt']
                //     },
                //     include: [
                //         {
                //             model: db.BookDescription,
                //             as: 'bookDescriptionData',
                //             attributes: {
                //                 exclude: ['createdAt', 'updatedAt']
                //             },
                //         },
                //         {
                //             model: db.StationaryDescription,
                //             as: 'stationaryDescriptionData',
                //             attributes: {
                //                 exclude: ['createdAt', 'updatedAt']
                //             },
                //         },
                //         {
                //             model: db.ToyDescription,
                //             as: 'toyDescriptionData',
                //             attributes: {
                //                 exclude: ['createdAt', 'updatedAt']
                //             },
                //         },
                //         {
                //             model: db.ProductMarkdown,
                //             as: 'markdownData',
                //             attributes: {
                //                 exclude: ['createdAt', 'updatedAt']
                //             },
                //         }
                //     ],
                //     nested: true,
                //     raw: false
                // })

                // if (product) {
                //     resolve({
                //         errCode: 0,
                //         product
                //     })
                // } else {
                //     resolve({
                //         errCode: 1,
                //         message: "Product with this keyName is not existed"
                //     })
                // }
            }

        } catch (error) {
            reject(error);
        }
    });
}



let checkRequiredProductParams = (dataInput) => {
    let arr = ['name', 'price', 'discount', 'weight', 'length', 'width', 'height',
        'image', 'keyName', 'categoryKeyName', 'productType', 'publishYear']
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
    handleAddNewProduct: handleAddNewProduct,
    handleGetAllProduct: handleGetAllProduct,
    handleGetProductByKeyName: handleGetProductByKeyName,
    handleGetProductByName: handleGetProductByName,
    handleDeleteProduct: handleDeleteProduct,
    handleUpdateProduct: handleUpdateProduct,
    handleGetAllProductByCategory: handleGetAllProductByCategory,
    handleGetAllProductBySubCategory: handleGetAllProductBySubCategory,
    handleGetAllProductByChildCategory: handleGetAllProductByChildCategory
}