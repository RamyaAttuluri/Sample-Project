"use client";

import { useEffect } from "react";

/* Route error fallback. Shows a generic message only; in production Next.js already
   replaces Server Component error messages with a digest that maps to server logs. */
export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="page-container w-full py-section text-center">
      <h1 className="type-section text-ink">Something went wrong</h1>
      <p className="mt-5 type-copy text-muted">Please try again. If the problem persists, contact us.</p>
      <button type="button" onClick={() => retry()} className="mt-8 btn-primary">
        Try again
      </button>
    </main>
  );
}
