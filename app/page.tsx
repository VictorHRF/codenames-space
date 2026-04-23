'use client'; // Esto habilita la interactividad, el estado y los hooks de React

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { crearNuevaMision } from './actions/crearMision';
import Link from 'next/link';

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
    <main className="grow flex items-center justify-center p-4 mt-16">
      
      <div className="w-full max-w-md relative bracket-tl bracket-br bg-surface-container/70 backdrop-blur-lg shadow-[0_0_40px_rgba(142,255,112,0.08)] p-8 sm:p-10 border border-outline-variant/15">
        
        <div className='text-center sm:text-left relative'>
          
          <div className="absolute -left-10 top-0 w-1 h-full bg-gradient-to-b from-primary to-transparent hidden sm:block"></div>

          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8eff71] to-[#ff6b9b] mb-2 text-center tracking-tight">
            CÓDIGO ALIEN
          </h1>
          <p className="font-label text-primary text-[10px] mb-10 tracking-[0.2em] md:text-sm uppercase text-center">
            ESTATUS DE SISTEMA: ACTIVO
          </p>

          <div className='mb-2 relative group cursor-pointer'>
            <div className="absolute -inset-1 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
              <button 
                onClick={handleCrearMision}
                disabled={creando}
                className="w-full relative mb-8 flex justify-center p-5 bg-gradient-to-r from-primary to-primary-container rounded-lg overflow-hidden transition-transform duration-300 active:scale-[0.98]"
              >
                <span className="font-headline font-bold text-on-primary-fixed text-lg tracking-wide uppercase">{creando ? 'INICIALIZANDO...' : 'INICIAR NUEVA MISIÓN'}</span>
              </button>
          </div>

          <div className="flex items-center w-full mb-8">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="px-4 text-slate-500 text-sm font-medium tracking-widest">O</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <div className="space-y-4">
            <label htmlFor="codigo" className="text-xs font-label text-tertiary tracking-[0.2em] uppercase mb-2 block">
              Enlace de conexión
            </label>

            <div className="relative">
              <input 
                id="codigo"
                type="text" 
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUnirse()}
                placeholder="Ingresa código de misión..." 
                maxLength={4}
                className="w-full bg-surface-container-lowest/80 border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/40 rounded-lg pl-10 pr-4 py-4 font-label text-sm tracking-widest uppercase focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary/50 focus:bg-tertiary/5 transition-all shadow-inner"
              />
            </div>
              <button 
                onClick={handleUnirse}
                className="w-full relative group p-4 bg-transparent border-[1.5px] border-tertiary rounded-lg flex items-center justify-center gap-3 overflow-hidden transition-all duration-300 hover:bg-tertiary/10 hover:shadow-[0_0_24px_rgba(255,107,155,0.2)] active:scale-[0.98]"
              >
                <span className="font-headline font-bold text-tertiary text-sm tracking-widest uppercase group-hover:text-tertiary-fixed transition-colors">Unirse a misión</span>
              </button>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 border-t border-outline-variant/15 pt-6">
            <Link className="font-label text-xs tracking-[0.15em] text-on-surface-variant hover:text-primary transition-colors uppercase" href="/reglas">Reglas del Juego</Link>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-outline-variant/50"></div>
            <Link className="font-label text-xs tracking-[0.15em] text-on-surface-variant hover:text-tertiary transition-colors uppercase" href="/lore">Historia del Juego</Link>
          </div>
            
          <div className="mt-4 border-t border-outline-variant/10 flex justify-between items-center opacity-40">
            <span className="font-label text-[8px] tracking-[0.2em]">V 2.4.9</span>
            <span className="font-label text-[8px] tracking-[0.2em]">SEC: CLEAR</span>
          </div>

        </div>
      </div>
    </main>
  );
}