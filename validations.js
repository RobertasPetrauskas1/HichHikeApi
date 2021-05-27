const joi = require('@hapi/joi');
const customJoi = joi.extend(require('joi-phone-number'));

module.exports.userValidation = (data) =>{
     
    const schema = joi.object({
        _id: joi.string(),
        name: joi.string().min(6).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(8).required(),
        phoneNumber: customJoi.string().phoneNumber().required(),
        country: joi.object({
            name: joi.string().required()
        }),
        city: joi.object({
            name: joi.string().required()
        }),
        address: joi.string().required(),
        postalCode: joi.string().required().length(8),
    });
    return schema.validate(data, { abortEarly: false });
}

module.exports.loginValidation = (data) =>{
     
    const schema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().required()
    });
    return schema.validate(data, { abortEarly: false });
}

module.exports.tripValidation = (data) =>{
    const schema = joi.object({
        _id: joi.string(),
        availableSeatCount: joi.number().required(),
        destinationFrom: joi.object({
            country: joi.object({
                id: joi.string().required(),
                name: joi.string()
            }),
            city: joi.object({
                id: joi.string().required(),
                countryId: joi.string().required(),
                name: joi.string()
            }),
            address: joi.string().required()
        }).required(),
        destinationTo: joi.object({
            country: joi.object({
                id: joi.string().required(),
                name: joi.string()
            }),
            city: joi.object({
                id: joi.string().required(),
                countryId: joi.string().required(),
                name: joi.string()
            }),
            address: joi.string().required()
        }).required(),
        date: joi.date().required(),
        time: joi.string().required(),
        description: joi.string().required(),
        travelers: joi.array().items({
            userId: joi.string().required(),
            isConfirmed: joi.boolean().required()
        })
    });
    return schema.validate(data, {abortEarly: false })
}