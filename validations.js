const joi = require('@hapi/joi');
const customJoi = joi.extend(require('joi-phone-number'));

const registerValidation = (data) =>{
     
    const schema = joi.object({
        name: joi.string().min(6).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(8).required(),
        phoneNumber: customJoi.string().phoneNumber().required(),
        country: joi.string().required(),
        city: joi.string().required(),
        address: joi.string().required(),
        postalCode: joi.string().required().length(5)
    });
    return schema.validate(data, { abortEarly: false });
}

const loginValidation = (data) =>{
     
    const schema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().required()
    });
    return schema.validate(data, { abortEarly: false });
}
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;