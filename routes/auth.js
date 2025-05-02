import { Router } from "express"; 
import { check } from "express-validator"; 
import { login } from "../controllers/auth.js";
import { validarCampos } from "../middleware/validar-campos.js";

const routes = Router();

routes.post("/login" , [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "la contraseña es obligatorio").not().isEmpty(),
    validarCampos ]
    ,login ) ; 

export default routes;