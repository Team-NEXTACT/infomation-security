'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/app/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import styles from './settings.module.css';

export default function Settings() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) return null;

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <h1>Settings</h1>
        <div className={styles.userInfo}>
          <h2>Account Information</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Name:</strong> {user.displayName}</p>
          <img 
            src={user.photoURL} 
            alt="Profile" 
            className={styles.profileImage}
          />
        </div>
        <div className={styles.actions}>
          <button 
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
} 