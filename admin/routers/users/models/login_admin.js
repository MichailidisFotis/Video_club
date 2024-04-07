import Joi from "joi"



const   login_admin = data =>{
    const schema  = Joi.object({
        username : Joi.string().required(),
        password:Joi.string().required(),

    }).unknown()

    return schema.validate(data)
}


export default login_admin