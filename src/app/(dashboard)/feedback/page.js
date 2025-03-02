'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import Navbar from '@/app/components/Navbar';
import styles from './feedback.module.css';

export default function Feedback() {
  const [message, setMessage] = useState('');
  const [emailData, setEmailData] = useState(null);
  const searchParams = useSearchParams();
  const emailId = searchParams.get('emailId');

  useEffect(() => {
    const fetchEmailData = async () => {
      if (!emailId) return;
      
      try {
        const emailDoc = doc(db, 'emails', emailId);
        const emailSnapshot = await getDoc(emailDoc);
        
        if (emailSnapshot.exists()) {
          setEmailData({
            id: emailSnapshot.id,
            ...emailSnapshot.data()
          });
        }
      } catch (error) {
        console.error('Error fetching email:', error);
        setMessage('이메일 정보를 불러오는데 실패했습니다.');
      }
    };

    fetchEmailData();
  }, [emailId]);

  const handleReport = async () => {
    if (!emailId) {
      setMessage('이메일 ID가 없습니다.');
      return;
    }

    try {
      const emailRef = doc(db, 'emails', emailId);
      await updateDoc(emailRef, {
        reported: true,
        reportedAt: new Date().toISOString()
      });
      setMessage('해당 이메일이 신고 처리 되었습니다.');
    } catch (error) {
      setMessage('신고 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleMarkDangerous = async () => {
    if (!emailId) {
      setMessage('이메일 ID가 없습니다.');
      return;
    }

    try {
      const emailRef = doc(db, 'emails', emailId);
      await updateDoc(emailRef, {
        markedDangerous: true,
        markedAt: new Date().toISOString()
      });
      setMessage('해당 이메일을 위험으로 등록했습니다.');
    } catch (error) {
      setMessage('위험 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <h1>이메일 피드백</h1>
        
        {emailData && (
          <div className={styles.emailInfo}>
            <h2>이메일 정보</h2>
            <p><strong>제목:</strong> {emailData.subject}</p>
            <p><strong>보낸 사람:</strong> {emailData.sender}</p>
            <p><strong>위험도:</strong> {emailData.riskLevel}</p>
          </div>
        )}

        {message && (
          <div className={styles.message}>
            {message}
          </div>
        )}

        <div className={styles.actions}>
          <button 
            onClick={handleMarkDangerous}
            className={styles.dangerousButton}
          >
            위험으로 등록
          </button>
          <button 
            onClick={handleReport}
            className={styles.reportButton}
          >
            이메일 신고
          </button>
        </div>
      </main>
    </div>
  );
} 