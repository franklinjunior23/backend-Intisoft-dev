import { CreateEmailConexion } from "../email/EmailConfig";
import Administradores from "../models/Administradores";
import bcrypt from "bcrypt";

interface UserCreate {
  nombre: string;
  apellido: string;
  correo: string;
  usuario: string;
  contraseña: string;
  id_rol: number;
}

const users: UserCreate[] = [
  {
    nombre: "Franx",
    apellido: "De La Cruz",
    correo: "franklinjunior021118@gmail.com",
    usuario: "Franx",
    contraseña: "Franx0218", // La contraseña en texto plano
    id_rol: 2,
  },
  {
    nombre: "Franklin",
    apellido: "Dcc",
    correo: "franklinjunior021118@gmail.com",
    usuario: "Franklin",
    contraseña: "Franklin232004", // La contraseña en texto plano|
    id_rol: 1,
  }
];

// Función para crear un hash de contraseña
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 9; // Número de rondas de sal
  return await bcrypt.hash(password, saltRounds);
};

export const ExecuteUserCreateDefect = async (): Promise<void> => {
  try {
    const existingUsers = await Administradores.findAll({
      where: {
        usuario: users.map(user => user.usuario),
      },
    });

    const existingUsernames = existingUsers.map(user => user.get('usuario'));

    const newUsers = users.filter(user => !existingUsernames.includes(user.usuario));

    if (newUsers.length === 0) {
      console.log("Users already exist");
      return;
    }

    // Hash de la contraseña antes de crear el usuario
    const hashedPasswords = await Promise.all(newUsers.map(user => hashPassword(user.contraseña)));
    newUsers.forEach((user, index) => user.contraseña = hashedPasswords[index]);

    await Administradores.bulkCreate(newUsers as any, { fields: ['nombre', 'apellido', 'correo', 'usuario', 'contraseña', 'id_rol'] });

    const transporter = CreateEmailConexion();
    const mailOptions = {
      from: "SoportDevSoft <soft@intiscorp.com.pe>", // Tu dirección de correo electrónico
      to: "franklinjunior021118@gmail.com", // Dirección de correo electrónico del destinatario
      subject: "Create to User to backend",
      text: "LLego el mensaje de email sendmail",
      html: newUsers.map(user => `
        <h1>User</h1> 
        <ul>
          <li>Nombre: ${user.nombre}</li>
          <li>Apellido: ${user.apellido}</li>
          <li>Correo: ${user.correo}</li>
          <li>Usuario: ${user.usuario}</li>
        </ul>
      `).join('')
    };
    await transporter.sendMail(mailOptions);
    console.log("Users created successfully");
  } catch (error) {
    console.error("Error:", error);
  }
};
