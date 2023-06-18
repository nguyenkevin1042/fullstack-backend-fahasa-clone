import db from '../models/index';

//1. ADD PRODUCT TAG
let handleCreateProductTag = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {


            if (!inputData.selectedTag) {
                resolve({
                    errCode: 1,
                    messageVI: "Bạn chưa chọn thẻ sản phẩm nào!",
                    messageEN: "You have not chosen any tag!"
                })
            } else if (inputData.listSelectedProductsId.length === 0) {
                resolve({
                    errCode: 1,
                    messageVI: "Bạn chưa chọn bất kỳ sản phẩm nào!",
                    messageEN: "You have not chose any product!"
                })
            } else {
                console.log(inputData)
                for (let index = 0; index < inputData.listSelectedProductsId.length; index++) {
                    await db.ProductTag.create({
                        tagId: inputData.selectedTag.id,
                        productId: inputData.listSelectedProductsId[index],
                    })
                }

                resolve({
                    errCode: 0,
                    messageVI: "Cập nhật thành công!",
                    messageEN: "Update success!"
                })
            }

        } catch (error) {
            reject(error);
        }
    });
}


module.exports = {
    handleCreateProductTag: handleCreateProductTag
}