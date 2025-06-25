
export function generarNumeroAleatorio(): number {
  return Math.floor(1000 + Math.random() * 9000); // entre 1000 y 9999
}

export function generarNumeroDosDigitos(): number {
  return Math.floor(10 + Math.random() * 90); // entre 10 y 99
}
