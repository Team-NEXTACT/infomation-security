'use client';

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function Login() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Email Security Analysis</h1>
      <button onClick={handleGoogleLogin} className={styles.googleButton}>
        Sign in with Google
      </button>
    </div>
  );
} 