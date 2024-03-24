import Joi from "joi"



const register_admin = data =>{
    const schema  = Joi.object({
        username : Joi.string().required(),
        user_password:Joi.string().required(),
        verify_password:Joi.string().required(),
        firstname:Joi.string().required(),
        surname:Joi.string().required(),
        email: Joi.string().required()



    }).unknown()

    return schema.validate(data)
}


export default register_admin