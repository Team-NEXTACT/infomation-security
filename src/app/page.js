'use client';

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1>Email Security Analysis Platform</h1>
        <ol>
          <li>Analyze your emails for security threats</li>
          <li>Detect suspicious PDFs and URLs</li>
          <li>Get instant security reports</li>
          <li>Protect against phishing attacks</li>
        </ol>

        <div className={styles.ctas}>
          <Link
            href="/login"
            className={styles.primary}
          >
            Sign In
          </Link>
        </div>
      </main>
      <footer className={styles.footer}>
        <Link href="/about">
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          About
        </Link>
        <Link href="/features">
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Features
        </Link>
        <Link href="/contact">
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Contact →
        </Link>
      </footer>
    </div>
  );
}