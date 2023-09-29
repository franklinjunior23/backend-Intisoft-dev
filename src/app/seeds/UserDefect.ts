import { CreateEmailConexion } from "../email/EmailConfig";
import Administradores from "../models/Administradores";
import bcrypt from "bcrypt";

const User: {
  nombre: string;
  apellido: string;
  correo: string;
  usuario: string;
  contraseña: string;
  id_rol: number;
} = {
  nombre: "Franx",
  apellido: "De La Cruz",
  correo: "franklinjunior021118@gmail.com",
  usuario: "Franx",
  contraseña: "Franx0218", // La contraseña en texto plano
  id_rol: 2,
};

// Función para crear un hash de contraseña
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 9; // Número de rondas de sal
  return await bcrypt.hash(password, saltRounds);
};

export const ExecuteUserCreateDefect = async (): Promise<void> => {
  try {
    const existingUser = await Administradores.findOne({
      where: {
        nombre: User.nombre,
        usuario: User.usuario,
      },
    });

    if (existingUser) {
      console.log("User already exists");
      return;
    }

    // Hash de la contraseña antes de crear el usuario
    const hashedPassword = await hashPassword(User.contraseña);
    User.contraseña = hashedPassword;

    await Administradores.create(User);
    const transporter = CreateEmailConexion();
    const mailOptions = {
      from: "SoportDevSoft <SoportSoft@dev.softintis.com>", // Tu dirección de correo electrónico
      to: "franklinjunior021118@gmail.com", // Dirección de correo electrónico del destinatario
      subject: "Create to User to backend",
      text: "LLego el mensaje de email sendmail",
      html:`<h1>User</h1> 
      <ul>
        <li>Nombre: ${User.nombre}</li>
        <li>Apellido: ${User.apellido}</li>
        <li>Correo: ${User.correo}</li>
        <li>Usuario: ${User.usuario}</li>
      </ul>
      `
    };
    await transporter.sendMail(mailOptions);
    console.log("User created successfully");
  } catch (error) {
    console.error("Error:", error);
  }
};


