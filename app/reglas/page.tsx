'use client'
import Link from 'next/link';

export default function ReglasPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 p-6 font-space">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado Estilo Holograma */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary mb-4 uppercase tracking-widest drop-shadow-[0_0_20px_rgba(34,197,94,0.45)]">
            Manual de Operaciones
          </h1>
          <p className="text-primary font-mono tracking-tighter">PROTOCOLO DE RESCATE ORBITAL // VER 1.0.4</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Sección: El Objetivo */}
          <section className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-orbitron text-cyan-300 mb-4 border-b border-cyan-500/30 pb-2">01. El Objetivo</h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Dos flotas alienígenas compiten por rescatar sus naves dispersas tras una tormenta magnética. 
              El primer equipo que logre identificar y teletransportar todas sus naves a la base ganará la misión.
            </p>
          </section>

          {/* Sección: Los Roles */}
          <section className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-orbitron text-pink-300 mb-4 border-b border-pink-500/30 pb-2">02. Jerarquía de Mando</h2>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <strong className="text-slate-200 block">Jefes de Flota:</strong> 
                Poseen el radar térmico intacto y conocen la ubicación de todas las naves. Dan pistas de una palabra y un número.
              </li>
              <li>
                <strong className="text-slate-200 block">Nave Nodriza:</strong> 
                Pilotos que interpretan las coordenadas para rescatar las naves tocando los sectores en el mapa estelar.
              </li>
            </ul>
          </section>

          {/* Sección: El Tablero */}
          <section className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-2xl md:col-span-2">
            <h2 className="text-xl font-orbitron text-yellow-300 mb-4 border-b border-yellow-500/30 pb-2">03. Identificación de Señales</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 border border-green-500/20 bg-green-500/5 rounded-lg">
                <span className="text-green-400 font-bold block mb-1">Naves Aliadas</span>
                Sectores marcados en Verde (Zirtox) o Rosa (Nebulis). Rescatarlas otorga el control.
              </div>
              <div className="p-3 border border-slate-500/20 bg-slate-500/5 rounded-lg">
                <span className="text-slate-300 font-bold block mb-1">Basura Humana</span>
                Satélites o naves neutrales. Tocar una termina el turno del equipo inmediatamente.
              </div>
              <div className="p-3 border border-red-500/20 bg-red-500/5 rounded-lg">
                <span className="text-red-500 font-bold block mb-1">Agujero Negro</span>
                Amenaza crítica. Si una nave intenta entrar aquí, es destruida y el equipo pierde la partida al instante.
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="px-8 py-3 bg-primary hover:bg-primary-fixed text-black font-orbitron rounded-full transition-all shadow-[0_0_20px_rgba(142,255,113,0.15)]">
            VOLVER AL PUERTO
          </Link>
        </div>
      </div>
    </main>
  );
}