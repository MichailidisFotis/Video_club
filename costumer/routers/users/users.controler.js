import mysql from "mysql";
import { v4 as uuidv4 } from "uuid";
import validator from "email-validator";
import md5 from "md5";





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

  // //*check if all inputs are inserted
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
    connection.query(`INSERT INTO customers(customer_id, user_id, firstname, surname,photo_id,telephone,email)
    VALUES (?,?,?,?,?,?,?)` , [customer_id , user_id , firstname , surname , null , null , email] , (err , result)=>{
      if(err)
        reject(err)
      else 
        resolve(result)
    })
  })

    
  res.status(201).send({message:"Signup" ,  signup:true});




}


const userLogin =  async (req ,res)=>{

}


export default {userSignup , userLogin}



