# 🎮 Game IMDb (Working Title)

<img width="800" height="469" alt="image" src="https://github.com/user-attachments/assets/dd00035e-cf21-46fb-8f81-ff9067b3bd99" />

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange.svg)]()

> A searchable, browsable, community-driven catalog of video games with pages for games, people (developers, voice actors), companies, user ratings & reviews, screenshots/trailers, and lists — similar to IMDb but for games.

---

## 🚀 Overview
Game IMDb is an **open-source database for video games**, designed to help gamers, developers, and researchers discover and explore the world of gaming.  
Users can search for games, browse by genre/platform, leave ratings & reviews, and maintain personal watchlists.  

Think of it as **IMDb, but for games**.

---

## ✨ Features
- 🔎 **Search & Browse**: Search by title, genre, platform, or release year.  
- 🎮 **Game Pages**: Detailed information about each game (description, release date, cover, screenshots, trailer, platforms, developers, publishers).  
- ⭐ **Ratings & Reviews**: Community-driven ratings (1–10) and user reviews.  
- 👤 **People & Companies**: Explore developers, designers, publishers, and voice actors.  
- 📑 **User Accounts**: Create a profile, add to favorites/watchlist.  
- 🛠️ **Admin Dashboard**: Add/edit games, manage users and reviews.  

---

## 🏗️ Tech Stack
**Frontend:**  
- [Next.js](https://nextjs.org/) (React framework, SEO-friendly)  
- [Tailwind CSS](https://tailwindcss.com/) (utility-first CSS)  

**Backend:**  
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) (REST API)

**Database & Storage:**  
- [PostgreSQL](https://www.postgresql.org/) (relational database)  

### Prerequisites
- Node.js >= 18
- PostgreSQL >= 14
- Git

```
# Create the igdb database before running BE
psql -h 127.0.0.1 -p 5432 -U postgres -W -c "CREATE DATABASE igdb;"
```

```bash
# Run backend
cd apps\api
npm run start:dev

# Run frontend
cd apps\web
npm run dev
```