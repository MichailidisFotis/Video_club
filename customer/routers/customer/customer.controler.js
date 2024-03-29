import mysql from "mysql";
import { v4 as uuidv4 } from "uuid";
import validator from "email-validator";
import md5 from "md5";




//*create connection with the database
const connection = mysql.createConnection({
  connectionLimit: 10,
  password: "",
  user: "root",
  database: "movies_database",
  host: "localhost",
  port: 3306,
});



const updateCustomer = async(req , res)=>{

    const current_username = req.session.username
    const new_username =  req.body.username
    const password  =  req.body.password
    var mobile_number  = req.body.mobile_number
  
    
    if (mobile_number.trim() =='' || mobile_number.trim() ==null) {
      mobile_number = req.session.telephone
    }
    
  
  
  
  
    //*check if credentials are correct
    const correctCredentials  =  await new Promise((resolve, reject) => {
      connection.query("SELECT count(*) as number_of_users FROM users where username = ? and user_password=?" , [current_username , md5(password)] ,
      (err , result)=>{
        if (err) 
          reject(err)
        else  
          resolve(result[0].number_of_users)
      })
    })
  
    if (!correctCredentials) 
      return res.status(400).send({message:"Wrong Password" , update:false})
  
    
    //*check if user wishes to change username
    if (current_username!= new_username) {
        
      //*check if inserted username already exists
      const username_exists = await new Promise((resolve, reject) => {
          connection.query("SELECT count(*) as number_of_users FROM users WHERE username = ?" , new_username , 
          (err , result)=>{
            if (err) 
              reject(err)
            else 
              resolve(result[0].number_of_users)
          })
      }) 
  
      if(username_exists)
        return res.status(400).send({message:"Username already exists" , update:false})
  
    }
  
     //*update tables
    await new Promise((resolve, reject) => {
      connection.query("UPDATE users SET username=? WHERE user_id =? " , [new_username , req.session.user_id] ,
      (err , result)=>{
        if(err)
          reject(err)
        else  
          resolve(result)
      })
    })
  
  
    await new Promise((resolve, reject) => {
      connection.query("UPDATE customers SET telephone =? WHERE customer_id =? " , [ mobile_number , req.session.customer_id] ,
      (err , result)=>{
        if(err)
          reject(err)
        else  
          resolve(result)
      })
    })
  
    req.session.username =  new_username
    req.session.telephone =  mobile_number
  
  
    res.status(200).send(
    {
     message:"You account has been updated" ,
     update:true,
     new_username:req.session.username ,
     telephone:req.session.telephone 
    })
  
  
  
  }


const changePassword =  async(req , res)=>{
    var new_password =  req.body.new_password
    var old_password =  req.body.old_password
    var verify_new_password =  req.body.verify_new_password
    
   //* check user's credentials

   const correctCredentials =  await new Promise((resolve, reject) => {
     connection.query(`SELECT count(*) as number_of_users FROM users WHERE username =?  
     and user_password =?` ,[req.session.username , md5(old_password)] ,(err , result)=>{
       if(err)
         reject(err)
       else
         resolve(result[0].number_of_users)
     })
   })


   if(!correctCredentials)
       return res.status(400).send({
         message:"Old password is incorrect",
         update:false
       })

   //*check if new password and verification password are the same     
   if (new_password !== verify_new_password )
   return res.status(400).send({
     message:"Old password is incorrect",
     update:false
   })

   if (old_password == new_password )
   return res.status(400).send({
     message:"Old password and new password must be different",
     update:false
   })



   //*change password
   await new Promise((resolve, reject) => {
     connection.query("UPDATE users SET user_password=? WHERE user_id =? " , [md5(new_password) , req.session.user_id] ,
     (err , result)=>{
       if(err)
         reject(err)
       else  
         resolve(result)
     })
   })


    res.status(200).send({
     message:"Password updated",
     update:true
    })


   



 

}



const deleteUser = async(req , res)=>{



}





const getUserImage =  async (req , res)=>{


}


export default{getUserImage , deleteUser ,changePassword , updateCustomer}