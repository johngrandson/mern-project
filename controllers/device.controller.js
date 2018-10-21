const Device = require('../models/Device');
const User = require('../models/User');
const keys = require('../config/keys');

const validateDevicesController = require('../validation/devices');

module.exports.list = (req, res) => {
    try {
        const errors = {};

        Device.find()
            .then((device) => {
                if (device.length === 0) {
                    errors.empty = 'No devices found'
                    res.json(errors);
                }

                if (req.user.isAdmin === true) {
                    return res.status(200).json(device);
                } else {
                    errors.empty = 'Only admin can list devices'
                    res.json(errors);
                }
            }).catch((error) => {
                throw error;
            });

    } catch (error) {
        throw error;
    }

}

module.exports.listById = (req, res) => {
    try {
        const errors = {};

        Device.findOne({ _id: req.body.id })
            .then(device => {
                if (!device) {
                    errors.nodevices = 'Device with given id was not found';
                    return res.status(404).json(errors)
                }

                return res.status(200).json(device);
            }).catch((error) => {
                throw error
            });

    } catch (error) {
        throw error;
    }

}

module.exports.create = (req, res) => {
    try {
        const { errors, isValid } = validateDevicesController(req.body);

        if (!isValid)
            return res.status(400).json(errors);

        const newDevice = new Device({
            name: req.body.name,
            description: req.body.description,
            owner: req.user.name
        });


        console.log(req.user);

    } catch (error) {
        throw error;
    }

}