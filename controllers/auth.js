import { response } from "express";
import { User } from "../models/usuario.js"; // Importar el modelo de usuario
import bcryptjs from "bcryptjs"; // Importar bcryptjs para encriptar contraseñas 
import { generarJWT } from "../helpers/generarJWT.js"; // Importar la función para generar JWT
export const login = async (req, res= response) => {
    const { email, password } = req.body;
try {
        // Validar el email y la contraseña
        if (!email || !password) {
            return res.status(400).json({ message: "Email y contraseña son requeridos" });
        }
      
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const passwordValid = bcryptjs.compareSync(password, user.password); // Comparar la contraseña encriptada con la contraseña ingresada
        if (passwordValid === false) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }    
        const token = await generarJWT(user.id); // Generar un token JWT (opcional)
        res.json({ user, token }); // Enviar el usuario y el token como respuesta (opcional) 
        
    }
    catch (error) {
        console.error("Error en el login:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    } 
}