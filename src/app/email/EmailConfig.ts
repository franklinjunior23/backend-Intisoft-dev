import nodemailer from "nodemailer";

export function CreateEmailConexion() {
  const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465 ,
    secure:true,
    auth: {
      user: "SoftDevIntiscorp@gmail.com",
      pass: "qupj neiw bubh kjbr",
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


