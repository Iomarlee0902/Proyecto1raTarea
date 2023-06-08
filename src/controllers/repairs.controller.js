const Repair = require('../models/repair.model');

exports.findAllRepair = async (req, res) => {
    try {

        const repairs = await Repair.findAll({
            where:{
                status: 'pending',
            }
        })

        return res.status(200).json ({
            status: 'success',
            repairs,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong 🎇'
        })
    }
}

exports.create = async(req, res) => {
    try {

        const { date, userId } = req.body;

        const reapir = await Repair.create({ date, userId });

        return res.status(200).json ({
            status: 'success',
            repair,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong 🎇'
        })
    }
}

exports.findRepair = async (req, res) => {
    try {

        const { id } = req.params;
        const repair = await Repair.findOne({
            where: {
                id,
                status: 'pending',
            }
        })

        if(!repair){
            return res.status(404).json({
                status: 'fail',
                message: 'Repair could not be found'
            })
        }

        return res.status(200).json ({
            status: 'success',
            repair,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong 🎇'
        })
    }
}

exports.update = async (req, res) => {
    try {

        const { id } = req.params;

        const { status } = req.body;

        const repair = await Repair.findOne({
            where: {
                id,
                status: 'pending'
            }
        })

        if(!repair) {
            return res.status(404).json({
                status: 'fail',
                message: 'repair with id not found'
            })
        }

        await repair.update({ status })

        return res.status(200).json ({
            status: 'success',
            repair,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong 🎇'
        })
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const repair = await Repair.findOne({
            where: {
                id,
                status: 'pending'
            }
        })

        if(!repair) {
            return res.status(404).json({
                status: 'fail',
                message: 'repair with id not found'
            })
        }

        await repair.update({ status: 'cancelled' })

        return res.status(200).json ({
            status: 'success',
            message: 'repair deleted successfully'
        })
        return res.status(200).json ({
            status: 'success',
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong 🎇'
        })
    }
}