import { response } from "express";

export const userGet = (req, res = response) => {
    const {nombre, apellido , page = 1} = req.query; // Destructuring del body
    res.json({ message: "get user desde el controlador!" , nombre, apellido , page  }); 
}

export const userPost = (req, res = response) => {
    const {nombre,edad} = req.body; // Destructuring del body
    
    res.json({ message: "userPost user desde el controlador!" , nombre,edad     }); ; 
}

export const userPut = (req, res = response) => {
    const { id } = req.params; // Destructuring del body
    res.json({ message: "userPut user desde el controlador!" , id }); 
}

export const userPath = (req, res = response) => {
    res.json({ message: "userPath user desde el controlador!" }); 
}
export const userDelete = (req, res = response) => {
    res.json({ message: "userDelete user desde el controlador!" }); 
}

export const userPatch = (req, res = response) => {
    res.json({ message: "userPatch user desde el controlador!" }); 
}


 