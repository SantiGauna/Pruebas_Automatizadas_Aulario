
export function generarNumeroAleatorio(): number {
  return Math.floor(1000 + Math.random() * 9000); // entre 1000 y 9999
}

export function generarNumeroDosDigitos(): number {
  return Math.floor(10 + Math.random() * 90); // entre 10 y 99
}


export function generaLetraAleatorio(): string {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return letras.charAt(Math.floor(Math.random() * letras.length));
}


export function generarFechaInicio(): string {
  const fecha = new Date();
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const anio = String(fecha.getFullYear());
  return `${anio}-${mes}-${dia}`;
}

export function generarFechaFin(): string {
  const fecha = new Date();
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const anio = String(fecha.getFullYear());
  return `${anio}-${mes}-${dia}`;
}