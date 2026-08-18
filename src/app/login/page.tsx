"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Swal from 'sweetalert2';
import styles from "./login.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log("SignIn response:", res);

      if (res?.error) {
        setError("Credenciales inválidas o incorrectas.");
        Swal.fire('Error', 'Credenciales inválidas o incorrectas.', 'error');
      } else if (res?.ok) {
        router.push("/select-company");
      } else {
        setError("Respuesta inesperada del servidor.");
        Swal.fire('Error', 'No se pudo conectar con el servidor de autenticación.', 'error');
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Error de red al intentar iniciar sesión.");
      Swal.fire('Error de Red', 'Revise su conexión o la URL del servidor.', 'error');
    }
  };

  return (
    <div className={styles.container}>
      <div className={`card ${styles.loginCard}`}>
        <div className={styles.logoSection}>
          <img src="/logo_rengifo_estandar.png" alt="Rengifo Logo" className={styles.mainLogo} />
          <p className={styles.subtitle}>Sistema de Inventario y Registro de Ventas y Compras</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Contraseña</label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{ paddingRight: "40px", width: "100%" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#6c757d",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                  zIndex: 10
                }}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>Iniciar Sesión</button>

          <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.95rem' }}>
            <span style={{ color: 'var(--color-text-main)' }}>¿No tienes una cuenta? </span>
            <a href="/register" style={{ color: 'var(--color-primary)', fontWeight: 'bold', textDecoration: 'none' }}>
              Regístrate aquí
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
