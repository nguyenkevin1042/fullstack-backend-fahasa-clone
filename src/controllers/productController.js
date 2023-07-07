import productService from '../services/productService'
import redisService from '../redisService'

let addNewProduct = async (req, res) => {
    try {
        let data = await productService.handleAddNewProduct(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let updateProduct = async (req, res) => {
    try {
        let data = await productService.handleUpdateProduct(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let updateProductDiscount = async (req, res) => {
    try {
        setTimeout(async () => {
            let data = await productService.handleUpdateProductDiscount(req.body);
            return res.status(200).json(data);
        }, 2000);
    } catch (error) {
        console.log(error)
    }
}

let getAllProduct = async (req, res) => {
    try {
        let data
        // let dataFromRedis = await redisService.getData('allProducts')
        // if (dataFromRedis) {
        //     data = JSON.parse(dataFromRedis)
        // } else {
        data = await productService.handleGetAllProduct();
        //     await redisService.setData('allProducts', JSON.stringify(data))
        // }

        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getProductById = async (req, res) => {
    try {
        let data
        let productId = req.query.id
        // let dataFromRedis = await redisService.getData(`product-ID-${productId}`)
        // if (dataFromRedis) {
        //     data = JSON.parse(dataFromRedis)
        // } else {
        data = await productService.handleGetProductById(productId);
        //     await redisService.setData(`product-ID-${productId}`, JSON.stringify(data))
        // }


        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getAllProductByCategory = async (req, res) => {
    try {
        let data = await productService.handleGetAllProductByCategory(req.query.category);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getAllProductBySubCategory = async (req, res) => {
    try {
        let data = await productService.handleGetAllProductBySubCategory(req.query.category, req.query.subCategory);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getAllProductByChildCategory = async (req, res) => {
    try {
        let data = await productService.handleGetAllProductByChildCategory(
            req.query.subCategory, req.query.childCategory);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getProductByKeyName = async (req, res) => {
    try {
        let data = await productService.handleGetProductByKeyName(req.query.keyName);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getProductByName = async (req, res) => {
    try {
        let data = await productService.handleGetProductByName(req.query.name);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let deleteProduct = async (req, res) => {
    try {
        let data = await productService.handleDeleteProduct(req.query.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addNewProduct: addNewProduct,
    getAllProduct: getAllProduct,
    getProductByKeyName: getProductByKeyName,
    getProductByName: getProductByName,
    deleteProduct: deleteProduct,
    updateProduct: updateProduct,
    getAllProductByCategory: getAllProductByCategory,
    getAllProductBySubCategory, getAllProductBySubCategory,
    getAllProductByChildCategory: getAllProductByChildCategory,
    updateProductDiscount: updateProductDiscount,
    getProductById: getProductById
}