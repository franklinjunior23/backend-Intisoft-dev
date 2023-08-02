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
## SUCURSALES DE UNA EMPRESA
