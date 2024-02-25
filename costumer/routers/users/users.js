import bodyParser from "body-parser";

import express from "express";

import usersControler from "./users.controler.js";

var jsonParser = bodyParser.json();




const router = express.Router();




router.post("/signup", jsonParser,usersControler.userSignup);


router.post("/login" , jsonParser ,usersControler.userLogin);




export default router;
