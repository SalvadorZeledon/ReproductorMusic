export default function Playlist({ tracks, currentIndex, onPick }) {
  return (
    <div className="max-h-[420px] overflow-auto pr-1">
      <ul className="space-y-2">
        {tracks.map((t, i) => {
          const active = i === currentIndex;
          return (
            <li key={t.id ?? i}>
              <button
                onClick={() => onPick(i)}
                className="w-full rounded-2xl px-3 py-3 text-left transition-all active:scale-98 hover:opacity-80"
                style={
                  active
                    ? {
                        backgroundColor: "var(--ui-card-2)",
                        borderColor: `var(--accent)`,
                        borderWidth: "1px",
                        borderStyle: "solid",
                        boxShadow: `0 0 0 1px color-mix(in oklab, var(--accent) 55%, transparent), 0 0 24px color-mix(in oklab, var(--accent) 25%, transparent)`,
                      }
                    : {
                        backgroundColor: "var(--ui-card)",
                        borderColor: "var(--ui-border)",
                        borderWidth: "1px",
                        borderStyle: "solid",
                      }
                }
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold border transition-all"
                    style={
                      active
                        ? {
                            backgroundColor: "var(--ui-card-2)",
                            borderColor: `var(--accent)`,
                            color: `var(--accent)`,
                          }
                        : {
                            backgroundColor: "var(--ui-card-2)",
                            borderColor: "var(--ui-border)",
                            color: "var(--ui-muted)",
                          }
                    }
                  >
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className="truncate text-sm font-medium"
                      style={{ color: "var(--ui-text)" }}
                    >
                      {t.title}
                    </div>
                    <div
                      className="truncate text-xs"
                      style={{ color: "var(--ui-muted)" }}
                    >
                      {t.artist}
                    </div>
                  </div>
                  {active ? (
                    <span
                      className="rounded-full px-2 py-1 text-[11px] ring-1 transition-all font-medium"
                      style={{
                        backgroundColor: `color-mix(in oklab, var(--accent) 18%, transparent)`,
                        color: `var(--accent)`,
                        borderColor: `color-mix(in oklab, var(--accent2) 45%, transparent)`,
                      }}
                    >
                      Sonando
                    </span>
                  ) : (
                    <span className="text-xs" style={{ color: "var(--ui-muted2)" }}>
                      Tocar
                    </span>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
