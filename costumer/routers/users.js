import bodyParser from "body-parser";
import md5 from "md5";
import express from "express"
import mysql from "mysql"

var jsonParser = bodyParser.json();



const connection = mysql.createConnection({
    connectionLimit: 10,
    password: "",
    user: "root",
    database: "video_club",
    host: "localhost",
    port: 3306,
  });


const router = express.Router();

router.post("/signup" , jsonParser , async(req , res)=>{

})

router.post("/login" , jsonParser , async(req , res)=>{
  
})


export default router


