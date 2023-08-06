export interface MODELEMPRESA{
    id:number,
    nombre:string,
    lugar:string
}
export interface MODELSUCURSAL{
    id:number,
    nombre:string,
    id_empresa:number
}