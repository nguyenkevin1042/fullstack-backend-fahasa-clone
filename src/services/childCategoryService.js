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

//1. GET ALL CHILD CATEGORY BY SUBCATEGORY ID
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


module.exports = {
    handleGetAllChildCategory: handleGetAllChildCategory,
    handleGetAllChildCategoryBySubCatId: handleGetAllChildCategoryBySubCatId
}