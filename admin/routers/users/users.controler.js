import mysql from "mysql";
import { v4 as uuidv4 } from "uuid";
import validator from "email-validator";
import md5 from "md5";
import register_admin from "./models/register_admin.js";




//*create connection with the database
const connection = mysql.createConnection({
    connectionLimit: 10,
    password: "",
    user: "root",
    database: "movies_database",
    host: "localhost",
    port: 3306,
  });
  

const userSignup = async(req ,res)=>{
  var user_id = uuidv4();
  var customer_id = uuidv4();
  var username = req.body.username;
  var password = req.body.user_password;
  var verify_password = req.body.verify_password;
  var firstname = req.body.firstname;
  var surname = req.body.surname;
  var email = req.body.email;

  


}



const userLogin = async(req , res)=>{

}


  export default {userSignup , userLogin }