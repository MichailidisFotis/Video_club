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
router.patch("/updateUser" , jsonParser,requireLogin ,  usersControler.updateUser)


//* route to get User Image 
router.get("/getImage" , requireLogin , usersControler.getUserImage)




//router.get("/session" , usersControler.getSession)





export default router;
