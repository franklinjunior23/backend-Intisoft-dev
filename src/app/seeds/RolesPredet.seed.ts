import Roles from "../models/Roles"

const roles_predeterminados = [
    { nombre: "Administrador" },
    { nombre: "Soporte" },
    { nombre: "Cliente" }
];

export const ExecuteRoles = async () => {
    try {
        // Verifica cuántos registros coinciden con los nombres de roles predeterminados.
        const { count } = await Roles.findAndCountAll({
            where: {
                nombre: roles_predeterminados.map((role) => role.nombre)
            }
        });
        // Si count es igual al número de roles predeterminados, ya existen en la base de datos.
        if (count === roles_predeterminados.length) {
            console.log("Los roles predeterminados ya existen en la base de datos.");
        } else {
            // Crea los roles que no existen en la base de datos.
            for (const core of roles_predeterminados) {
                await Roles.create(core);
            }
            console.log("Se crearon los roles predeterminados.");
        }
    } catch (error) {
        console.log("Ocurrió un error en la creación de roles predeterminados:", error);
    }
};