import bodyParser from "body-parser";

import express from "express";

import customerControler from "./customer.controler.js"
import requireLogin from "../../middlewares/requireLogin.js"





var jsonParser = bodyParser.json();




const router = express.Router();


//*route to update user's data
router.patch("/update-customer-information" , jsonParser,requireLogin , customerControler.updateCustomer)

//*route to change user's password
router.patch("/change-password" ,  jsonParser , requireLogin , customerControler.changePassword)



//* route to get User Image 
router.get("/get-user-image" , requireLogin , customerControler.getUserImage)



export default router