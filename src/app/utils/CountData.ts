export function CountData(data:any,tip:string):number {
    return data.filter((item: { tipo: string; }) => item.tipo === tip).length;
}