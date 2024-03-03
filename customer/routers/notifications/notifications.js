import bodyParser from "body-parser";

import express from "express";
import requireLogin from "../../middlewares/requireLogin.js"
import notificationsControler from "./notifications.controler.js";



var jsonParser = bodyParser.json();




const router = express.Router();






//*route to get number of unseen notifications
router.get("/getNumberOfNotifications" , requireLogin , notificationsControler.getNumberNotifications)




export default router