// app/lib/juego.ts

export const DICCIONARIO = [
  // --- Espacial (Básico) ---
  "ÓRBITA", "LÁSER", "ALIEN", "NAVE", "ASTEROIDE", "COMETA", "AGUJERO", "LUNA", 
  "SOL", "ESTRELLA", "ROBOT", "BASE", "SATÉLITE", "ESCUDO", "MAPA", "MISIÓN", 
  "RUTA", "VIAJE", "ESTACIÓN", "ANTENA", "CASCO", "COHETE",

  // --- Animales ---
  "PERRO", "GATO", "CABALLO", "PÁJARO", "PEZ", "LEÓN", "ELEFANTE", "JIRAFA", 
  "TIGRE", "CONEJO", "MONO", "RATÓN", "DELFÍN", "ARAÑA", "SERPIENTE",

  // --- Comida y Bebida ---
  "MANZANA", "PAN", "LECHE", "QUESO", "PIZZA", "ARROZ", "HUEVO", "CHOCOLATE", 
  "PLÁTANO", "CAFÉ", "PASTEL", "TOMATE", "NARANJA", "SOPA", "CARNE",

  // --- Objetos Cotidianos ---
  "MESA", "SILLA", "CAMA", "TELÉFONO", "LIBRO", "LÁPIZ", "LLAVE", "ESPEJO", 
  "RELOJ", "ZAPATO", "GAFAS", "BOTELLA", "CARTA", "PELOTA", "MARTILLO", 
  "TIJERAS", "RADIO", "CÁMARA", "MOCHILA", "LÁMPARA",

  // --- Naturaleza y Lugares ---
  "CIUDAD", "PARQUE", "ESCUELA", "CALLE", "MONTAÑA", "PLAYA", "RÍO", "BOSQUE", 
  "FLOR", "ÁRBOL", "ISLA", "DESIERTO", "PUENTE", "HOTEL", "LONDRES", "MÉXICO", 
  "TIERRA", "CAMPO",

  // --- Otros Sustantivos ---
  "COCHE", "AVIÓN", "TREN", "BICICLETA", "FUEGO", "AGUA", "VIENTO", "ORO", 
  "DIAMANTE", "DINERO", "MÚSICA", "PELÍCULA", "SUEÑO", "DOCTOR", "POLICÍA"
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