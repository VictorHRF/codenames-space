// app/actions/crearMision.ts
'use server' // ¡Esto es clave! Le dice a Next.js que este código NUNCA se enviará al navegador.

import { createClient } from '@supabase/supabase-js';
import { DICCIONARIO_ESPACIAL, barajarArray, generarCodigoSala } from '../lib/juego';

// Inicializamos Supabase con nuestras variables de entorno
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function crearNuevaMision() {
  try {
    // 1. Elegir 25 palabras al azar del diccionario
    const palabrasMezcladas = barajarArray(DICCIONARIO_ESPACIAL).slice(0, 25);

    // 2. Decidir qué equipo empieza (50% de probabilidad para cada uno)
    const turnoInicial = Math.random() > 0.5 ? 'rojo' : 'azul';

    // 3. Crear el "mazo" de identidades secretas según las reglas de Codenames
    // El equipo que empieza tiene 9 agentes, el otro 8. 7 inocentes, 1 asesino (Alien).
    const identidades = [
      ...Array(turnoInicial === 'rojo' ? 9 : 8).fill('rojo'),
      ...Array(turnoInicial === 'azul' ? 9 : 8).fill('azul'),
      ...Array(7).fill('inocente'),
      'asesino'
    ];

    // Mezclamos las identidades
    const identidadesMezcladas = barajarArray(identidades);

    // 4. Unir las palabras con sus identidades ocultas para armar la cuadrícula
    const tablero = palabrasMezcladas.map((palabra, index) => ({
      id: index,
      palabra: palabra,
      identidad_secreta: identidadesMezcladas[index],
      revelada: false // Al inicio del juego, ninguna carta está descubierta
    }));

    // 5. Generar código de sala
    const idMision = generarCodigoSala();

    // 6. Insertar la nueva partida en la base de datos (Supabase)
    const { error } = await supabase
      .from('misiones')
      .insert([
        {
          id: idMision,
          turno_actual: turnoInicial,
          tablero: tablero,
          requiere_pista_digital: false // Nuestra opción para usar voz en presencial
        }
      ]);

    if (error) {
      console.error("Error de Supabase:", error);
      throw new Error("No se pudo insertar la misión en la base de datos.");
    }

    // Retornamos el ID para poder redirigir al usuario a su sala
    return idMision;

  } catch (error) {
    console.error("Error al crear la misión:", error);
    return null;
  }
}