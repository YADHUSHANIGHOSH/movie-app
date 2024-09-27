import  express from  "express"
import {fetchUser, createUser,updateUser, deleteUser} from "../controller/userController.js"

const userroute =express.Router();

userroute.post('/createuser', createUser);
userroute.get("/fetchuser", fetchUser);
userroute.put("/updateuser/:id", updateUser);
userroute.delete("/deleteuser/:id",deleteUser);
export default userroute;