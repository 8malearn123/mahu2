import type { Metadata } from "next";
import Link from "next/link";
import { Logo, SceneBand } from "@/components/ds";
import { fontVariables } from "./fonts";
import "./globals.css";
import styles from "./global-not-found.module.css";

export const metadata: Metadata = {
  title: "404 · Mahu",
};

/** Served for any URL that matches no route. The language is unknown, so it speaks both. */
export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl" className={fontVariables}>
      <body>
        <main className={styles.page}>
          <div className={styles.inner}>
            <Link href="/ar" aria-label="Mahu">
              <Logo color="cream" height={32} eager />
            </Link>
            <p className={styles.code} lang="en">
              404
            </p>
            <div className={styles.copy}>
              <h1 className={styles.title}>هذي الصفحة مو في القائمة</h1>
              <Link href="/ar" className={styles.link}>
                ارجع للرئيسية
              </Link>
            </div>
            <div className={styles.copy} lang="en" dir="ltr">
              <h2 className={styles.title}>This page isn&apos;t on the menu</h2>
              <Link href="/en" className={styles.link}>
                Back to the home page
              </Link>
            </div>
          </div>
          <SceneBand scene="beach" height={16} />
        </main>
      </body>
    </html>
  );
}
