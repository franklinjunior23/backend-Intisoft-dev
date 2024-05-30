app Router endpoints /
ruta => api/v1/
## MIDLEWARE

Admin ---
Cliente ---
Soporte ---

## AUTH / LOGIN 
auth/Login 
logearse de acuerdo con su usuario y contraseña respectivo
'''
POST 
--- BODY ----
{
    usuario : string,
    contraseña : string
}
''''
auth/create
creando un nuevo usuario en el sistema
''''
POST
----- BODY ----
{
    "nombre":"string",
    "apellido":"string",
    "usuario":"string",
    "contraseña":"string",
    "id_rol":"number"
}

/Login

## EMPRESAS
/Empresas
------
GET 

TRAER TODAS LAS EMPRESAS RELACIONADAS CON LAS SUCURSALES
------

## SUCURSALES DE UNA EMPRESA


PARA REALIZAR LA BITACORA DE CADA PC LO QUE SE HZO :::

AL MOMENTO DE HACER UNA ACTUALIZACION DEL SERVICIO - ESTARA CREANDO UN NUEVO INFORME QUE SERIA UNA FILA DE LA TABLA INFORMES , LO CUAL ESTARIA :
{
    IdDispositivo : (la pc que cambio);
    fecha : ( la fecha que se realizo);
    accion : ( mencionar que se hizo y todo ello );
    observacion : ( el soporte menciona que es lo que porque cambio y todo ello )
}

// create a new Ticket 
--- body ---

Titulo : string ,
UsuarioId: { id del backend },
Estado: string (Abierto,En progreso,Cerrado,Cancelado)
Fecha : {fecha del backend },
Observacion : string ,
Sucursal: number { sucursal id} ,
PcId : number {PC id }
