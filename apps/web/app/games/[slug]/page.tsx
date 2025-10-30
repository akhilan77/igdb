// app/games/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Genre = { id: string; name: string };
type Game = {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  releaseDate?: string | null;
  coverImageUrl?: string | null;
  genres?: Genre[] | null;
  aggregatedRating?: number | null;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ?? "http://localhost:3001";

function isGame(obj: unknown): obj is Game {
  if (!obj || typeof obj !== "object") return false;
  const g = obj as Record<string, unknown>;
  return (
    typeof g.id === "string" &&
    typeof g.slug === "string" &&
    typeof g.title === "string" &&
    (g.description === undefined || g.description === null || typeof g.description === "string") &&
    (g.releaseDate === undefined || g.releaseDate === null || typeof g.releaseDate === "string") &&
    (g.coverImageUrl === undefined || g.coverImageUrl === null || typeof g.coverImageUrl === "string")
  );
}

function formatDate(dateString?: string | null) {
  if (!dateString) return null;
  const ts = Date.parse(dateString);
  if (Number.isNaN(ts)) return null;
  return new Intl.DateTimeFormat(undefined, { year: "numeric", month: "long", day: "numeric" }).format(
    ts
  );
}

async function fetchGame(slug: string): Promise<Game | null> {
  const url = `${API_BASE}/games/${encodeURIComponent(slug)}`;
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    if (!isGame(data)) return null;
    return data;
  } catch (err) {
    console.error("fetchGame error", err);
    return null;
  }
}

export default async function GameDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = await fetchGame(slug);
  if (!game) notFound();

  const friendlyDate = formatDate(game.releaseDate);
  const coverSrc = game.coverImageUrl ?? "/images/Logo Design for Game IGDB.png";
  const rating = typeof game.aggregatedRating === "number" ? Math.round(game.aggregatedRating) : null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-100 py-12">
      <div className="container mx-auto px-6">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0L3.586 10l4.707-4.707a1 1 0 011.414 1.414L6.414 10l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to home
          </Link>
        </div>

        <header className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="relative md:col-span-1">
            <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/5 bg-gradient-to-br from-slate-800/60 to-black/40">
              <Image
                src={coverSrc}
                
                alt={`${game.title} cover`}
                width={600}
                height={840}
                className="w-full h-full object-cover transform hover:scale-105 transition duration-400 ease-out"
                priority
              />
              {rating !== null && (
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold ring-1 ring-white/10">
                  <span className="text-amber-400">★</span> {rating}%
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/60 ring-1 ring-white/5 text-sm hover:bg-slate-700/50"
              >
                Play Trailer
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-sm font-medium shadow hover:brightness-110"
              >
                Add to Collection
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">{game.title}</h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              {friendlyDate && <span className="text-sm text-slate-400">Released {friendlyDate}</span>}
              <span className="h-1 w-1 bg-slate-600 rounded-full" />
              <span className="text-sm text-slate-400">{game.slug}</span>
            </div>

            <div className="mt-6 prose prose-invert max-w-none text-slate-200 leading-relaxed">
              {game.description ? (
                <p className="whitespace-pre-line">{game.description}</p>
              ) : (
                <p className="text-slate-400">No description available for this game.</p>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {Array.isArray(game.genres) && game.genres.length > 0 ? (
                game.genres.map((g) => (
                  <span
                    key={g.id}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-slate-800/40 ring-1 ring-white/5 text-slate-200"
                  >
                    {g.name}
                  </span>
                ))
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-slate-800/40 text-slate-400">Uncategorized</span>
              )}

              <div className="ml-auto flex items-center gap-2">
                <button aria-label="Share" className="p-2 rounded-md bg-slate-800/40 ring-1 ring-white/5 hover:bg-slate-700/40">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M15 8a3 3 0 10-2.83-4H7a3 3 0 100 6h5.17A3 3 0 0015 8zM4 12a4 4 0 014-4h4a4 4 0 110 8H8a4 4 0 01-4-4z" />
                  </svg>
                </button>

                <button className="px-3 py-1 rounded-md bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-semibold">
                  Buy / Wishlist
                </button>
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="bg-gradient-to-bl from-white/2 to-black/0 ring-1 ring-white/4 p-4 rounded-lg">
                <dt className="font-semibold text-slate-200">Slug</dt>
                <dd className="mt-1 break-words text-slate-300">{game.slug}</dd>
              </div>

              <div className="bg-gradient-to-bl from-white/2 to-black/0 ring-1 ring-white/4 p-4 rounded-lg">
                <dt className="font-semibold text-slate-200">ID</dt>
                <dd className="mt-1 break-words text-slate-300">{game.id}</dd>
              </div>
            </dl>
          </div>
        </header>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">You might also like</h2>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden bg-slate-800/40 ring-1 ring-white/3 p-3 flex flex-col items-center">
                <div className="w-full h-24 bg-gradient-to-br from-slate-700 to-slate-900 rounded-md mb-3" />
                <div className="text-sm text-slate-300 text-center">Game {i + 1}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
