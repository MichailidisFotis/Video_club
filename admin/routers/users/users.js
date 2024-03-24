import bodyParser from "body-parser";

import express from "express";

import usersControler from "./users.controler.js"
import requireLogin from "../../middlewares/requireLogin.js"





var jsonParser = bodyParser.json();




const router = express.Router();



router.post("/signup" , usersControler.userSignup);


router.post("/login"  , usersControler.userLogin)



export default router