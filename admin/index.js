import express from "express"
import session from "express-session"
import { fileURLToPath } from 'url';
import {dirname} from "path"
import dotenv from "dotenv";

import usersRouter from "./routers/users/users.js"
// import notificationsRouter from "./routers/notifications/notifications.js";

import requireLogin from "./middlewares/requireLogin.js";
import requireAdmin from "./middlewares/requireAdmin.js";


dotenv.config()




const app =express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true,
    cookie: {
        maxAge:269999999999
      }
}));

app.set('view-engine', 'ejs');
app.use(express.static(__dirname + '/views'));




 app.use("/users" , usersRouter)
// app.use("/notifications" , notificationsRouter)

//app.use("/movies" , moviesRouter)
//app.use("/orders" , ordersRouter)
//app.use("/cart" , cartRouter)




//app.use(express.static('views'))





app.get("/" , (req , res) =>{
  res.render("index.ejs")
})


app.get("/signup" , (req , res) =>{
  res.render("signup.ejs")
})



app.get("/admin/adminIndex" , (req , res)=>{
  res.render("adminIndex.ejs")
})





export default app