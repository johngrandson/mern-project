const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateDevicesController(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.description = !isEmpty(data.description) ? data.description : '';

    if (data.length === 0) {
        errors.list = 'No devices found'
    }

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (!Validator.isLength(data.description, { min: 5, max: 30 })) {
        errors.description = 'Dame must be between 5 and 30 characters';
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = 'Description field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};