"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Game = { id: string; slug: string; title: string };

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/+$/, "");

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = useState("");
  const [results, setResults] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync initial state with ?q=
  useEffect(() => {
    const initial = searchParams.get("q") || "";
    setQ(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep URL updated when q changes
  useEffect(() => {
    const next = q ? `?q=${encodeURIComponent(q)}` : "";
    router.replace(`/search${next}`);
  }, [q, router]);

  // Fetch and filter
  useEffect(() => {
    let active = true;
    setError(null);

    const handler = setTimeout(async () => {
      if (!q.trim()) {
        if (active) setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/games`, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = (await res.json()) as Game[];
        const ql = q.toLowerCase();
        const filtered = data.filter((g) =>
          g.title.toLowerCase().includes(ql) || g.slug.toLowerCase().includes(ql)
        );
        if (active) setResults(filtered);
      } catch (e: any) {
        if (active) {
          setResults([]);
          setError(e?.message || "Failed to search");
        }
      } finally {
        if (active) setLoading(false);
      }
    }, 300);

    return () => {
      active = false;
      clearTimeout(handler);
    };
  }, [q]);

  const hasQuery = useMemo(() => q.trim().length > 0, [q]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-100 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-2xl font-semibold mb-6">Search</h1>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search games by title or slug..."
          className="w-full max-w-xl rounded-md bg-slate-950/50 border border-slate-800 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
        />

        {error && <div className="text-sm text-rose-400 mb-3">{error}</div>}

        {!hasQuery ? (
          <p className="text-slate-400">Type to search games.</p>
        ) : loading ? (
          <p className="text-slate-400">Searching…</p>
        ) : results.length === 0 ? (
          <p className="text-slate-400">No results.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {results.map((g) => (
              <li key={g.id} className="rounded-lg bg-slate-900/60 ring-1 ring-white/5 p-4">
                <Link href={`/games/${g.slug}`} className="hover:text-indigo-300">
                  <div className="font-medium">{g.title}</div>
                  <div className="text-xs text-slate-500">/{g.slug}</div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
