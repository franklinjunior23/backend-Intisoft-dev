import Roles from "../models/Roles"

const roles_predete=[
    {nombre:"Administrador"},
    {nombre:"Soporte"},
    {nombre:"Cliente"}
]

export const Execute_roles=async()=>{
    try {
        for(const core of roles_predete){
            await Roles.create(core)
        }
    } catch (error) {
        console.log("salio mal en la creacion de roles predeterminados")
    }
}