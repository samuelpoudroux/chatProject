const Validator = require('validator');
const isEmpty = require('../empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.pseudo = !isEmpty(data.pseudo) ? data.pseudo : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.ppasswordConfirm = !isEmpty(data.ppasswordConfirm) ? data.ppasswordConfirm : '';

    if(!Validator.isLength(data.pseudo, { min: 2, max: 30 })) {
        errors.pseudo = 'pseudo must be between 2 to 30 chars';
    }

    if(Validator.isEmpty(data.pseudo)) {
        errors.pseudo = 'pseudo field is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must have 6 chars';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if(!Validator.isLength(data.passwordConfirm, {min: 6, max: 30})) {
        errors.passwordConfirm = 'Password must have 6 chars';
    }

    if(!Validator.equals(data.password, data.passwordConfirm)) {
        errors.passwordConfirm = 'Password and Confirm Password must match';
    }

    if(Validator.isEmpty(data.passwordConfirm)) {
        errors.passwordConfirm = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}