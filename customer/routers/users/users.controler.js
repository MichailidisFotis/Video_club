import mysql from "mysql";
import { v4 as uuidv4 } from "uuid";
import validator from "email-validator";
import md5 from "md5";




//*create connection with the database
const connection = mysql.createConnection({
  connectionLimit: 10,
  password: "",
  user: "root",
  database: "video_club",
  host: "localhost",
  port: 3306,
});



const userSignup =  async (req , res)=>{

        
  var user_id = uuidv4();
  var customer_id = uuidv4();
  var username = req.body.username;
  var password = req.body.user_password;
  var verify_password = req.body.verify_password;
  var firstname = req.body.firstname;
  var surname = req.body.surname;
  var email = req.body.email;

   //*check if all inputs are inserted
  if (!email)
  return  res.status(400).send({ message: "Email is required", signup: false });

  if (!username)
  return  res.status(400).send({ message: "Username is required", signup: false });

  if (!firstname)
  return  res.status(400).send({ message: "Firstname is required", signup: false });

  if (!surname)
  return  res.status(400).send({ message: "Surname is required", signup: false });

  if (!password)
  return  res.status(400).send({ message: "Password is required", signup: false });





  //*check if email form is valid
  const emailValid = validator.validate(email);

  if (!emailValid) 
  return  res.status(400).send({ message: "Email is invalid" });



  //*check is username exists
  const userExists = await new Promise((resolve, reject) => {
    connection.query(
      "SELECT count(*) as number_of_users FROM users WHERE username = ?",
      username,
      (err, result) => {
        if (err) reject(err);
        else resolve(result[0].number_of_users);
      }
    );
  });

  if (userExists)
  return  res.status(400).send({ message: "Username already taken", signup: false });

  //*check if email exists
  const emailExist = await new Promise((resolve, reject) => {
    connection.query(
      "SELECT count(*) as number_of_users FROM customers WHERE email=? ",
      email,
      (err, result) => {
        if (err) reject(err);
        else resolve(result[0].number_of_users);
      }
    );
  });

  if (emailExist)
  return  res.status(400).send({ message: "Email already exists", signup: false });

  //*check if password and verification_password are the same
  if (password != verify_password)
  return  res.status(400).send({ message: "Passwords must match" });





  await new Promise((resolve, reject) => {
    connection.query(`INSERT INTO users(user_id, username, user_password, role_id, active)
    VALUES (?,?,?,?,?)` , [user_id , username  , md5 (password) , 2 , 0] , (err , result)=>{
      if(err)
        reject(err)
      else 
        resolve(result)
    })
  })

  
  await new Promise((resolve, reject) => {
    connection.query(`INSERT INTO customers(customer_id, user_id, firstname, surname,customer_image_id,telephone,email)
    VALUES (?,?,?,?,?,?,?)` , [customer_id , user_id , firstname , surname , null , null , email] , (err , result)=>{
      if(err)
        reject(err)
      else 
        resolve(result)
    })
  })

  //*finish request
  res.status(201).send({message:"Signup" ,  signup:true});




}


//*method to login
const userLogin =  async (req ,res)=>{


    const username =  req.body.username
    const password =  req.body.user_password


   
    //*check if username and password are both inserted

    if(!username)
     return res.status(400).send({message:"Username is Required" , login:false})

    if(!password)
     return res.status(400).send({message:"Password is Required" , login:false})


    //*check if username exists
    const userFound = await new Promise((resolve, reject) => {
      connection.query("SELECT count(*) as number_of_users FROM users WHERE username =?" , username , (err, result)=>{
          if (err) {
            reject(err)
          }
          else
            resolve(result[0].number_of_users)
      })
    })


    if(!userFound)
      return res.status(400).send({message:"Username not found" , login:false})

    //*check if credentials are correct  
    const correctCredentials  =  await new Promise((resolve, reject) => {
      connection.query("SELECT count(*) as number_of_users FROM users where username = ? and user_password=?" , [username , md5(password)] ,
      (err , result)=>{
        if (err) 
          reject(err)
        else  
          resolve(result[0].number_of_users)
      })
    })



    if (!correctCredentials)
        return res.status(400).send({message:"Credentials are wrong" , login:false})
    

    //*check if user is active
    const userActive =  await new Promise((resolve, reject) => {
      connection.query("SELECT *  FROM users WHERE username =? AND user_password =? AND active=1" ,
       [username, md5(password)] , (err ,result)=>{
          if (err)
            reject(err)
          else 
            resolve(result)
      })
    })

    if (userActive.length == 0)
      return res.status(400).send({message:"Wait for activision" , login:false})
    
      const customer  =  await new Promise((resolve, reject) => {
          connection.query("SELECT customer_id , email , firstname , surname,telephone FROM customers WHERE user_id=?" , userActive[0].user_id,
          (err , result)=>{
              if(err)
                reject(err)
              else
                resolve(result)
          })
      })

  
      //*create session variables

      req.session.username = userActive[0].username
      req.session.user_id =  userActive[0].user_id
      req.session.role_id =  userActive[0].role_id
      req.session.customer_id = customer[0].customer_id
      req.session.email = customer[0].email
      req.session.firstname =  customer[0].firstname
      req.session.surname =  customer[0].surname
      req.session.telephone =  customer[0].telephone

      res.status(200).send({ login:true})



  }

const updateUser = async(req , res)=>{

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




  const signout =  async(req , res)=>{
      req.session.destroy()
    
      res.status(200).send({
        signout:true
      })
  }


  const deleteUser = async(req , res)=>{



  }





  const getUserImage =  async (req , res)=>{


  }


  const getUserInformation =  async (req ,res)=>{
      res.status(200).send({
        username: req.session.username,
        firstname: req.session.firstname,
        surname :req.session.surname,
        user_id :req.session.user_id,
        email : req.session.email,
        customer_id : req.session.customer_id,
        telephone:req.session.telephone

      })

  }


export default {userSignup , userLogin ,
   updateUser , deleteUser , signout , getUserImage , getUserInformation
  ,changePassword }



