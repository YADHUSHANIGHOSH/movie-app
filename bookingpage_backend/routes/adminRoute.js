import  express from  "express"
import {createAdmin,fetchAdmin,updateAdmin,deleteAdmin} from "../controller/adminController.js"

const adminroute =express.Router();

adminroute.post('/createadmin', createAdmin);
adminroute.get("/fetchadmin", fetchAdmin);
adminroute.put("/updateadmin/:id", updateAdmin);
adminroute.delete("/deleteadmin/:id",deleteAdmin);
export default adminroute;