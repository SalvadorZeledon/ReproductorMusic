import { useEffect, useState } from "react";

export default function BackgroundLayer({ theme }) {
  const [layers, setLayers] = useState([]);

  useEffect(() => {
    if (!theme?.colors) return;

    const newLayer = {
      id: Date.now(),
      theme,
      opacity: 0,
    };

    setLayers((prev) => {
      const updated = [...prev, newLayer];
      if (updated.length > 2) {
        return updated.slice(-2);
      }
      return updated;
    });

    setTimeout(() => {
      setLayers((prev) =>
        prev.map((layer) =>
          layer.id === newLayer.id ? { ...layer, opacity: 1 } : { ...layer, opacity: 0 }
        )
      );
    }, 50);
  }, [theme?.colors?.[0], theme?.colors?.[1], theme?.colors?.[2], theme?.colors?.[3]]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {layers.map((layer) => {
        const [c0, c1, c2, c3] = layer.theme.colors || [];
        const isLight = layer.theme.mode === "light";

        const darkBg = `
          radial-gradient(900px circle at 20% 20%, ${c2}55 0%, transparent 60%),
          radial-gradient(800px circle at 80% 30%, ${c3}55 0%, transparent 62%),
          radial-gradient(700px circle at 50% 85%, ${c1}45 0%, transparent 65%),
          linear-gradient(135deg, ${c0} 0%, ${c0} 35%, ${c1} 100%)
        `;

        const lightBg = `
          radial-gradient(900px circle at 20% 20%, ${c2}45 0%, transparent 60%),
          radial-gradient(800px circle at 80% 30%, ${c3}45 0%, transparent 62%),
          radial-gradient(700px circle at 50% 85%, ${c1}35 0%, transparent 65%),
          linear-gradient(135deg, #FFFFFF 0%, ${c0} 40%, ${c1} 100%)
        `;

        return (
          <div
            key={layer.id}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{
              opacity: layer.opacity,
              background: isLight ? lightBg : darkBg,
            }}
          />
        );
      })}

      {/* Overlay condicional: oscuro para dark, claro para light */}
      <div className="absolute inset-0 bg-black/20 dark-overlay" />
      <div className="absolute inset-0 bg-white/30 light-overlay opacity-0" />
    </div>
  );
}
