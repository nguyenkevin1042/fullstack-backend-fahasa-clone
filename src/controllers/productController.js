import productService from '../services/productService'

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

let getAllProduct = async (req, res) => {
    try {
        // setTimeout(async () => {
        let data = await productService.handleGetAllProduct();
        return res.status(200).json(data);
        // }, 5000)
    } catch (error) {
        console.log(error)
    }
}

let getAllProductByCategory = async (req, res) => {
    try {
        // setTimeout(async () => {
        let data = await productService.handleGetAllProductByCategory(req.query.category);
        return res.status(200).json(data);
        // }, 5000)
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
    deleteProduct: deleteProduct,
    updateProduct: updateProduct,
    getAllProductByCategory: getAllProductByCategory
}