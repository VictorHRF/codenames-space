// app/lib/juego.ts

export const DICCIONARIO = [
  // --- Espacial (Básico y Descriptivo) ---
  "ÓRBITA", "LÁSER", "ALIEN", "NAVE", "ASTEROIDE", "COMETA", "AGUJERO", "LUNA", 
  "SOL", "ESTRELLA", "ROBOT", "BASE", "SATÉLITE", "ESCUDO", "MAPA", "MISIÓN", 
  "RUTA", "VIAJE", "ESTACIÓN", "ANTENA", "CASCO", "COHETE", "RADAR", "ZONA", 
  "CINTURÓN", "ECLIPSE", "EJE", "GAS", "GRUPO", "IMPACTO", "LÁMPARA", "NÚCLEO", 
  "PUENTE", "REFUGIO", "RESERVA", "TANQUE", "VALLE", "VISIÓN", "ZAFIRO",

  // --- Animales (Terrestres y Marinos) ---
  "PERRO", "GATO", "CABALLO", "PÁJARO", "PEZ", "LEÓN", "ELEFANTE", "JIRAFA", 
  "TIGRE", "CONEJO", "MONO", "RATÓN", "DELFÍN", "ARAÑA", "SERPIENTE", "LOBO", 
  "ZORRO", "TORTUGA", "HORMIGA", "ABEJA", "MARIPOSA", "TIBURÓN", "CANGURO", 
  "ÁGUILA", "PULPO", "VACA", "CERDO", "GALLINA", "OVEJA", "OSO", "BALLENA",

  // --- Comida y Bebida (Identificadores de Baliza) ---
  "MANZANA", "PAN", "LECHE", "QUESO", "PIZZA", "ARROZ", "HUEVO", "CHOCOLATE", 
  "PLÁTANO", "CAFÉ", "PASTEL", "TOMATE", "NARANJA", "SOPA", "CARNE", "PASTA", 
  "ENSALADA", "HELADO", "VINO", "CERVEZA", "SAL", "AZÚCAR", "GALLETA", "LIMÓN", 
  "PATATA", "CEBOLLA", "PESCADO", "POLLO", "JAMÓN", "MIEL", "FRESA", "UVA",

  // --- Objetos Cotidianos ---
  "MESA", "SILLA", "CAMA", "TELÉFONO", "LIBRO", "LÁPIZ", "LLAVE", "ESPEJO", 
  "RELOJ", "ZAPATO", "GAFAS", "BOTELLA", "CARTA", "PELOTA", "MARTILLO", 
  "TIJERAS", "RADIO", "CÁMARA", "MOCHILA", "LÁMPARA", "PUERTA", "VENTANA", 
  "SOFÁ", "MALETA", "PARAGUAS", "CEPILLO", "JABÓN", "TOALLA", "ANILLO", 
  "CUCHILLO", "CUCHARA", "PLATO", "VASO", "BALDE", "CUERDA", "MARTILLO",

  // --- Naturaleza, Geografía y Lugares ---
  "CIUDAD", "PARQUE", "ESCUELA", "CALLE", "MONTAÑA", "PLAYA", "RÍO", "BOSQUE", 
  "FLOR", "ÁRBOL", "ISLA", "DESIERTO", "PUENTE", "HOTEL", "LONDRES", "MÉXICO", 
  "TIERRA", "CAMPO", "CINE", "HOSPITAL", "IGLESIA", "TIENDA", "MERCADO", 
  "GRANJA", "VOLCÁN", "NUBE", "LLUVIA", "NIEVE", "RAYO", "CUEVA", "COSTA", 
  "DESIERTO", "SELVA", "PUEBLO", "ÁFRICA", "CHINA", "EGIPTO", "PARÍS",

  // --- Otros Sustantivos y Conceptos ---
  "COCHE", "AVIÓN", "TREN", "BICICLETA", "FUEGO", "AGUA", "VIENTO", "ORO", 
  "DIAMANTE", "DINERO", "MÚSICA", "PELÍCULA", "SUEÑO", "DOCTOR", "POLICÍA", 
  "REY", "REINA", "SOLDADO", "MAESTRO", "NIÑO", "NIÑA", "ABUELO", "AMIGO", 
  "TRABAJO", "JUEGO", "FIESTA", "REGALO", "COLOR", "SUERTE", "TIEMPO", "DÍA", 
  "NOCHE", "MANO", "CABEZA", "CORAZÓN", "PIE", "OJOS", "ROPA", "PANTALÓN", 
  "CAMISA", "GUANTE", "SOMBRERO"
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