import db from '../models/index';

//1. GET TAG BY TYPE
let handleGetTagByType = (inputType) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputType) {
                resolve({
                    errCode: 1,
                    message: "Missing type parameter!"
                })
            } else {
                let tags = await db.Tag.findAll({
                    where: { type: inputType },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                })

                if (tags && tags.length > 0) {
                    resolve({
                        errCode: 0,
                        tags
                    })
                } else {
                    resolve({
                        errCode: 1,
                        message: "Tag with this keyName is not existed"
                    })
                }
            }

        } catch (error) {
            reject(error);
        }
    });
}

//2. GET ALL TAG
let handleGetAllTag = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let allTags = await db.Tag.findAll({
                attributes: ['type'],
                group: ['type']
            })

            let finalTagData = []

            for (let index = 0; index < allTags.length; index++) {
                let singleTag = await db.Tag.findAll({
                    where: { type: allTags[index].type },
                    attributes: ['keyName', 'valueVI', 'valueEN'],
                    include: [
                        {
                            model: db.ProductTag,
                            attributes: ['productId'],
                            include: [
                                {
                                    model: db.Product,
                                    attributes: ['name', 'keyName', 'price', 'discount', 'image'],
                                },
                            ],
                        },
                    ],
                    nested: true,
                    raw: false
                })

                finalTagData.push(singleTag)

            }

            if (finalTagData && finalTagData.length > 0) {
                resolve({
                    errCode: 0,
                    finalTagData
                })
            } else {
                resolve({
                    errCode: 1,
                    message: "Tag with this keyName is not existed"
                })
            }


        } catch (error) {
            reject(error);
        }
    });
}

//3. GET TAG BY KEYNAME
let handleGetProductsByTagKeyName = (inputKeyName) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputKeyName) {
                resolve({
                    errCode: 1,
                    message: "Missing keyName parameter!"
                })
            } else {
                let tags = await db.Tag.findOne({
                    where: { keyName: inputKeyName },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [
                        {
                            model: db.ProductTag,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            },
                            include: [
                                {
                                    model: db.Product,
                                    attributes: ['name', 'keyName', 'price', 'discount', 'image'],
                                },
                            ],
                        },
                    ],
                    nested: true,
                    raw: false
                })

                if (tags) {
                    let products = tags.ProductTags.map(item => item.Product)

                    resolve({
                        errCode: 0,
                        products
                    })
                } else {
                    resolve({
                        errCode: 1,
                        message: "Tag with this keyName is not existed"
                    })
                }
            }

        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    handleGetProductsByTagKeyName: handleGetProductsByTagKeyName,
    handleGetTagByType: handleGetTagByType,
    handleGetAllTag: handleGetAllTag
}