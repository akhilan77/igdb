"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Genre = { id: string; name: string };

type CreateGameInput = {
  slug: string;
  title: string;
  description?: string;
  releaseDate?: string; // yyyy-mm-dd
  coverImageUrl?: string;
  genres?: string[]; // names
};

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/+$/, "");

function validate(input: CreateGameInput) {
  const errors: Partial<Record<keyof CreateGameInput | "form", string>> = {};

  if (!input.slug || typeof input.slug !== "string" || !/^[a-z0-9-]+$/.test(input.slug) || input.slug.length > 255) {
    errors.slug = "Slug is required, max 255, lowercase letters/numbers/dashes only";
  }
  if (!input.title || typeof input.title !== "string" || input.title.trim().length === 0 || input.title.length > 255) {
    errors.title = "Title is required and must be <= 255 characters";
  }
  if (input.description !== undefined) {
    if (typeof input.description !== "string" || input.description.length > 2000) {
      errors.description = "Description must be <= 2000 characters";
    }
  }
  if (input.releaseDate) {
    // Expect ISO date (yyyy-mm-dd)
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!isoDateRegex.test(input.releaseDate)) {
      errors.releaseDate = "Release date must be in YYYY-MM-DD format";
    } else {
      const ts = Date.parse(input.releaseDate);
      if (Number.isNaN(ts)) {
        errors.releaseDate = "Release date is invalid";
      }
    }
  }
  if (input.coverImageUrl) {
    try {
      // URL constructor will throw if invalid
      // Allow relative path? Backend expects URL; keep strict client-side to match @IsUrl
      new URL(input.coverImageUrl);
    } catch {
      errors.coverImageUrl = "Cover image must be a valid URL";
    }
  }
  if (input.genres) {
    const invalid = input.genres.some((g) => typeof g !== "string" || g.trim() === "");
    if (invalid) errors.genres = "Genres must be a list of names";
  }

  return errors;
}

export default function NewGamePage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loadingGenres, setLoadingGenres] = useState(false);
  const [values, setValues] = useState<CreateGameInput>({ slug: "", title: "", description: "", releaseDate: "", coverImageUrl: "", genres: [] });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  const errors = useMemo(() => validate(values), [values]);

  useEffect(() => {
    let active = true;
    setLoadingGenres(true);
    fetch(`${API_BASE}/genres`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Genre[]) => {
        if (!active) return;
        setGenres(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!active) return;
        setGenres([]);
      })
      .finally(() => active && setLoadingGenres(false));
    return () => {
      active = false;
    };
  }, []);

  function setField<K extends keyof CreateGameInput>(key: K, value: CreateGameInput[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    setServerSuccess(null);

    // mark all touched to show errors
    setTouched({ slug: true, title: true, description: true, releaseDate: true, coverImageUrl: true, genres: true });

    const currentErrors = validate(values);
    if (Object.keys(currentErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      const payload: CreateGameInput = {
        slug: values.slug.trim(),
        title: values.title.trim(),
        description: values.description?.trim() ? values.description.trim() : undefined,
        releaseDate: values.releaseDate?.trim() ? values.releaseDate.trim() : undefined,
        coverImageUrl: values.coverImageUrl?.trim() ? values.coverImageUrl.trim() : undefined,
        genres: values.genres && values.genres.length ? values.genres : undefined,
      };

      const res = await fetch(`${API_BASE}/games`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        // Attempt to parse validation error message
        let message = text || `Request failed (${res.status})`;
        try {
          const j = JSON.parse(text);
          message = (j && (j.message || j.error)) ?? message;
        } catch {}
        if (res.status === 409 || /duplicate/i.test(message) || /slug/i.test(message)) {
          setServerError("Slug already exists. Choose a different slug.");
        } else {
          setServerError(typeof message === "string" ? message : "Failed to create game");
        }
        return;
      }

      setServerSuccess("Game created successfully.");
      // Optionally reset
      setValues({ slug: "", title: "", description: "", releaseDate: "", coverImageUrl: "", genres: [] });
      setTouched({});
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const canSubmit = Object.keys(errors).length === 0 && !submitting;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-100 py-12">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="text-sm text-slate-300 hover:text-white">← Back</Link>
          <h1 className="text-2xl font-semibold">Create Game</h1>
        </div>

        {serverError && (
          <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-300">
            {serverError}
          </div>
        )}
        {serverSuccess && (
          <div className="mb-4 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-300">
            {serverSuccess}
          </div>
        )}

        <form onSubmit={onSubmit} noValidate className="rounded-xl bg-slate-900/60 ring-1 ring-white/5 p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Slug *</label>
            <input
              value={values.slug}
              onChange={(e) => setField("slug", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, slug: true }))}
              placeholder="e.g., the-witcher-3"
              className="w-full rounded-md bg-slate-950/50 border border-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              maxLength={255}
              pattern="[a-z0-9-]+"
            />
            {touched.slug && errors.slug && <p className="mt-1 text-sm text-red-400">{errors.slug}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              value={values.title}
              onChange={(e) => setField("title", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, title: true }))}
              placeholder="e.g., The Witcher 3: Wild Hunt"
              className="w-full rounded-md bg-slate-950/50 border border-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              maxLength={255}
            />
            {touched.title && errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={values.description || ""}
              onChange={(e) => setField("description", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, description: true }))}
              placeholder="Brief description (max 2000 chars)"
              className="w-full rounded-md bg-slate-950/50 border border-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[120px]"
              maxLength={2000}
            />
            {touched.description && errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Release Date</label>
              <input
                type="date"
                value={values.releaseDate || ""}
                onChange={(e) => setField("releaseDate", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, releaseDate: true }))}
                className="w-full rounded-md bg-slate-950/50 border border-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {touched.releaseDate && errors.releaseDate && <p className="mt-1 text-sm text-red-400">{errors.releaseDate}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cover Image URL</label>
              <input
                type="url"
                value={values.coverImageUrl || ""}
                onChange={(e) => setField("coverImageUrl", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, coverImageUrl: true }))}
                placeholder="https://example.com/cover.jpg"
                className="w-full rounded-md bg-slate-950/50 border border-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {touched.coverImageUrl && errors.coverImageUrl && <p className="mt-1 text-sm text-red-400">{errors.coverImageUrl}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Genre</label>
            {loadingGenres ? (
              <div className="rounded-md bg-slate-950/50 border border-slate-800 px-3 py-2 text-sm text-slate-400">Loading genres…</div>
            ) : (
              <select
                value={values.genres?.[0] || ""}
                onChange={(e) => setField("genres", e.target.value ? [e.target.value] : [])}
                onBlur={() => setTouched((t) => ({ ...t, genres: true }))}
                className="w-full rounded-md bg-slate-950/50 border border-slate-800 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select a genre</option>
                {genres.map((g) => (
                  <option key={g.id} value={g.name}>
                    {g.name}
                  </option>
                ))}
              </select>
            )}
            {touched.genres && errors.genres && <p className="mt-1 text-sm text-red-400">{errors.genres}</p>}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 disabled:from-slate-700 disabled:to-slate-700 text-white font-medium shadow"
            >
              {submitting ? "Creating…" : "Create Game"}
            </button>
            <span className="text-xs text-slate-500">Fields marked * are required</span>
          </div>
        </form>
      </div>
    </main>
  );
}
