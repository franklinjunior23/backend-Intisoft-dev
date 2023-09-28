import nodemailer from "nodemailer";

export function CreateEmailConexion() {
  const transporter = nodemailer.createTransport({
    host:"dev.softintis.com",
    port:465  ,
    secure:true,
    auth: {
      user: "SoportSoft@dev.softintis.com",
      pass: "Franklin232004",
    },
    tls: {
        rejectUnauthorized: false
    },
  });
  // Verificar la conexión con el servicio de correo
  transporter.verify((error, success) => {
    if (error) {
      console.error("Error al conectar con el servicio de correo:", error);
    } else {
      console.log("Conexión exitosa con el servicio de correo");
    }
  });
  return transporter;
}

const transporter = CreateEmailConexion();
const mailOptions = {
  from: "Franxx <SoportSoft@dev.softintis.com>", // Tu dirección de correo electrónico
  to: "jhonathan.chaname@iestpmonfortianos.edu.pe", // Dirección de correo electrónico del destinatario
  subject: "Prueba",
  text: "LLego el mensaje de email sendmail",
};
await transporter.sendMail(mailOptions);