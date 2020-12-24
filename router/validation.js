///validation
const Joi = require('joi');
const registervalidation = data =>{
const schema = Joi.object ({
    name: Joi.string()
    .min(6)
    .required(),
    email: Joi.string()
    .min(6)
    .required()
    .email(),
    password: Joi.string()
    .min(6)
    .required()
});
    return schema.validate(data); //if registervalidation is not using remove this
}
/////////////
module.exports.registervalidation = registervalidation; //without register validation arrow function module.exports.schema= schema


//login validation
const loginvalidation = data =>{
    const schema = Joi.object ({
        email: Joi.string()
        .min(6)
        .required()
        .email(),
        password: Joi.string()
        .min(6)
        .required()
    });
        return schema.validate(data); //if registervalidation is not using remove this
    }
module.exports.loginvalidation = loginvalidation;