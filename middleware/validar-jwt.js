import { request, response } from "express";
import jwt from "jsonwebtoken"; 
import { User } from "../models/usuario.js"; 
export const validarJWT = async (req= request, res = response, next) => {
    // Extraer el token del encabezado de autorización
    const token = req.header('x-token');

    // Verificar si el token no está presente
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    // Verificar el token
    try {
        const { uid  } = jwt.verify(token, process.env.SECRETORPRIVATEKEY); 
        const user = await User.findById(uid);
        if (!user) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en DB'
            });
        }
        if (!user.state) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            });
        }
        req.userAut = user;
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }

    next();
}