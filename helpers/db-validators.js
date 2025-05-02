
import { Role } from "../models/role.js"; 
import { User } from "../models/usuario.js";

export const isRoleValid = async (rol = '') => {
        const existeRol = await  Role.findOne({ rol }); // Buscar si el rol ya existe en la base de datos
        if (!existeRol) {
            throw new Error(`El rol ${rol} no esta registrado en la base de datos`); // Si el rol no existe, retornar un error 400
        }
    }
    

export const emailExists = async (email = '') => {
    // Verificar si el correo existe
    const existeEmail = await User.findOne({ email });
    if (existeEmail) {
        throw new Error(`El correo ${email} ya esta registrado nojoda`); // Si el correo existe, retornar un error 400
    }
} 

export const userExistsById = async (id) => {
    // Verificar si el correo existe
    const existeUsuario = await User.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe`); // Si el correo existe, retornar un error 400
    }
}