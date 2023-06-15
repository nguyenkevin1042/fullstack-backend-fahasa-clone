import userAddressService from '../services/userAddressService'

let createNewAddress = async (req, res) => {
    try {
        let data = await userAddressService.handleCreateNewAddress(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createNewAddress: createNewAddress
}