import  express from  "express"
import {createTheater,fetchTheater,updateTheater,deleteTheater} from "../controller/theaterController.js"

const theaterroute =express.Router();

theaterroute.post('/creattheater', createTheater);
theaterroute.get("/fetchtheater", fetchTheater);


theaterroute.put("/updatetheater/:id", updateTheater);
theaterroute.delete("/deletetheater/:id",deleteTheater);
export default theaterroute;    