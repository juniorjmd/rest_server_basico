import { Router } from "express";
import { userDelete, userGet, userPost, userPut , userPatch } from "../controllers/users.js";

const routes = Router();

routes.get("/", userGet);  
routes.put("/:id",    userPut); 
routes.post("/", userPost); 
routes.patch("/", userDelete);  
routes.delete("/", userPatch);  

export default routes;