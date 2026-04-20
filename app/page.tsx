'use client'; // Esto habilita la interactividad, el estado y los hooks de React

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importante: usar next/navigation en App Router
import { crearNuevaMision } from './actions/crearMision';

export default function Home() {
  const router = useRouter();
  
  // Estados para controlar los inputs y el estado de carga
  const [codigo, setCodigo] = useState('');
  const [creando, setCreando] = useState(false);

  // Función 1: Crea la sala en Supabase y nos redirige
  const handleCrearMision = async () => {
    setCreando(true);
    const idMision = await crearNuevaMision();
    
    if (idMision) {
      // Redirigimos al usuario a la URL única de su sala
      router.push(`/mision/${idMision}`);
    } else {
      alert("Error al establecer conexión con la base central.");
      setCreando(false);
    }
  };

  // Función 2: Nos lleva a una sala existente
  const handleUnirse = () => {
    if (codigo.trim().length > 0) {
      router.push(`/mision/${codigo.toUpperCase()}`);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-black text-white p-4">
      
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-10 md:p-14 rounded-3xl shadow-[0_0_50px_rgba(34,211,238,0.1)] flex flex-col items-center max-w-md w-full relative overflow-hidden">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-2 text-center tracking-tight">
          CÓDIGO ALIEN
        </h1>
        <p className="text-slate-400 mb-10 tracking-[0.2em] text-xs md:text-sm uppercase font-semibold text-center">
          Transmisión Encriptada
        </p>

        <button 
          onClick={handleCrearMision}
          disabled={creando}
          className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-800 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(8,145,178,0.6)] hover:-translate-y-1 mb-8"
        >
          {creando ? 'INICIALIZANDO...' : 'INICIAR NUEVA MISIÓN'}
        </button>

        <div className="flex items-center w-full mb-8">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="px-4 text-slate-500 text-sm font-medium tracking-widest">O</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        <div className="w-full space-y-3">
          <label htmlFor="codigo" className="text-xs text-slate-400 font-medium uppercase tracking-wider ml-1">
            Enlace de conexión
          </label>
          <div className="flex gap-2">
            <input 
              id="codigo"
              type="text" 
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUnirse()}
              placeholder="EJ: X7B9" 
              maxLength={4}
              className="bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 w-full text-center text-lg tracking-[0.25em] uppercase focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 placeholder:font-light"
            />
            <button 
              onClick={handleUnirse}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-cyan-400 font-bold px-6 py-3 rounded-xl transition-all"
            >
              UNIRSE
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}