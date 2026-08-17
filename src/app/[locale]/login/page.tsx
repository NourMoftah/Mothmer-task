"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mothmerApi } from "@/lib/api/mothmer";
import { setToken } from "@/lib/api/auth";
import styles from "./page.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Small artificial delay to show loading state nicely
      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await mothmerApi.auth.login({ email, password });

      if (response.data && response.data.token) {
        setToken(response.data.token);
        // Refresh the router to update layout state and redirect home
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("فشل تسجيل الدخول. يرجى التحقق من بياناتك.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.formCard}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div style={{ background: '#f97316', width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <span style={{ fontSize: 24, fontWeight: 'bold' }}>م</span>
          </div>
        </div>
        <h1 className={styles.title}>تسجيل الدخول</h1>
        <p className={styles.subtitle}>أدخل بيانات حسابك للمتابعة</p>

        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">البريد الإلكتروني</label>
            <input
              className={styles.input}
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo@mothmer.app"
              required
              dir="ltr"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">كلمة المرور</label>
            <input
              className={styles.input}
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              dir="ltr"
            />
          </div>

          <button 
            className={styles.button} 
            type="submit" 
            disabled={isLoading || !email || !password}
          >
            {isLoading ? "جاري التسجيل..." : "تسجيل الدخول"}
          </button>
        </form>
        
        <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#6b7280', textAlign: 'center' }}>
          <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>حسابات التجربة:</p>
          <div style={{ display: 'grid', gap: '0.25rem', fontFamily: 'monospace' }} dir="ltr">
            <span>demo@mothmer.app / 123456</span>
            <span>creator@mothmer.app / 123456</span>
            <span>admin@mothmer.app / 123456</span>
          </div>
        </div>
      </div>
    </main>
  );
}
