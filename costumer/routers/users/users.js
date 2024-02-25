import bodyParser from "body-parser";
import md5 from "md5";
import express from "express";
import mysql from "mysql";
import { v4 as uuidv4 } from "uuid";
import validator from "email-validator";
import usersControler from "./users.controler.js";

var jsonParser = bodyParser.json();




const router = express.Router();




router.post("/signup", jsonParser,usersControler.userSignup);


router.post("/login" , jsonParser ,usersControler.userLogin);




export default router;
