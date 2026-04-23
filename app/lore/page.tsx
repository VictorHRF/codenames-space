'use client'
import Link from 'next/link';

export default function LorePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 p-6 font-space">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado Estilo Holograma */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary mb-4 uppercase tracking-widest drop-shadow-[0_0_20px_rgba(34,197,94,0.45)]">
            Registro Estelar
          </h1>
          <p className="text-primary font-mono tracking-tighter">Archivo Desclasificado: Incidente de la Tormenta Magnética</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Sección: El Incidente */}
          <section className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-orbitron text-cyan-300 mb-4 border-b border-cyan-500/30 pb-2">El Incidente</h2>
            <p className="text-sm leading-relaxed text-slate-400">
              "En el ciclo estelar 402, una tormenta de pulso electromagnético devastó el sector 7. Los radares se cegaron, 
              las comunicaciones colapsaron y el vacío se tragó el orden."
            </p>
          </section>

          {/* Facción Zirtox */}
          <section className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-orbitron text-green-300 mb-4 border-b border-green-500/30 pb-2">Los Zirtox</h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Provenientes de los pantanos radioactivos de Veridia. Son una raza militarista, robusta y conocida por su 
              extrema valentía, casi tan grande como su legendaria torpeza. Sus naves están hechas 
              de metal pesado y voluntad inquebrantable.
            </p>
          </section>

          {/* Facción Nebulis */}
          <section className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-orbitron text-pink-300 mb-4 border-b border-pink-500/30 pb-2">Los Nebulis</h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Emanaciones de luz pura del Cúmulo de Magentis. Elegantes, dramáticos y con un sentido de la estética 
              que roza lo obsesivo. Para un Nebulis, un rescate no es solo una misión, es una 
              obra de arte operística que debe ejecutarse con gracia impecable.
            </p>
          </section>

          {/* El Sector Neutral y la Amenaza */}
          <section className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-2xl md:col-span-2">
            <h2 className="text-xl font-orbitron text-yellow-300 mb-4 border-b border-yellow-500/30 pb-2">El Sector de la Tierra</h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Debido a la interferencia magnética, las balizas de auxilio se han mezclado con el primitivo lenguaje de un 
              planeta cercano llamado Tierra. Conceptos absurdos como "Manzana" o "Londres" son ahora las 
              únicas coordenadas disponibles para encontrar a las naves perdidas en medio de satélites humanos y la 
              singularidad hambrienta del Agujero Negro.
            </p>
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