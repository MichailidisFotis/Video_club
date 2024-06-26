import mysql from "mysql";
import { v4 as uuidv4 } from "uuid";
import validator from "email-validator";
import md5 from "md5";
import register_user from "./models/register_user.js";



//*create connection with the database
const connection = mysql.createConnection({
  connectionLimit: 10,
  password: "",
  user: "root",
  database: "movies_database",
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

   //*check if all inputs are inserted (using Joi)
  // if (!email)
  // return  res.status(400).send({ message: "Email is required", signup: false });

  // if (!username)
  // return  res.status(400).send({ message: "Username is required", signup: false });

  // if (!firstname)
  // return  res.status(400).send({ message: "Firstname is required", signup: false });

  // if (!surname)
  // return  res.status(400).send({ message: "Surname is required", signup: false });

  // if (!password)
  // return  res.status(400).send({ message: "Password is required", signup: false });

  
  const {error} = register_user(req.body)  

  if (error) {
    return res.status(400).send({message:error.details[0].message
      .replace('_',' ')
      .replace(/"/g,''),
      
      signup:false
    })
  }


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

      //res.status(200).send({ login:true})
      res.redirect("/customer/customerIndex")


  }








  const signout =  async(req , res)=>{
      req.session.destroy()
    
      res.redirect("/")
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
   signout ,  getUserInformation
   }