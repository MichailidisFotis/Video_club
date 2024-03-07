import bodyParser from "body-parser";

import express from "express";

import usersControler from "./users.controler.js"
import requireLogin from "../../middlewares/requireLogin.js"





var jsonParser = bodyParser.json();




const router = express.Router();


//*route to signup
router.post("/signup", jsonParser,usersControler.userSignup);

//*route to login
router.post("/login" , jsonParser ,usersControler.userLogin);

//*route to signout
router.post("/signout" , requireLogin , usersControler.signout)

//*route to update user's data
router.patch("/update-user-information" , jsonParser,requireLogin , usersControler.updateUser)

//*route to change user's password
router.patch("/change-password" ,  jsonParser , requireLogin , usersControler.changePassword)


//* route to get User Image 
router.get("/get-user-image" , requireLogin , usersControler.getUserImage)


//* route to get User's Information
router.get("/get-user-information" ,  requireLogin , usersControler.getUserInformation)



//router.get("/session" , usersControler.getSession)





export default router;
