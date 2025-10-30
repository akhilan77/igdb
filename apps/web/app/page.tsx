"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Genre = { id: string; name: string };
type Game = {
  id: string;
  slug: string;
  title: string;
  coverImageUrl?: string | null;
  releaseDate?: string | null;
  genres?: Genre[] | null;
};

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  // Dynamically load API base from env or default localhost:3001
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch(`${baseUrl}/games`, {
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        });
        if (!res.ok) {
          // try to read response body for extra debugging info
          let text = "";
          try {
            text = await res.text();
          } catch (e) {
            text = `<unable to read response body: ${String(e)}>`;
          }
          console.error(`Fetch /games failed: status=${res.status} ${res.statusText} body=${text}`);
          throw new Error(`Fetch /games failed: ${res.status}`);
        }
        const data = (await res.json()) as Game[];
        setGames(data);
      } catch (err) {
        console.error("❌ Error fetching games:", err);
        setGames([]);
      } finally {
        setLoading(false);
      }
    }
    fetchGames();
  }, [baseUrl]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center">
              <span className="text-black font-bold">G</span>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight">Game IMDb</h1>
          </Link>
          <nav className="text-sm flex gap-6">
            <Link href="/" className="hover:text-indigo-400 transition">
              Home
            </Link>
            <Link href="/search" className="hover:text-indigo-400 transition">
              Search
            </Link>
            <Link href="/games/new" className="hover:text-indigo-400 transition">
              Create Game
            </Link>
          </nav>
        </div>
      </header>

      {/* Games Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6">All Games</h2>

        {loading ? (
          <div className="text-center text-slate-400">Loading games...</div>
        ) : games.length === 0 ? (
          <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8 text-center">
            <h3 className="text-lg font-medium">No games yet</h3>
            <p className="text-slate-400 mt-2">Add games via the API or Create Game page.</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map((g) => {
              const cover =
                g.coverImageUrl && /^https?:\/\//.test(g.coverImageUrl)
                  ? g.coverImageUrl
                  : g.coverImageUrl
                  ? `/${g.coverImageUrl.replace(/^\/+/, "")}`
                  : "/Logo Design for Game IGDB.png";
              return (
                <li
                  key={g.id}
                  className="group rounded-xl overflow-hidden bg-slate-900/60 ring-1 ring-white/5 hover:ring-indigo-500/50 transition transform hover:scale-[1.02]"
                >
                  <Link href={`/games/${g.slug}`} className="flex flex-col h-full">
                    <div className="relative h-48 bg-slate-800">
                      <Image
                        src={cover}
                        alt={g.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      {g.genres && g.genres.length > 0 && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs bg-black/60 backdrop-blur text-amber-300 ring-1 ring-white/10">
                          {g.genres[0].name}
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-base font-semibold truncate">{g.title}</h3>
                      <p className="mt-2 text-xs text-slate-400 flex-1">
                        {g.releaseDate ?? "Release date unknown"}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-12 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Game IMDb. All rights reserved.
      </footer>
    </main>
  );
}
