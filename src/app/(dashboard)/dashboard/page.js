'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '@/app/lib/firebase';
import { signOut } from 'firebase/auth';
import styles from './dashboard.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchEmails();
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchEmails = async () => {
    try {
      setLoading(true);
      const emailsCollection = collection(db, 'emails');
      const emailsSnapshot = await getDocs(emailsCollection);
      const emailsList = emailsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEmails(emailsList);
    } catch (error) {
      console.error('Error fetching emails:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Email Analysis Dashboard</h1>
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className={styles.settingsButton}
        >
          {showSettings ? '대시보드 보기' : '설정'}
        </button>
      </div>

      {showSettings ? (
        <div className={styles.settingsSection}>
          <div className={styles.userInfo}>
            <h2>계정 정보</h2>
            {user && (
              <>
                <div className={styles.profileInfo}>
                  {user.photoURL && (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className={styles.profileImage}
                    />
                  )}
                  <div>
                    <p><strong>이름:</strong> {user.displayName}</p>
                    <p><strong>이메일:</strong> {user.email}</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className={styles.logoutButton}
                >
                  로그아웃
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.emailList}>
          {emails.length === 0 ? (
            <p>No emails found</p>
          ) : (
            emails.map((email) => (
              <div key={email.id} className={styles.emailCard}>
                <h3>{email.subject}</h3>
                <p>From: {email.sender}</p>
                <p>Risk Level: {email.riskLevel}</p>
                <Link href={`/email/${email.id}`}>View Details</Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
} 