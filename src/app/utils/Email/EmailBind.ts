import { Users as UsersModel } from "../../models";

async function getEmailsToUpdate() {
  try {
    const users: any[] = await UsersModel.findAll();
    const emailsToUpdate: { type: string; correo: string; password: string }[] = [];

    for (const value of users) {
      const newEmail = {
        type: value?.email_tip || "", // Asegúrate de manejar el caso en que `email` sea `null` o `undefined`
        correo: value?.email_dirrecion || "",
        password: value?.email_contraseña || "",
      };

      emailsToUpdate.push(newEmail);

      // Puedes omitir la siguiente línea si no necesitas actualizar realmente la base de datos aquí
      await UsersModel.update({ email: newEmail }, { where: { id: value?.id } });
    }

    console.log(emailsToUpdate);
    return emailsToUpdate;
  } catch (error) {
    console.error("Error al obtener correos electrónicos para actualizar:", error);
    throw error;
  }
}

// Llamas a la función
export default getEmailsToUpdate;
