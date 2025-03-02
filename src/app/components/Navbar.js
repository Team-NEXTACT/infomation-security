'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { auth } from '@/app/lib/firebase';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        Email Security Analysis
      </div>
      <div className={styles.links}>
        <Link 
          href="/dashboard" 
          className={pathname === '/dashboard' ? styles.active : ''}
        >
          Dashboard
        </Link>
        <Link 
          href="/settings" 
          className={pathname === '/settings' ? styles.active : ''}
        >
          Settings
        </Link>
      </div>
    </nav>
  );
} 