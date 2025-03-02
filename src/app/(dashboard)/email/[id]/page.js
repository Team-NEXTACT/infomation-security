'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import Navbar from '@/app/components/Navbar';
import styles from './email.module.css';
import Link from 'next/link';

export default function EmailDetail() {
  const { id } = useParams();
  const [emailData, setEmailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmailData = async () => {
      try {
        setLoading(true);
        const emailDoc = doc(db, 'emails', id);
        const emailSnapshot = await getDoc(emailDoc);
        
        if (emailSnapshot.exists()) {
          const data = emailSnapshot.data();
          setEmailData({
            id: emailSnapshot.id,
            ...data,
            urls: data.urls || [] // urls가 없으면 빈 배열 사용
          });
        } else {
          setError('Email not found');
        }
      } catch (error) {
        console.error('Error fetching email:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmailData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!emailData) return <div>Email not found</div>;

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <h1>Email Analysis Details</h1>
        <div className={styles.emailContent}>
          <h2>{emailData.subject}</h2>
          <p><strong>From:</strong> {emailData.sender}</p>
          <p><strong>Risk Level:</strong> {emailData.riskLevel}</p>
          
          <div className={styles.analysisSection}>
            <h3>PDF Analysis Results</h3>
            <div className={styles.pdfResults}>
              <p><strong>URLs Found:</strong> {emailData.urls.length}</p>
              <p><strong>JavaScript Detected:</strong> {emailData.hasJavaScript ? 'Yes' : 'No'}</p>
              
              {emailData.urls.length > 0 && (
                <div className={styles.urlList}>
                  <h4>Detected URLs:</h4>
                  <ul>
                    {emailData.urls.map((url, index) => (
                      <li key={index} className={url.isSuspicious ? styles.suspicious : ''}>
                        {url.address}
                        {url.isSuspicious && <span className={styles.warning}>⚠️ Suspicious</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className={styles.feedbackSection}>
          <h3>피드백</h3>
          <Link 
            href={`/feedback?emailId=${id}`}
            className={styles.feedbackLink}
          >
            피드백 작성하기 →
          </Link>
        </div>
      </main>
    </div>
  );
} 