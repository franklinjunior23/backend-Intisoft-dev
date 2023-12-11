export function generarCodigo(
  nombreEmpresa: string,
  nombreSucursal: string,
  idCreate: number
) {
  const parteEmpresa = nombreEmpresa.toUpperCase().slice(0, 4);
  const parteSucursal = nombreSucursal.toUpperCase().slice(0, 3);
  const parteAleatoria = generarParteAleatoria();
  return `${parteEmpresa}${parteSucursal}${parteAleatoria}${idCreate}`;
}

interface GenerateCodigoDisp {
  nombreEmpresa: string;
  nombreSucursal: string;
  codigo: string;
}

function generarParteAleatoria() {
  const caracteres = "#$%&";
  return Array.from(
    { length: 2 },
    () => caracteres[Math.floor(Math.random() * caracteres.length)]
  ).join("");
}
