

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



const getNumberNotifications = async (req , res)=>{

    const number = await new Promise((resolve, reject) => {
        connection.query("SELECT count(*) as number FROM notifications WHERE user_id = ? and seen =0" , req.session.user_id,
          (err , result)=>{
            if(err)
              reject(err)
            else
              resolve(result)
          }
        )
    })


    res.send({
      number:number[0].number
    })

}


export default {getNumberNotifications} 