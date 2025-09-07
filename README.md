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
  *(alternative: [FastAPI](https://fastapi.tiangolo.com/) if Python preferred)*  

**Database & Storage:**  
- [PostgreSQL](https://www.postgresql.org/) (relational database)  
- [Redis](https://redis.io/) (caching, sessions)  
- [AWS S3](https://aws.amazon.com/s3/) (images & media storage)  

**Other:**  
- JWT Authentication (Auth + OAuth support)  
- Full-text search with PostgreSQL `pg_trgm` (ElasticSearch in future)  

---

## 📂 Project Structure
```

/frontend       # Next.js + Tailwind frontend
/backend        # Express/NestJS or FastAPI backend
/database       # Migrations, seed data
/docs           # API and architecture docs

````

---

## ⚙️ Getting Started

### Prerequisites
- Node.js >= 18
- PostgreSQL >= 14
- Redis (optional for local dev)
- Git

### Installation
```bash
# Clone repository
git clone https://github.com/your-username/game-imdb.git
cd game-imdb

# Install dependencies (frontend + backend separately)
cd frontend && npm install
cd ../backend && npm install
````

### Setup Environment

Create a `.env` file in `/backend`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/gameimdb
JWT_SECRET=your_secret_key
REDIS_URL=redis://localhost:6379
S3_BUCKET=your-bucket-name
S3_ACCESS_KEY=your-access-key
S3_SECRET_KEY=your-secret-key
```

### Run Development

```bash
# Run backend
cd backend
npm run dev

# Run frontend
cd ../frontend
npm run dev
```

---

## 🧪 API Endpoints (Sample)

* `GET /api/games?query=halo` → search games
* `GET /api/games/:id` → game detail
* `POST /api/games/:id/reviews` → add review
* `POST /api/auth/register` → create account
* `POST /api/auth/login` → login & get token

---

## 🗺️ Roadmap

* [x] Core database schema
* [x] Backend API for games, reviews, users
* [x] Frontend: homepage, search, game detail
* [ ] User authentication (OAuth)
* [ ] Ratings & reviews with moderation
* [ ] Admin dashboard
* [ ] Recommendations engine (future)
* [ ] Mobile app (future)

---

## 🤝 Contributing

Contributions are welcome! 🎉

1. Fork this repo
2. Create a new branch (`feature/your-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🌟 Acknowledgements

* Inspired by [IMDb](https://www.imdb.com/)
* Data sources may include [IGDB](https://www.igdb.com/) or [RAWG API](https://rawg.io/apidocs)

