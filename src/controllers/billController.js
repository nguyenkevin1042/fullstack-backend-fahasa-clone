import billService from '../services/billService'

let createNewBill = async (req, res) => {
    try {
        let data = await billService.handleCreateNewBill(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let updateBillStatus = async (req, res) => {
    try {
        let data = await billService.handleUpdateBillStatus(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getBillByUserId = async (req, res) => {
    try {
        let data = await billService.handleGetBillByUserId(req.query.userId);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

let getAllBill = async (req, res) => {
    try {
        let data = await billService.handleGetAllBill();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createNewBill: createNewBill,
    getBillByUserId: getBillByUserId,
    getAllBill: getAllBill,
    updateBillStatus: updateBillStatus
}