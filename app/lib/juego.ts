// app/lib/juego.ts

export const DICCIONARIO_ESPACIAL = [
  "ÓRBITA", "LÁSER", "ALIEN", "NAVE", "ASTEROIDE", "COMETA", "AGUJERO", "GRAVEDAD",
  "OXÍGENO", "CÁPSULA", "RADAR", "PROPULSOR", "GALAXIA", "METEORITO", "PLANETA",
  "LUNA", "SOL", "ESTRELLA", "TRIPULACIÓN", "CYBORG", "ROBOT", "TELETRANSPORTADOR",
  "BASE", "SATÉLITE", "COMUNICACIÓN", "ESCUDO", "BLÁSTER", "CUASAR", "NEBULOSA", 
  "SUPERNOVA", "CLON", "MUTANTE", "ESCÁNER", "BÚNKER", "HIPERESPACIO", "MATERIA"
];

// Función para barajar un arreglo (algoritmo Fisher-Yates)
export function barajarArray<T>(array: T[]): T[] {
  const nuevoArray = [...array];
  for (let i = nuevoArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [nuevoArray[i], nuevoArray[j]] = [nuevoArray[j], nuevoArray[i]];
  }
  return nuevoArray;
}

// Generador de códigos aleatorios de 4 letras/números (Ej: "X7B9")
export function generarCodigoSala() {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
}