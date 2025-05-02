import { request, response } from "express"; 
export const esAdminRole = (req= request, res=response, next) => {
    if (!req.userAut) {
        return res.status(500).json({
            message: "Se quiere verificar el rol sin validar el token primero",
        });
    }
    const { role, name } = req.userAut;
    if (role !== "ADMIN_ROLE") {
        return res.status(401).json({
            message: `${name} no es administrador - No puede hacer esto`,
        });
    }
    next();
}

export const tieneRole = (...roles) => {
    return (req = request, res = response, next) => {
        if (!req.userAut) {
            return res.status(500).json({
                message: "Se quiere verificar el rol sin validar el token primero",
            });
        }
        if (!roles.includes(req.userAut.role)) {
            return res.status(401).json({
                message: `El servicio requiere uno de estos roles ${roles}`,
            });
        }
        next();
    };
} 