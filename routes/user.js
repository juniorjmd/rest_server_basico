import { Router } from "express";
import { userDelete, userGet, userPost, userPut , userPatch } from "../controllers/users.js";
import { check } from "express-validator";
import { validarCampos } from "../middleware/validar-campos.js"; 
import { isRoleValid , emailExists , userExistsById} from "../helpers/db-validators.js";

const routes = Router();

routes.get("/", userGet);  
routes.put("/:id", [
    check('id').isMongoId(), // Validar si el id existe en la base de datos
    check('id').custom(userExistsById),
    check('role').custom(isRoleValid),     
    validarCampos
],   userPut); 
routes.post("/",[ 
    check('name' , 'nombre no debe estar vacio').notEmpty(), 
    check('password' , 'el password debe ser mas de 6 letras').isLength({min: 6}),
    check('email' , 'correo no es valido').isEmail() ,   
    check('email').custom(emailExists),   
    check('role').custom(isRoleValid),     
    validarCampos ]
    ,  userPost); 
routes.patch("/",userPatch );  
routes.delete("/:id", [
    check('id').isMongoId(), // Validar si el id existe en la base de datos
    check('id').custom(userExistsById),    
    validarCampos] , userDelete );  

export default routes;