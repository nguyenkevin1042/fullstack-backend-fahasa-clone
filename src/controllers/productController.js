import productService from '../services/productService'

let addNewProduct = async (req, res) => {
    try {
        let data = await productService.handleAddNewProduct(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addNewProduct: addNewProduct
}