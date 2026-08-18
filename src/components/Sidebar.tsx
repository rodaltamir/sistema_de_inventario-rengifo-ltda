"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";
import { 
  Home, Package, Users, ShoppingCart, FileText, CreditCard, Clock, LogOut,
  Building, Store, Factory, Coffee, Laptop, Briefcase, Camera, Music, Book,
  LayoutDashboard, ArrowLeftRight, Building2, Settings
} from 'lucide-react';
import styles from './Sidebar.module.css';

const ICON_MAP: Record<string, any> = {
  Building, Store, Factory, ShoppingCart, Coffee, Laptop, Briefcase, Camera, Music, Book
};

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const currentTenant: any = session?.user?.tenants?.find(
    (t: any) => t.id === session?.user?.currentTenantId
  );

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Transacciones", href: "/transacciones", icon: ArrowLeftRight },
    { name: "Productos", href: "/productos", icon: Package },
    { name: "Contactos", href: "/proveedores", icon: Users },
    { name: "Kardex", href: '/kardex', icon: FileText },
    { name: 'Créditos/Deudas', href: '/creditos-deudas', icon: CreditCard },
    { name: 'Historial', href: '/historial', icon: Clock },
    { name: "Configuración", href: "/configuracion", icon: Settings },
  ];

  const logoStr = currentTenant?.logo;
  const isUrl = logoStr && (logoStr.startsWith('http') || logoStr.startsWith('/'));
  const TenantIcon = ICON_MAP[logoStr || 'Building'] || Building;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        {isUrl ? (
          <img src={logoStr} alt="Logo" className={styles.companyLogo} style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '12px', marginBottom: '1rem', background: '#fff', padding: '5px', border: '1px solid var(--color-border)' }} />
        ) : (
          <div style={{ background: 'var(--color-primary-light)', padding: '1rem', borderRadius: '12px', marginBottom: '1rem', display: 'inline-flex' }}>
            <TenantIcon className={styles.companyIcon} style={{ width: '40px', height: '40px', color: 'var(--color-primary)' }} />
          </div>
        )}
        <h2 className={styles.companyName} style={{ fontSize: '1.2rem', lineHeight: '1.4' }}>{currentTenant?.name || "Rengifo"}</h2>
        {currentTenant?.nit && <span className={styles.companyNit}>NIT: {currentTenant.nit}</span>}
      </div>
      
      <nav className={styles.nav}>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className={`${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              <Icon size={20} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className={styles.footer}>
        <Link 
          href="/select-company"
          className="btn btn-outline" 
          style={{width: '100%', marginBottom: '1rem', color: 'var(--color-primary)', borderColor: 'var(--color-primary)'}}
        >
          <Building size={18} />
          <span>Cambiar Empresa</span>
        </Link>
        <button 
          className="btn btn-outline" 
          style={{width: '100%', color: 'var(--color-danger)', borderColor: 'var(--color-danger)'}}
          onClick={() => signOut({ callbackUrl: '/login' })}
        >
          <LogOut size={18} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
