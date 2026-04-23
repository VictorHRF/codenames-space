export default function SpaceBackground({ children }) {
  return (
    <div className="relative min-h-screen bg-[#090f14] text-white overflow-hidden">

      {/* 🌌 Fondo base (imagen) */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/nebula.png')" }}
      >
        {/* 🎨 Overlay oscuro vertical */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090f14]/80 via-[#090f14]/60 to-[#090f14]/80" />

        {/* 💚 Glow verde (arriba derecha) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(142,255,113,0.15),transparent_40%)]" />

        {/* 💗 Glow rosa (abajo izquierda) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,107,155,0.15),transparent_40%)]" />
      </div>

      {/* 🧱 Contenido */}
      <div className="relative z-10 max-w-xl m-auto">
        {children}
      </div>
    </div>
  );
}