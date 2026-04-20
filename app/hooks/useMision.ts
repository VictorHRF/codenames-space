// app/hooks/useMision.ts
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inicializamos el cliente de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Definimos la estructura de datos para que TypeScript nos ayude
export type Carta = {
  id: number;
  palabra: string;
  identidad_secreta: 'rojo' | 'azul' | 'inocente' | 'asesino';
  revelada: boolean;
};

export type EstadoMision = {
  id: string;
  turno_actual: 'rojo' | 'azul';
  pista_actual: { palabra: string; cantidad: number } | null;
  tablero: Carta[];
  estado: 'jugando' | 'gana_azul' | 'gana_rojo' | 'gana_alien';
};

export function useMision(idMision: string) {
  const [mision, setMision] = useState<EstadoMision | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // 1. Cargar el estado inicial de la partida al entrar a la sala
    const cargarMision = async () => {
      const { data, error } = await supabase
        .from('misiones')
        .select('*')
        .eq('id', idMision)
        .single();

      if (data) {
        setMision(data);
      } else if (error) {
        console.error("Error al cargar la misión:", error);
      }
      setCargando(false);
    };

    cargarMision();

    // 2. Suscribirse a los cambios en Tiempo Real
    // Aquí es donde ocurre la magia: Supabase nos avisa si alguien modifica esta sala
    const canal = supabase
      .channel('cambios-mision')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'misiones',
          filter: `id=eq.${idMision}`
        },
        (payload) => {
          // Cuando hay un cambio en la base de datos, actualizamos nuestra pantalla
          setMision(payload.new as EstadoMision);
        }
      )
      .subscribe();

    // Limpiamos la conexión cuando el usuario cierra la ventana
    return () => {
      supabase.removeChannel(canal);
    };
  }, [idMision]);

  // Función para que el Escuadrón toque una carta y se revele
  const revelarCarta = async (idCarta: number) => {
    if (!mision || mision.estado !== 'jugando') return;

    // Buscamos la carta que tocaron
    const cartaTocada = mision.tablero.find(c => c.id === idCarta);
    if (!cartaTocada || cartaTocada.revelada) return; // Si ya estaba revelada, no hacemos nada

    // Creamos un nuevo tablero con esa carta específica revelada
    const nuevoTablero = mision.tablero.map(c => 
      c.id === idCarta ? { ...c, revelada: true } : c
    );

    // Lógica rápida para cambio de turno
    // Lógica rápida para cambio de turno
    let nuevoTurno = mision.turno_actual;
    // Le decimos a TypeScript que acepte cualquiera de los estados válidos
    let nuevoEstado: EstadoMision['estado'] = mision.estado;

    if (cartaTocada.identidad_secreta === 'asesino') {
      nuevoEstado = 'gana_alien';
    } else if (cartaTocada.identidad_secreta === 'inocente' || cartaTocada.identidad_secreta !== mision.turno_actual) {
       // Pierden el turno si tocan a un inocente o al color contrario
       nuevoTurno = mision.turno_actual === 'rojo' ? 'azul' : 'rojo';
       // Borramos la pista actual para que el nuevo equipo reciba una nueva
       await supabase.from('misiones').update({ 
         tablero: nuevoTablero, 
         turno_actual: nuevoTurno,
         pista_actual: null 
       }).eq('id', idMision);
       return;
    }

    // Comprobamos si alguien ganó (si revelaron todas sus cartas)
    const faltanAzules = nuevoTablero.filter(c => c.identidad_secreta === 'azul' && !c.revelada).length;
    const faltanRojas = nuevoTablero.filter(c => c.identidad_secreta === 'rojo' && !c.revelada).length;

    if (faltanAzules === 0) nuevoEstado = 'gana_azul';
    if (faltanRojas === 0) nuevoEstado = 'gana_rojo';

    // Enviamos el tablero actualizado a la base de datos
    await supabase.from('misiones').update({ 
      tablero: nuevoTablero,
      estado: nuevoEstado
    }).eq('id', idMision);
  };

  // Función para que el Jefe de Espías envíe la pista
  const enviarPista = async (palabra: string, cantidad: number) => {
    if (!mision || mision.estado !== 'jugando') return;

    await supabase.from('misiones').update({
      pista_actual: { palabra, cantidad }
    }).eq('id', idMision);
  };

  const terminarTurno = async () => {
      if (!mision || mision.estado !== 'jugando') return;
      const nuevoTurno = mision.turno_actual === 'rojo' ? 'azul' : 'rojo';
      await supabase.from('misiones').update({ 
        turno_actual: nuevoTurno,
        pista_actual: null 
      }).eq('id', idMision);
  }

  return { mision, cargando, revelarCarta, enviarPista, terminarTurno };
}