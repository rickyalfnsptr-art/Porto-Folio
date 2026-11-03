"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Project } from "@/lib/data";
import {
  X, ExternalLink, GitBranch, Volume2, VolumeX,
  Tv, Sparkles, CheckCircle2, Cpu, BarChart3,
  Layers, ArrowLeft, ArrowRight, Radio
} from "lucide-react";

interface ProjectTvModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
  allProjects?: Project[];
}

// Audio synth for vintage CRT sound effects (no external mp3 files needed)
function playRetroTvSound(type: "on" | "off" | "channel") {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === "on") {
      // CRT High Voltage degauss / power up hum + click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(12000, ctx.currentTime + 0.18);
      osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === "off") {
      // CRT collapse chirp
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(2400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === "channel") {
      // Static click when switching channels
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    }
  } catch {
    // Audio autoplay restrictions or unsupported
  }
}

export default function ProjectTvModal({
  project,
  onClose,
  onSelectProject,
  allProjects = []
}: ProjectTvModalProps) {
  const [phase, setPhase] = useState<"ignite" | "screen-open" | "warp-dive" | "inside" | "power-off">("ignite");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [scanlines, setScanlines] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Trigger phase sequence when project opens
  useEffect(() => {
    if (!project) return;

    if (soundEnabled) {
      playRetroTvSound("on");
    }

    setPhase("ignite");

    const t1 = setTimeout(() => {
      setPhase("screen-open");
    }, 220);

    const t2 = setTimeout(() => {
      setPhase("warp-dive");
    }, 550);

    const t3 = setTimeout(() => {
      setPhase("inside");
    }, 950);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [project, soundEnabled]);

  // Handle closing with TV collapse animation
  const handleTvPowerOff = useCallback(() => {
    if (phase === "power-off") return;
    if (soundEnabled) playRetroTvSound("off");
    setPhase("power-off");
    setTimeout(() => {
      onClose();
    }, 380);
  }, [phase, soundEnabled, onClose]);

  // Listen to Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleTvPowerOff();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleTvPowerOff]);

  // Channel surf to next / previous project
  const currentIndex = allProjects.findIndex(p => p.id === project?.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex !== -1 && currentIndex < allProjects.length - 1;

  const handleSwitchChannel = (direction: "prev" | "next") => {
    if (!onSelectProject) return;
    const nextIdx = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
    if (nextIdx >= 0 && nextIdx < allProjects.length) {
      if (soundEnabled) playRetroTvSound("channel");
      onSelectProject(allProjects[nextIdx]);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }
  };

  if (!project) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(8, 8, 14, 0.94)",
        backdropFilter: "blur(16px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        overflow: "hidden",
      }}
    >
      {/* PHASE 1: TV Igniting Horizontal Laser Line */}
      {phase === "ignite" && (
        <div
          style={{
            position: "absolute",
            width: "92%",
            maxWidth: 1000,
            height: 4,
            background: "#ffffff",
            borderRadius: 999,
            boxShadow: "0 0 40px #ffffff, 0 0 80px var(--accent), 0 0 120px #3a7be8",
            animation: "tvLineIgnite 0.24s cubic-bezier(0.2, 0.9, 0.3, 1) forwards",
          }}
        />
      )}

      {/* MAIN TV SCREEN & PORTAL CONTAINER */}
      <div
        className="tv-bezel"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 960,
          maxHeight: "92vh",
          background: "#0d0e15",
          color: "#f8f9fa",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          animation:
            phase === "screen-open"
              ? "tvScreenOpen 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards"
              : phase === "warp-dive"
              ? "warpDiveInside 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards"
              : phase === "power-off"
              ? "tvTurnOff 0.38s cubic-bezier(0.4, 0, 0.2, 1) forwards"
              : "none",
          transformOrigin: "center center",
          opacity: phase === "ignite" ? 0 : 1,
        }}
      >
        {/* CRT Scanline Overlay Texture */}
        {scanlines && (
          <div
            className="crt-overlay"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 30,
              pointerEvents: "none",
              opacity: 0.35,
            }}
          />
        )}

        {/* Vignette edge shadows */}
        <div
          className="crt-vignette"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 29,
            pointerEvents: "none",
          }}
        />

        {/* TV TOP BEZEL / HUD BAR */}
        <div
          style={{
            padding: "14px 20px",
            background: "linear-gradient(180deg, #181926 0%, #11121d 100%)",
            borderBottom: "1px solid #282a3e",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            zIndex: 35,
          }}
        >
          {/* Channel & TV Brand info */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#08090f",
                padding: "4px 12px",
                borderRadius: 8,
                border: "1px solid #33364f",
              }}
            >
              <Tv size={15} style={{ color: "var(--accent)" }} />
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "#e2e8f0",
                }}
              >
                CH-{String((currentIndex >= 0 ? currentIndex + 1 : 1)).padStart(2, "0")} // RICKY-VISION
              </span>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.75rem",
                color: "#22c55e",
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "inline-block",
                  boxShadow: "0 0 10px #22c55e",
                }}
              />
              PORTAL ACTIVE
            </div>
          </div>

          {/* Action Tools (Audio toggle, Scanline toggle, Close button) */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Mute Retro Audio" : "Unmute Retro Audio"}
              style={{
                background: soundEnabled ? "rgba(232, 103, 58, 0.15)" : "#181926",
                border: `1px solid ${soundEnabled ? "var(--accent)" : "#33364f"}`,
                borderRadius: 8,
                color: soundEnabled ? "var(--accent)" : "#94a3b8",
                padding: "6px 10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.75rem",
                fontWeight: 600,
                transition: "all 0.2s",
              }}
            >
              {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              <span className="hidden-mobile">AUDIO</span>
            </button>

            {/* Scanlines Toggle */}
            <button
              onClick={() => setScanlines(!scanlines)}
              title="Toggle CRT Scanline Effect"
              style={{
                background: scanlines ? "rgba(58, 123, 232, 0.15)" : "#181926",
                border: `1px solid ${scanlines ? "var(--accent2)" : "#33364f"}`,
                borderRadius: 8,
                color: scanlines ? "var(--accent2)" : "#94a3b8",
                padding: "6px 10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.75rem",
                fontWeight: 600,
                transition: "all 0.2s",
              }}
            >
              <Radio size={14} />
              <span className="hidden-mobile">CRT SCAN</span>
            </button>

            {/* TV Power Off / Exit Button */}
            <button
              onClick={handleTvPowerOff}
              style={{
                background: "#ef4444",
                border: "none",
                borderRadius: 8,
                color: "white",
                padding: "6px 14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                boxShadow: "0 0 16px rgba(239, 68, 68, 0.4)",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#dc2626";
                e.currentTarget.style.transform = "scale(1.04)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#ef4444";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <X size={15} />
              <span>MATIKAN TV</span>
            </button>
          </div>
        </div>

        {/* SCROLLABLE INNER PROJECT CONTENT ("INSIDE THE CARD") */}
        <div
          ref={scrollContainerRef}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: 28,
            scrollbarWidth: "thin",
            scrollbarColor: "var(--accent) #11121d",
          }}
        >
          {/* HERO BANNER SECTION */}
          <div
            style={{
              position: "relative",
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid #282a3e",
              boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
              minHeight: 280,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "28px",
              background: "#161726",
            }}
          >
            {/* Background Image with Dark Vignette Gradient */}
            <img
              src={project.image}
              alt={project.title}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                opacity: 0.55,
                filter: "brightness(0.85) contrast(1.1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(13,14,21,0.2) 0%, rgba(13,14,21,0.7) 40%, #0d0e15 100%)",
              }}
            />

            {/* Content inside the image banner */}
            <div style={{ position: "relative", zIndex: 10 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                <span
                  style={{
                    background: project.color,
                    color: "white",
                    padding: "4px 12px",
                    borderRadius: 100,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {project.category}
                </span>

                <span
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                    color: "#e2e8f0",
                    padding: "4px 12px",
                    borderRadius: 100,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  📺 Portal View
                </span>
              </div>

              <h1
                style={{
                  fontFamily: "var(--font-dm-serif)",
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  lineHeight: 1.15,
                  margin: "0 0 8px",
                  color: "#ffffff",
                  textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                }}
              >
                {project.title}
              </h1>

              <p
                style={{
                  fontSize: "1.02rem",
                  color: "#cbd5e1",
                  maxWidth: 700,
                  margin: "0 0 20px",
                  lineHeight: 1.5,
                }}
              >
                {project.subtitle}
              </p>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {project.link && project.link !== "#" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{
                      background: project.color,
                      padding: "10px 24px",
                      fontSize: "0.9rem",
                    }}
                  >
                    Buka Live Demo <ExternalLink size={15} />
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                    style={{
                      borderColor: "#475569",
                      color: "#f8fafc",
                      padding: "10px 22px",
                      fontSize: "0.9rem",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = project.color;
                      e.currentTarget.style.color = project.color;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "#475569";
                      e.currentTarget.style.color = "#f8fafc";
                    }}
                  >
                    <GitBranch size={16} /> Repository GitHub
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* STATS HIGHLIGHT METRICS (IF PRESENT) */}
          {project.stats && project.stats.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 14,
              }}
            >
              {project.stats.map((s, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#151624",
                    border: "1px solid #282a3e",
                    borderRadius: 14,
                    padding: "16px 18px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 500 }}>
                    {s.label}
                  </span>
                  <span
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      color: project.color,
                      fontFamily: "monospace",
                    }}
                  >
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* TWO COLUMN DETAILS: DESCRIPTION & ARCHITECTURE */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 24,
            }}
          >
            {/* Left Column: Long Overview & Impact */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div
                style={{
                  background: "#151624",
                  border: "1px solid #282a3e",
                  borderRadius: 16,
                  padding: "22px",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    marginBottom: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "#f8fafc",
                  }}
                >
                  <Sparkles size={18} style={{ color: project.color }} />
                  Ringkasan & Konsep Solusi
                </h3>
                <p
                  style={{
                    color: "#94a3b8",
                    lineHeight: 1.75,
                    fontSize: "0.93rem",
                    margin: 0,
                  }}
                >
                  {project.longDesc || project.desc}
                </p>
              </div>

              {project.impact && (
                <div
                  style={{
                    background: "rgba(34, 197, 94, 0.08)",
                    border: "1px solid rgba(34, 197, 94, 0.3)",
                    borderRadius: 16,
                    padding: "18px 20px",
                  }}
                >
                  <h4
                    style={{
                      margin: "0 0 6px",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "#22c55e",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <BarChart3 size={16} />
                    Dampak Terukur & Nilai Tambah
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.9rem",
                      color: "#e2e8f0",
                      lineHeight: 1.6,
                    }}
                  >
                    {project.impact}
                  </p>
                </div>
              )}
            </div>

            {/* Right Column: Key Features & Tech Stack */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {project.features && project.features.length > 0 && (
                <div
                  style={{
                    background: "#151624",
                    border: "1px solid #282a3e",
                    borderRadius: 16,
                    padding: "22px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      marginBottom: 16,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      color: "#f8fafc",
                    }}
                  >
                    <CheckCircle2 size={18} style={{ color: "#22c55e" }} />
                    Fitur & Kapabilitas Utama
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {project.features.map((feat, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                          fontSize: "0.88rem",
                          color: "#cbd5e1",
                          lineHeight: 1.5,
                        }}
                      >
                        <span
                          style={{
                            color: project.color,
                            fontWeight: 700,
                            marginTop: 1,
                          }}
                        >
                          ▹
                        </span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack Pills */}
              <div
                style={{
                  background: "#151624",
                  border: "1px solid #282a3e",
                  borderRadius: 16,
                  padding: "22px",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    marginBottom: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "#f8fafc",
                  }}
                >
                  <Cpu size={18} style={{ color: project.color }} />
                  Teknologi & Framework
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {(project.techStack || project.tags).map((t, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: "#222538",
                        border: "1px solid #363a56",
                        color: "#e2e8f0",
                        padding: "5px 12px",
                        borderRadius: 100,
                        fontSize: "0.8rem",
                        fontWeight: 600,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TV BOTTOM CONTROLS & CHANNEL SELECTOR */}
        <div
          style={{
            padding: "14px 20px",
            background: "linear-gradient(0deg, #181926 0%, #11121d 100%)",
            borderTop: "1px solid #282a3e",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            zIndex: 35,
          }}
        >
          {/* Previous channel */}
          <button
            onClick={() => handleSwitchChannel("prev")}
            disabled={!hasPrev}
            style={{
              background: "#1a1b2b",
              border: "1px solid #33364f",
              borderRadius: 8,
              color: hasPrev ? "#e2e8f0" : "#64748b",
              padding: "8px 16px",
              cursor: hasPrev ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: "0.82rem",
              fontWeight: 600,
              opacity: hasPrev ? 1 : 0.4,
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              if (hasPrev) e.currentTarget.style.borderColor = "var(--accent)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#33364f";
            }}
          >
            <ArrowLeft size={14} />
            <span>Channel Sebelumnya</span>
          </button>

          {/* Channel list dots */}
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {allProjects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  if (onSelectProject) {
                    if (soundEnabled) playRetroTvSound("channel");
                    onSelectProject(p);
                  }
                }}
                title={p.title}
                style={{
                  width: idx === currentIndex ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: idx === currentIndex ? project.color : "#33364f",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.25s ease",
                }}
              />
            ))}
          </div>

          {/* Next channel */}
          <button
            onClick={() => handleSwitchChannel("next")}
            disabled={!hasNext}
            style={{
              background: "#1a1b2b",
              border: "1px solid #33364f",
              borderRadius: 8,
              color: hasNext ? "#e2e8f0" : "#64748b",
              padding: "8px 16px",
              cursor: hasNext ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: "0.82rem",
              fontWeight: 600,
              opacity: hasNext ? 1 : 0.4,
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              if (hasNext) e.currentTarget.style.borderColor = "var(--accent)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#33364f";
            }}
          >
            <span>Channel Berikutnya</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

