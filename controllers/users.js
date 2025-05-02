import { response } from "express";
import { User } from "../models/usuario.js"; // Importar el modelo de usuario
import bcryptjs from "bcryptjs"; // Importar bcryptjs para encriptar contraseñas 

export const userGet = async (req, res = response) => {  
   const { page = 1, limit = 10 } = req.query; 
    const query = { state: true };  
  const [total ,  usuarios] = await Promise.all([User.countDocuments(query),
    User.find(query).limit(limit).skip((page - 1) * limit),
  ]); // Crear una promesa para obtener los usuarios y el total de usuarios
  
  
  
   res.json({ total ,  usuarios });
}

export const userPost = async (req, res = response) => { 
    const {name, email, password ,  role} = req.body; // Destructuring del body

    // Validar si el correo ya existe en la base de datos

    // Encriptar la contraseña

    const salt = bcryptjs.genSaltSync(); 
    const passwordEncripted = bcryptjs.hashSync(password, salt); // Encriptar la contraseña  
    const user = new User({name, email, 'password': passwordEncripted ,  role}); // Crear una nueva instancia del modelo de usuario
    await user.save(); // Guardar el usuario en la base de datos
    res.json({ message: "userPost user desde el controlador!" , user   }); ; 
}

export const userPut = async (req, res = response) => {
    const { id   } = req.params; // Destructuring del body
    const {  password, google, email, _id , ...resto } = req.body; // Destructuring del body
    const usrAutenticado = req.userAut; // Obtener el usuario autenticado
    if (password) { // Si la contraseña existe, encriptarla
        const salt = bcryptjs.genSaltSync(); 
        resto.password = bcryptjs.hashSync(password, salt); // Encriptar la contraseña  
    } 
    const usuario =   await User.findByIdAndUpdate(id, resto); 
   
    res.json(  usuario    ); 
}

export const userPath = (req, res = response) => {
    res.json({ message: "userPath user desde el controlador!" }); 
}
export const userDelete = (req, res = response) => {
    const { id } = req.params; 
    const user = User.findByIdAndUpdate(id , {"state" : false}); // Buscar el usuario por id
    // const user = User.findByIdAndDelete(id); // Buscar el usuario por id y eliminarlo
    res.json(user); 
}

export const userPatch = (req, res = response) => {
    res.json({ message: "userPatch user desde el controlador!" }); 
}


 