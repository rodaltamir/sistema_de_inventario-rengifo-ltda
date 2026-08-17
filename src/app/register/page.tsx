"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle2, Circle } from "lucide-react";
import styles from "../login/login.module.css";

import Swal from 'sweetalert2';

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  // Password strength logic
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (!pass) return { score: 0, label: "", color: "transparent", width: "0%" };
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/\d/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    
    if (score < 2) return { score, label: "Débil", color: "#ef4444", width: "33%" };
    if (score < 4) return { score, label: "Buena", color: "#eab308", width: "66%" };
    return { score, label: "Fuerte", color: "#22c55e", width: "100%" };
  };

  const strength = getPasswordStrength(password);
  
  const rules = [
    { label: "Mínimo 6 caracteres", met: password.length >= 6 },
    { label: "Al menos una mayúscula", met: /[A-Z]/.test(password) },
    { label: "Al menos un número", met: /\d/.test(password) }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Las contraseñas no coinciden");
    }

    if (password.length < 6) {
      return setError("La contraseña debe tener al menos 6 caracteres");
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Ocurrió un error al registrarse");
      } else {
        await Swal.fire('¡Éxito!', 'Usuario registrado con éxito. Por favor inicia sesión.', 'success');
        router.push("/login");
      }
    } catch (err) {
      setError("Error de red al intentar registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`card ${styles.loginCard}`}>
        <div className={styles.logoSection}>
          <img src="/logo_rengifo_estandar.png" alt="Rengifo Logo" className={styles.mainLogo} />
          <p className={styles.subtitle}>Sistema de Inventario y Registro de Ventas y Compras</p>
        </div>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--color-text-main)', fontSize: '1.2rem', fontWeight: 600 }}>Registro de Usuario</h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Nombre Completo</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
            />
          </div>
          
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
            <div className={styles.passwordWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
              <button 
                type="button" 
                className={styles.eyeButton} 
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {password.length > 0 && (
              <>
                <div className={styles.strengthMeter}>
                  <div 
                    className={styles.strengthBar} 
                    style={{ width: strength.width, backgroundColor: strength.color }}
                  ></div>
                </div>
                <div style={{fontSize: '0.8rem', textAlign: 'right', color: strength.color, fontWeight: 500}}>
                  {strength.label}
                </div>
              </>
            )}

            <div className={styles.validationRules}>
              {rules.map((rule, idx) => (
                <div key={idx} className={`${styles.ruleItem} ${rule.met ? styles.ruleMet : ""}`}>
                  {rule.met ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                  <span>{rule.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Confirmar Contraseña</label>
            <div className={styles.passwordWrapper}>
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} 
                required 
              />
              <button 
                type="button" 
                className={styles.eyeButton} 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                title={showConfirmPassword ? "Ocultar contraseña" : "Ver contraseña"}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}
          
          <button type="submit" className="btn btn-primary" style={{marginTop: '0.5rem'}} disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
          
          <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.95rem' }}>
            <span style={{ color: 'var(--color-text-main)' }}>¿Ya tienes una cuenta? </span>
            <a href="/login" style={{ color: 'var(--color-primary)', fontWeight: 'bold', textDecoration: 'none' }}>
              Inicia sesión aquí
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
