const User = require('../models/user.model');

exports.findAllUsers = async (req, res) => {
    try {
        const users =await User.findAll({
            where: {
                status: 'available',
            }
        })
        return res.status(200).json({
            status:'success',
            users,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong 🎇',
        })
    }
};

exports.createUser = async (req, res) => {
    try {

        const {name, email, password, role} = req.body

        const user = await User.create({ name, email, password, role})

        return res.status(200).json ({
            status: 'success',
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong 🎇'
        })
    }
}

exports.findUser = async (req, res) => {
    try {

        const { id } = req.params;

        const user = await User.findOne({
            where: {
                id,
                status: 'available'
            }
        })

        if(!user) {
            return res.status(400).json({
                status: 'error',
                message: `User with id: ${id}not fount`,
            })
        }

        return res.status(200).json ({
            status: 'success',
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong 🎇'
        })
    }
}

exports.update = async(req, res) => {
    try {

        const { id } = req.params;
        const { name, email } = req.body;

        const user = await User.findOne({
            where: {
                id,
                status:'available'
            }
        });

        if (!user) {
            return res.status(404).json({
                status:'fail',
                message: `User with id ${id} does not exist`
            })
        }

        await User.update({name, email})

        return res.status(200).json ({
            status: 'success',
            message: 'user updated successfully'
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

        const user = await User.findOne({
            where: {
                id,
                status: 'available'
            }
        })

        if(!user) {
            return res.status(400).json({
                status: 'error',
                message: `User with id: ${id}not fount`,
            })
        }

        await user.update({status: 'available'})

        return res.status(200).json ({
            status: 'success',
            message: 'User deleted successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong 🎇'
        })
    }
}