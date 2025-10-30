import Image from "next/image";
import Link from "next/link";

type Game = {
  id: string;
  title: string;
  slug: string;
  cover_image_url?: string | null;
  average_rating?: number;
  total_ratings?: number;
  created_at: string;
};

type Achievement = {
  id: string;
  name: string;
  description?: string;
  points: number;
  game_id: string;
  games?: {
    title: string;
    slug: string;
  };
};

type Award = {
  id: string;
  name: string;
  category?: string;
  year?: number;
  description?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ?? "http://localhost:3001";

async function fetchGames(): Promise<Game[]> {
  try {
    const res = await fetch(`${API_BASE}/games?limit=20`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

async function fetchAchievements(): Promise<Achievement[]> {
  try {
    const res = await fetch(`${API_BASE}/achievements?limit=20`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

async function fetchAwards(): Promise<Award[]> {
  try {
    const res = await fetch(`${API_BASE}/awards?limit=20`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function AdminPanel() {
  const [games, achievements, awards] = await Promise.all([
    fetchGames(),
    fetchAchievements(),
    fetchAwards(),
  ]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center">
              <span className="text-black font-bold">G</span>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight">Game IMDb</h1>
          </Link>
          <nav className="text-sm flex gap-6">
            <Link href="/" className="hover:text-indigo-400 transition">Home</Link>
            <Link href="/search" className="hover:text-indigo-400 transition">Search</Link>
            <Link href="/dashboard" className="hover:text-indigo-400 transition">Dashboard</Link>
            <Link href="/admin" className="text-indigo-400 font-medium">Admin</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-slate-400">Manage games, achievements, and awards</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Games Management */}
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                </svg>
                Games Management
              </h2>
              <Link 
                href="/games/new" 
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium transition"
              >
                Add Game
              </Link>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {games.map((game) => (
                <div key={game.id} className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-lg">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-600">
                    {game.cover_image_url ? (
                      <Image
                        src={game.cover_image_url}
                        alt={game.title}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-600 flex items-center justify-center">
                        <span className="text-lg">🎮</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{game.title}</h3>
                    <p className="text-sm text-slate-400">
                      {game.average_rating?.toFixed(1) || 'N/A'}/10 • {game.total_ratings || 0} ratings
                    </p>
                    <p className="text-xs text-slate-500">
                      Created: {new Date(game.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link 
                      href={`/games/${game.slug}`}
                      className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded text-xs transition"
                    >
                      View
                    </Link>
                    <button className="px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded text-xs transition">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-xs transition">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Management */}
          <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Achievements
              </h2>
              <button className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-xs font-medium transition">
                Add
              </button>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="p-3 bg-slate-700/30 rounded-lg">
                  <h3 className="font-medium text-sm truncate">{achievement.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {achievement.games?.title || 'Unknown Game'} • {achievement.points} pts
                  </p>
                  {achievement.description && (
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{achievement.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Awards Management */}
        <div className="mt-8 bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Awards Management
            </h2>
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition">
              Add Award
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {awards.map((award) => (
              <div key={award.id} className="p-4 bg-slate-700/30 rounded-lg">
                <h3 className="font-medium">{award.name}</h3>
                {award.category && (
                  <p className="text-sm text-slate-400 mt-1">Category: {award.category}</p>
                )}
                {award.year && (
                  <p className="text-sm text-slate-400">Year: {award.year}</p>
                )}
                {award.description && (
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3">{award.description}</p>
                )}
                <div className="flex gap-2 mt-3">
                  <button className="px-2 py-1 bg-slate-600 hover:bg-slate-500 rounded text-xs transition">
                    Edit
                  </button>
                  <button className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs transition">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Games</p>
                <p className="text-2xl font-bold text-white">{games.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Achievements</p>
                <p className="text-2xl font-bold text-white">{achievements.length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Awards</p>
                <p className="text-2xl font-bold text-white">{awards.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}





