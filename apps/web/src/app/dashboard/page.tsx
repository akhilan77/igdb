import Image from "next/image";
import Link from "next/link";

type Game = {
  id: string;
  title: string;
  slug: string;
  cover_image_url?: string | null;
  average_rating?: number;
  total_ratings?: number;
  review_count?: number;
  favorite_count?: number;
};

type User = {
  id: string;
  username: string;
  display_name?: string;
  avatar_url?: string;
  review_count?: number;
  rating_count?: number;
  friend_count?: number;
  favorite_count?: number;
};

type GenreStat = {
  genre_name: string;
  game_count: number;
  avg_rating: number;
};

type DashboardStats = {
  total_games: number;
  total_users: number;
  total_reviews: number;
  avg_rating: number;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ?? "http://localhost:3001";

async function fetchDashboardStats(): Promise<DashboardStats> {
  try {
    const res = await fetch(`${API_BASE}/analytics/dashboard`, { cache: "no-store" });
    if (!res.ok) return { total_games: 0, total_users: 0, total_reviews: 0, avg_rating: 0 };
    return await res.json();
  } catch {
    return { total_games: 0, total_users: 0, total_reviews: 0, avg_rating: 0 };
  }
}

async function fetchTopGames(): Promise<Game[]> {
  try {
    const res = await fetch(`${API_BASE}/analytics/popular-games?limit=10`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

async function fetchActiveUsers(): Promise<User[]> {
  try {
    const res = await fetch(`${API_BASE}/analytics/active-users?limit=10`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

async function fetchGenreStats(): Promise<GenreStat[]> {
  try {
    const res = await fetch(`${API_BASE}/analytics/genre-stats`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function Dashboard() {
  const [stats, topGames, activeUsers, genreStats] = await Promise.all([
    fetchDashboardStats(),
    fetchTopGames(),
    fetchActiveUsers(),
    fetchGenreStats(),
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
            <Link href="/dashboard" className="text-indigo-400 font-medium">Dashboard</Link>
            <Link href="/admin" className="hover:text-indigo-400 transition">Admin</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-slate-400">Comprehensive insights into the Game IMDb database</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Games</p>
                <p className="text-2xl font-bold text-white">{stats.total_games.toLocaleString()}</p>
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
                <p className="text-slate-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">{stats.total_users.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Reviews</p>
                <p className="text-2xl font-bold text-white">{stats.total_reviews.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Average Rating</p>
                <p className="text-2xl font-bold text-white">{stats.avg_rating.toFixed(1)}/10</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Rated Games */}
          <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-xl p-6 border border-slate-700/50">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Top Rated Games
            </h2>
            <div className="space-y-3">
              {topGames.slice(0, 5).map((game, index) => (
                <Link key={game.id} href={`/games/${game.slug}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/30 transition">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-700">
                    {game.cover_image_url ? (
                      <Image
                        src={game.cover_image_url}
                        alt={game.title}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-600 flex items-center justify-center">
                        <span className="text-xs">🎮</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{game.title}</h3>
                    <p className="text-sm text-slate-400">
                      {game.average_rating?.toFixed(1)}/10 • {game.total_ratings} ratings
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Most Active Users */}
          <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-xl p-6 border border-slate-700/50">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Most Active Users
            </h2>
            <div className="space-y-3">
              {activeUsers.slice(0, 5).map((user, index) => (
                <div key={user.id} className="flex items-center gap-3 p-3 rounded-lg">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-700">
                    {user.avatar_url ? (
                      <Image
                        src={user.avatar_url}
                        alt={user.display_name || user.username}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-600 flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {(user.display_name || user.username).charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{user.display_name || user.username}</h3>
                    <p className="text-sm text-slate-400">
                      {user.review_count || 0} reviews • {user.friend_count || 0} friends
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Genre Statistics */}
        <div className="mt-8 bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-xl p-6 border border-slate-700/50">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Genre Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {genreStats.map((genre, index) => (
              <div key={index} className="bg-slate-700/30 rounded-lg p-4">
                <h3 className="font-medium text-white">{genre.genre_name}</h3>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Games:</span>
                    <span className="text-white">{genre.game_count}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Avg Rating:</span>
                    <span className="text-white">{genre.avg_rating.toFixed(1)}/10</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}





