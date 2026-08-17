"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Credenciales inválidas");
    } else {
      router.push("/select-company");
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
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
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
