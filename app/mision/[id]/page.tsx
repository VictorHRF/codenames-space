'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useMision } from '../../hooks/useMision';

export default function SalaMision() {
  const params = useParams();
  const idMision = params.id as string;
  const [rol, setRol] = useState<'jefe' | 'tripulante' | null>(null);

  // Estados para el formulario del Jefe de flota
  const [palabraClave, setPalabraClave] = useState('');
  const [cantidadClave, setCantidadClave] = useState('1');

  // Aquí llamamos a nuestro super hook
  const { mision, cargando, revelarCarta, enviarPista, terminarTurno } = useMision(idMision);

  // Pantalla de carga mientras trae los datos de Supabase
  if (cargando) {
     return (
       <div className="min-h-[80vh] flex items-center justify-center">
         <div className="text-primary font-label tracking-[0.3em] animate-pulse uppercase text-sm">
           Estableciendo Conexión de Enlace...
         </div>
       </div>
     );
  }

  // Si la misión no existe en la base de datos
  if (!mision) {
     return (
       <div className="min-h-[80vh] flex items-center justify-center">
         <div className="bg-surface-container/70 border border-error/30 p-8 bracket-tl bracket-br backdrop-blur-md">
           <p className="text-error font-headline font-black text-xl tracking-tighter uppercase">ERROR 404: SECTOR NO ENCONTRADO</p>
           <button onClick={() => window.location.href = '/'} className="mt-4 w-full text-xs font-label text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest">Regresar a la Base</button>
         </div>
       </div>
     );
  }

  // --- 1. SELECCIÓN DE ROL ---
  if (!rol) {
    return (
      <main className="grow flex items-center justify-center p-4 mt-8">
        <div className="w-full max-w-4xl relative">
          
          <div className="mb-12 text-center relative">
            <p className="text-primary font-label tracking-[0.2em] text-[10px] md:text-xs mb-2 uppercase">Protocolo de Identificación Requerido</p>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              MISIÓN: <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">{idMision}</span>
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Tripulante - Color Verde (Primary) */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <button 
                onClick={() => setRol('tripulante')} 
                className="w-full relative flex flex-col items-center p-10 bg-surface-container/70 backdrop-blur-lg border border-outline-variant/15 rounded-2xl hover:border-primary/50 transition-all text-center bracket-tl"
              >
                <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                  <div className="w-8 h-8 rounded-full bg-primary/40 animate-pulse"></div>
                </div>
                <h2 className="text-2xl font-headline font-bold mb-3 text-primary uppercase tracking-wide">Tripulantes</h2>
                <p className="text-on-surface-variant/70 text-xs font-label leading-relaxed tracking-wide uppercase">Unidad de rescate en campo. Visualización del mapa táctico encriptado.</p>
                <div className="mt-8 text-[10px] font-label text-primary/40 tracking-[0.2em] uppercase">Acceso Nivel 1</div>
              </button>
            </div>

            {/* Jefe de flota - Color Rosa (Tertiary) */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-tertiary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <button 
                onClick={() => setRol('jefe')} 
                className="w-full relative flex flex-col items-center p-10 bg-surface-container/70 backdrop-blur-lg border border-outline-variant/15 rounded-2xl hover:border-tertiary/50 transition-all text-center bracket-br"
              >
                <div className="w-16 h-16 mb-6 rounded-full bg-tertiary/10 flex items-center justify-center border border-tertiary/20 group-hover:scale-110 transition-transform">
                  <div className="w-8 h-8 bg-tertiary/40 rotate-45 animate-pulse"></div>
                </div>
                <h2 className="text-2xl font-headline font-bold mb-3 text-tertiary uppercase tracking-wide">Jefe de flota</h2>
                <p className="text-on-surface-variant/70 text-xs font-label leading-relaxed tracking-wide uppercase">Cerebro de la operación. Transmisión de coordenadas encriptadas.</p>
                <div className="mt-8 text-[10px] font-label text-tertiary/40 tracking-[0.2em] uppercase">Acceso Nivel 5</div>
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Contadores para el Header del Jefe de flota
  const faltanZirtox = mision.tablero.filter(c => c.identidad_secreta === 'zirtox' && !c.revelada).length;
  const faltanNebulis = mision.tablero.filter(c => c.identidad_secreta === 'nebulis' && !c.revelada).length;

  // --- 2. VISTA DEL JEFE DE FLOTA ---
  if (rol === 'jefe') {
    return (
      <main className="grow flex flex-col p-2 md:p-4 lg:p-6">
        <div className="w-full h-full max-w-7xl mx-auto flex flex-col">
          
          <header className="flex flex-row justify-between items-start md:items-center gap-4 mb-4 md:mb-6 bg-surface-container/70 backdrop-blur-md border border-outline-variant/15 p-3 md:p-5 rounded-xl bracket-tl">
            <div>
              <p className="text-tertiary font-label text-[8px] md:text-[10px] uppercase tracking-[0.2em] mb-1">Enlace de Datos: Nivel 5 | Misión: {mision.id}</p>
              <h1 className="text-lg md:text-xl font-headline font-black text-white tracking-tight">MAPA TÁCTICO</h1>
            </div>
            <div className="flex gap-2 md:gap-3">
              <div className="flex flex-col items-center">
                <span className="text-[7px] md:text-[8px] font-label text-primary uppercase mb-1">ZIRTOX</span>
                <div className="bg-primary/10 border border-primary/30 px-2 md:px-3 py-1 rounded text-primary font-bold text-base md:text-lg">{faltanZirtox}</div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[7px] md:text-[8px] font-label text-tertiary uppercase mb-1">NEBULIS</span>
                <div className="bg-tertiary/10 border border-tertiary/30 px-2 md:px-3 py-1 rounded text-tertiary font-bold text-base md:text-lg">{faltanNebulis}</div>
              </div>
            </div>
          </header>

          <div className="bg-surface-container/40 border border-outline-variant/10 p-3 md:p-5 rounded-xl mb-4 md:mb-6 backdrop-blur-sm relative">
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-outline-variant/30 rounded-tr-xl"></div>
            <label className="block text-[8px] md:text-[10px] text-on-surface-variant font-label uppercase tracking-[0.2em] mb-3 md:mb-4">
              Transmitir a Escuadrón ({mision.turno_actual === 'zirtox' ? <span className="text-primary">Zirtox</span> : <span className="text-tertiary">Nebulis</span>})
            </label>
            <div className="flex flex-col md:flex-row gap-2 md:gap-3">
              <input 
                type="text" 
                placeholder="PALABRA"
                value={palabraClave}
                onChange={(e) => setPalabraClave(e.target.value)}
                className="flex-1 bg-surface-container-lowest/50 border border-outline-variant/30 rounded-lg px-3 md:px-4 py-2 md:py-3 text-white font-label font-bold uppercase tracking-widest focus:border-tertiary focus:outline-none transition-colors text-xs md:text-sm"
              />
              <div className="relative">
                <select 
                  value={cantidadClave}
                  onChange={(e) => setCantidadClave(e.target.value)}
                  className="w-full md:w-16 h-full bg-surface-container-lowest/50 border border-outline-variant/30 rounded-lg px-2 md:px-2 py-2 md:py-3 text-center text-white font-label font-bold focus:border-tertiary focus:outline-none appearance-none text-xs md:text-sm"
                >
                  {[1,2,3,4,5,6,7,8,9,0].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant/30">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg>
                </div>
              </div>
              <button 
                onClick={() => {
                  enviarPista(palabraClave, parseInt(cantidadClave));
                  setPalabraClave(''); 
                }}
                className="bg-tertiary hover:bg-tertiary-fixed text-on-tertiary-fixed font-headline font-bold px-4 md:px-6 py-2 md:py-3 rounded-lg transition-all text-xs uppercase tracking-widest active:scale-95 shadow-[0_0_20px_rgba(255,107,155,0.2)] whitespace-nowrap"
              >
                Enviar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 md:gap-4">
            {mision.tablero.map((carta) => {
              let estilosCarta = "";
              if (carta.identidad_secreta === 'zirtox') estilosCarta = "bg-primary/30 border-primary/80 text-primary shadow-[0_0_10px_rgba(142,255,113,0.1)]";
              else if (carta.identidad_secreta === 'nebulis') estilosCarta = "bg-tertiary/30 border-tertiary/80 text-tertiary shadow-[0_0_10px_rgba(255,107,155,0.1)]";
              else if (carta.identidad_secreta === 'inocente') estilosCarta = "bg-surface-container-high/80 border-outline-variant/30 text-on-surface-variant";
              else if (carta.identidad_secreta === 'asesino') estilosCarta = "bg-black border-error/10 text-error shadow-[0_0_15px_rgba(255,115,81,0.2)]";

              const estilosRevelada = carta.revelada ? "opacity-20 grayscale scale-95" : "hover:scale-[1.02]";

              return (
                <div key={carta.id} className={`relative flex items-center justify-center p-1 rounded-lg border aspect-square overflow-hidden text-center transition-all duration-300 ${estilosCarta} ${estilosRevelada}`}>
                  <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-current/30"></div>
                  {carta.revelada && (
                    <div className="absolute inset-0 flex items-center justify-center text-current/40 text-2xl font-black mix-blend-overlay">✕</div>
                  )}
                  <span className="font-label font-bold text-[10px] md:text-[16px] leading-tight tracking-wider break-words uppercase">
                    {carta.palabra}
                  </span>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 md:mt-6 lg:mt-8 text-center">
            <button onClick={() => setRol(null)} className="text-[8px] md:text-[10px] font-label text-on-surface-variant hover:text-white uppercase tracking-[0.2em] transition-colors">Reconfigurar Enlace</button>
          </div>
        </div>
      </main>
    );
  }

  // --- 3. VISTA DEL TRIPULANTE  ---
  if (rol === 'tripulante') {
    return (
      <main className="min-h-screen bg-[#050B14] text-white p-4 md:p-8 font-sans bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
        
        <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-2xl">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-slate-400 text-xs font-mono uppercase tracking-widest">Estado de la Misión</p>
            <h1 className="text-2xl font-black text-primary">SECTOR {idMision}</h1>
          </div>

          <div className="flex flex-col items-center bg-black/50 border border-slate-700 px-8 py-3 rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.2)]">
            <span className="text-xs text-slate-400 uppercase tracking-widest mb-1">
              {mision.turno_actual === 'zirtox' ? <span className="text-primary">Turno Equipo Zirtox</span> : <span className="text-tertiary">Turno Equipo Nebulis</span>}
            </span>
            <div className="flex items-center gap-3 min-h-[32px]">
              {mision.pista_actual ? (
                <>
                  <span className="text-2xl font-bold text-white tracking-widest uppercase">{mision.pista_actual.palabra}</span>
                  <span className="text-primary font-black text-2xl">{mision.pista_actual.cantidad}</span>
                </>
              ) : (
                <span className="text-slate-500 font-mono text-sm">ESPERANDO TRANSMISIÓN...</span>
              )}
            </div>
          </div>

          <button 
            onClick={terminarTurno}
            className="mt-4 md:mt-0 px-6 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-sm font-bold tracking-widest transition-all"
          >
            TERMINAR TURNO
          </button>
        </header>

        <div className="max-w-6xl mx-auto grid grid-cols-5 gap-2 md:gap-4">
          {mision.tablero.map((carta) => {
            // Lógica de colores para las cartas
            let estilosCarta = "bg-white/5 border-white/20 text-white hover:bg-white/10"; // Cristal oscuro por defecto

            if (carta.revelada) {
              if (carta.identidad_secreta === 'zirtox') {
                estilosCarta = "bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_15px_#22c55e]";
              } else if (carta.identidad_secreta === 'nebulis') {
                estilosCarta = "bg-pink-500/20 border-pink-500 text-pink-400 shadow-[0_0_15px_#ec4899]";
              } else if (carta.identidad_secreta === 'inocente') {
                estilosCarta = "bg-gray-800 border-gray-600 text-gray-500 opacity-50";
              } else if (carta.identidad_secreta === 'asesino') {
                estilosCarta = "bg-black border-red-600 text-red-500 shadow-[0_0_30px_#dc2626] animate-pulse";
              }
            }

            return (
              <button
                key={carta.id}
                onClick={() => revelarCarta(carta.id)}
                disabled={carta.revelada || mision.estado !== 'jugando'}
                className={`
                  relative flex items-center justify-center p-2 md:p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 aspect-video md:aspect-[4/3] overflow-hidden group
                  ${estilosCarta}
                `}
              >
                {carta.revelada && (
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)] mix-blend-overlay pointer-events-none"></div>
                )}
                <span className={`font-bold text-xs md:text-lg tracking-widest z-10 ${carta.revelada && carta.identidad_secreta === 'asesino' ? 'text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]' : ''}`}>
                  {carta.revelada && carta.identidad_secreta === 'asesino' ? '¡PELIGRO!' : carta.palabra}
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Notificación de Fin de Juego */}
        {mision.estado !== 'jugando' && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
             <div className="bg-slate-900 border border-slate-700 p-10 rounded-2xl text-center shadow-2xl">
                <h2 className="text-4xl font-black mb-4 uppercase">
                  {mision.estado === 'gana_zirtox' && <span className="text-primary">¡ESCUADRÓN ZIRTOX GANA!</span>}
                  {mision.estado === 'gana_nebulis' && <span className="text-tertiary">¡ESCUADRÓN NEBULIS GANA!</span>}
                  {mision.estado === 'gana_alien' && <span className="text-green-500">¡EL ALIENÍGENA HA VENCIDO!</span>}
                </h2>
                <button onClick={() => window.location.href = '/'} className="mt-6 bg-white text-black px-8 py-3 rounded-xl font-bold">Volver a la Base</button>
             </div>
          </div>
        )}

      </main>
    );
  }
}