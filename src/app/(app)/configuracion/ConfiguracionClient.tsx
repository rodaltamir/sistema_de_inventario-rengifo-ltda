"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Monitor, Save, Palette, Building2 } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function ConfiguracionClient({ currentTenant }: { currentTenant: any }) {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Cargar preferencia guardada
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme as any);
    } else {
      setTheme("system");
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      localStorage.removeItem("theme");
    } else {
      root.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme, isMounted]);

  const handleSave = () => {
    MySwal.fire({
      icon: "success",
      title: "Configuración guardada",
      text: "Tus preferencias han sido guardadas con éxito.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  if (!isMounted) return null;

  return (
    <div className="card glass" style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
      
      {/* Sección de Tema */}
      <section>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
          <Palette size={20} />
          Apariencia
        </h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button
            className={`btn ${theme === 'light' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setTheme("light")}
            style={{ flex: 1 }}
          >
            <Sun size={18} /> Claro
          </button>
          <button
            className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setTheme("dark")}
            style={{ flex: 1 }}
          >
            <Moon size={18} /> Oscuro
          </button>
          <button
            className={`btn ${theme === 'system' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setTheme("system")}
            style={{ flex: 1 }}
          >
            <Monitor size={18} /> Sistema
          </button>
        </div>
      </section>

      <hr style={{ borderTop: "1px solid var(--color-border)" }} />

      {/* Sección de la Empresa (Solo lectura informativa por ahora) */}
      <section>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
          <Building2 size={20} />
          Información de la Empresa (Actual)
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-text-muted)' }}>Razón Social</label>
            <div style={{ padding: '0.8rem', background: 'var(--color-bg)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--color-border)' }}>
              {currentTenant?.name || "Sin nombre"}
            </div>
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-text-muted)' }}>NIT</label>
            <div style={{ padding: '0.8rem', background: 'var(--color-bg)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--color-border)' }}>
              {currentTenant?.nit || "S/N"}
            </div>
          </div>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '1rem' }}>
          Para cambiar los datos de la empresa, contacta con el administrador del sistema.
        </p>
      </section>

      {/* Botón de Guardar General (Simulado) */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
        <button className="btn btn-primary" onClick={handleSave}>
          <Save size={18} /> Guardar Cambios
        </button>
      </div>

    </div>
  );
}
