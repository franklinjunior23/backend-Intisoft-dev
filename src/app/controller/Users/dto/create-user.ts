interface CreateUser {
  nombre: string;
  apellido: string;
  genero: "Masculino" | "Femenino";
  estado: string;
  cargo: string;
  tipo_doc: string;
  doc: string;
  usuario: string;
  contraseña: string;
  email: Array<any> | null;
  IdArea: number;
  anydesk_contra: string;
  anydesk_id: string;
  nivel_red: string;
  tipo_usuario: string;
}
