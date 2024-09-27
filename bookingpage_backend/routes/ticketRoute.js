import  express from  "express"
import {createTicket,fetchTicket,fetchOneTicket,updateTicket,deleteTicket} from "../controller/ticketController.js"

const ticketroute =express.Router();

ticketroute.post('/createticket', createTicket);
ticketroute.get("/fetchticket", fetchTicket);
ticketroute.get("/fetchoneticket/:id", fetchOneTicket);

ticketroute.put("/updateticket/:id", updateTicket);
ticketroute.delete("/deleteticket/:id",deleteTicket);
export default ticketroute;    