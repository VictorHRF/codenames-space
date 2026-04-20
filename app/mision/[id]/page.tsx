'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useMision } from '../../hooks/useMision';

export default function SalaMision() {
  const params = useParams();
  const idMision = params.id as string;
  const [rol, setRol] = useState<'ia' | 'escuadron' | null>(null);

  // Estados para el formulario del Jefe de Espías
  const [palabraClave, setPalabraClave] = useState('');
  const [cantidadClave, setCantidadClave] = useState('1');

  // Aquí llamamos a nuestro super hook
  const { mision, cargando, revelarCarta, enviarPista, terminarTurno } = useMision(idMision);

  // Pantalla de carga mientras trae los datos de Supabase
  if (cargando) {
     return <div className="min-h-screen flex items-center justify-center bg-black text-cyan-500 font-mono">ESTABLECIENDO CONEXIÓN...</div>;
  }

  // Si la misión no existe en la base de datos
  if (!mision) {
     return <div className="min-h-screen flex items-center justify-center bg-black text-red-500 font-mono">ERROR 404: SECTOR NO ENCONTRADO</div>;
  }

  // --- 1. SELECCIÓN DE ROL ---
  if (!rol) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-black text-white p-6">
        <div className="mb-12 text-center">
          <p className="text-cyan-500 font-mono tracking-widest text-sm mb-2">SECTOR CONECTADO</p>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            MISIÓN: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{idMision}</span>
          </h1>
        </div>
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
          <button onClick={() => setRol('escuadron')} className="group relative flex flex-col items-center p-8 backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 hover:border-cyan-500/50 transition-all text-left">
            <h2 className="text-2xl font-bold mb-2 text-cyan-400">Escuadrón de Rescate</h2>
            <p className="text-slate-400 text-sm">Pantalla principal (Tablet/TV). Visualiza el mapa encriptado.</p>
          </button>
          <button onClick={() => setRol('ia')} className="group relative flex flex-col items-center p-8 backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 hover:border-red-500/50 transition-all text-left">
            <h2 className="text-2xl font-bold mb-2 text-red-400">Computadora Central</h2>
            <p className="text-slate-400 text-sm">Control maestro (Celular). Transmite las pistas.</p>
          </button>
        </div>
      </main>
    );
  }

  // Contadores para el Header del Jefe de Espías
  const faltanAzules = mision.tablero.filter(c => c.identidad_secreta === 'azul' && !c.revelada).length;
  const faltanRojas = mision.tablero.filter(c => c.identidad_secreta === 'rojo' && !c.revelada).length;

  // --- 2. VISTA DE LA COMPUTADORA CENTRAL (CELULAR) ---
  if (rol === 'ia') {
    return (
      <main className="min-h-screen bg-[#0a0505] text-white p-2 md:p-4 font-sans bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
        <div className="max-w-md mx-auto">
          
          <header className="flex justify-between items-center mb-4 bg-red-950/30 border border-red-900/50 p-4 rounded-xl">
            <div>
              <p className="text-red-400 text-xs font-mono uppercase tracking-widest">Nivel de Acceso: IA</p>
              <h1 className="text-xl font-black text-white">MAPA TÁCTICO</h1>
            </div>
            <div className="flex gap-2">
              <div className="bg-cyan-900 border border-cyan-500 px-3 py-1 rounded text-cyan-100 font-bold">{faltanAzules}</div>
              <div className="bg-red-900 border border-red-500 px-3 py-1 rounded text-red-100 font-bold">{faltanRojas}</div>
            </div>
          </header>

          <div className="bg-white/5 border border-white/10 p-4 rounded-xl mb-6 backdrop-blur-md">
            <label className="block text-xs text-slate-400 font-medium uppercase tracking-widest mb-3">
              Transmitir Coordenadas ({mision.turno_actual === 'azul' ? 'Turno Azul' : 'Turno Rojo'})
            </label>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="PALABRA"
                value={palabraClave}
                onChange={(e) => setPalabraClave(e.target.value)}
                className="flex-1 bg-black/50 border border-slate-700 rounded-lg px-3 py-2 text-white font-bold uppercase tracking-widest focus:border-red-500 focus:outline-none"
              />
              <select 
                value={cantidadClave}
                onChange={(e) => setCantidadClave(e.target.value)}
                className="w-16 bg-black/50 border border-slate-700 rounded-lg px-2 py-2 text-center text-white font-bold focus:border-red-500 focus:outline-none appearance-none"
              >
                {[1,2,3,4,5,6,7,8,9,0].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <button 
                onClick={() => {
                  enviarPista(palabraClave, parseInt(cantidadClave));
                  setPalabraClave(''); // Limpiamos el input
                }}
                className="bg-red-700 hover:bg-red-600 border border-red-500 text-white font-bold px-4 py-2 rounded-lg transition-all text-sm uppercase tracking-wider"
              >
                Enviar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-1 md:gap-2">
            {mision.tablero.map((carta) => {
              let estilosCarta = "";
              if (carta.identidad_secreta === 'azul') estilosCarta = "bg-cyan-900 border-cyan-700 text-cyan-100";
              else if (carta.identidad_secreta === 'rojo') estilosCarta = "bg-red-900 border-red-700 text-red-100";
              else if (carta.identidad_secreta === 'inocente') estilosCarta = "bg-slate-800 border-slate-600 text-slate-300";
              else if (carta.identidad_secreta === 'asesino') estilosCarta = "bg-black border-green-500 text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]";

              const estilosRevelada = carta.revelada ? "opacity-30 grayscale" : "";

              return (
                <div key={carta.id} className={`relative flex items-center justify-center p-1 md:p-2 rounded border aspect-[4/3] overflow-hidden text-center ${estilosCarta} ${estilosRevelada}`}>
                  {carta.revelada && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/50 text-3xl font-black mix-blend-overlay">✗</div>
                  )}
                  <span className="font-bold text-[8px] md:text-xs tracking-wider break-words w-full">
                    {carta.palabra}
                  </span>
                </div>
              );
            })}
          </div>
          
        </div>
      </main>
    );
  }

  // --- 3. VISTA DEL ESCUADRÓN (IPAD) ---
  if (rol === 'escuadron') {
    return (
      <main className="min-h-screen bg-[#050B14] text-white p-4 md:p-8 font-sans bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
        
        <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-2xl">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-slate-400 text-xs font-mono uppercase tracking-widest">Estado de la Misión</p>
            <h1 className="text-2xl font-black text-cyan-400">SECTOR {idMision}</h1>
          </div>

          <div className="flex flex-col items-center bg-black/50 border border-slate-700 px-8 py-3 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <span className="text-xs text-slate-400 uppercase tracking-widest mb-1">
              {mision.turno_actual === 'azul' ? <span className="text-cyan-400">Turno Equipo Azul</span> : <span className="text-red-400">Turno Equipo Rojo</span>}
            </span>
            <div className="flex items-center gap-3 min-h-[32px]">
              {mision.pista_actual ? (
                <>
                  <span className="text-2xl font-bold text-white tracking-widest uppercase">{mision.pista_actual.palabra}</span>
                  <span className="text-cyan-400 font-black text-2xl">{mision.pista_actual.cantidad}</span>
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
            let estilosCarta = "bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] text-white cursor-pointer"; 
            
            if (carta.revelada) {
              if (carta.identidad_secreta === 'azul') estilosCarta = "bg-cyan-600 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] text-white";
              else if (carta.identidad_secreta === 'rojo') estilosCarta = "bg-red-600 border-red-400 shadow-[0_0_20px_rgba(248,113,113,0.5)] text-white";
              else if (carta.identidad_secreta === 'inocente') estilosCarta = "bg-slate-600 border-slate-400 opacity-60 text-slate-200";
              else if (carta.identidad_secreta === 'asesino') estilosCarta = "bg-black border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.8)] text-green-400";
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
                  {mision.estado === 'gana_azul' && <span className="text-cyan-400">¡ESCUADRÓN AZUL GANA!</span>}
                  {mision.estado === 'gana_rojo' && <span className="text-red-400">¡ESCUADRÓN ROJO GANA!</span>}
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