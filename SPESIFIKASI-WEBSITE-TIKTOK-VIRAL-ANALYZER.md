# SPESIFIKASI WEBSITE: TikTok Viral Content Analyzer

> Dokumen ini ditulis untuk dibaca langsung oleh AI coding assistant (Cursor, Claude Code, Windsurf, dll) sebagai panduan pembangunan project secara end-to-end.

---

## 1. RINGKASAN PROJECT

**Nama Project:** ViralPulse (boleh diganti)

**Deskripsi:**
Website dashboard yang menganalisa data TikTok (hashtag, sound, kategori konten, akun) untuk memprediksi potensi viral/booming sebuah konten, menampilkan skor "Hype Potential", tren yang sedang naik, dan rekomendasi waktu/format posting. Data diambil dari sumber nyata (bukan dummy), dengan strategi fallback antar sumber data agar tetap berjalan walau ada limit.

**Target user:** Content creator, social media manager, agency.

---

## 2. STRATEGI SUMBER DATA (PENTING — DIBACA DULU)

TikTok **tidak memiliki API publik gratis untuk data realtime massal**. Maka digunakan strategi multi-source dengan fallback:

| Prioritas | Sumber | Jenis | Biaya | Catatan |
|---|---|---|---|---|
| 1 | **TikTok-Api (unofficial, Python, Playwright-based)** | Scraping data publik (video, hashtag, sound, user) | Gratis | Self-hosted, jalan di server sendiri via microservice Python |
| 2 | **RapidAPI TikTok Scraper (free tier)** | REST API pihak ketiga | Gratis dengan limit bulanan | Fallback kalau scraper kena block |
| 3 | **TikTok Research API (resmi)** | Resmi, perlu approval akademik/riset | Gratis tapi approval ketat | Opsional jangka panjang, tidak wajib di MVP |

**Aturan wajib:**
- DILARANG membuat data dummy/fake/random untuk ditampilkan sebagai hasil analisa. Semua angka di UI HARUS berasal dari hasil fetch nyata yang disimpan di database.
- Kalau API/scraper gagal fetch, tampilkan state "Data tidak tersedia saat ini" — JANGAN diisi angka acak.
- Implementasikan **caching** (Redis) untuk semua hasil fetch, supaya tidak boros quota dan tidak membebani TikTok dengan request berlebihan.
- Implementasikan **rate limiting & delay random** antara request scraping untuk mengurangi risiko block.
- Gunakan **job queue** (BullMQ) untuk scheduling fetch berkala (misal setiap 30-60 menit per kategori), bukan fetch on-demand setiap user buka halaman.

---

## 3. FITUR UTAMA (FULL DASHBOARD)

### 3.1 Hype Score Predictor
- Input: link video TikTok atau upload draft (caption, hashtag, sound yang akan dipakai).
- Output: skor 0-100 "Potensi Viral" dihitung dari kombinasi:
  - Velocity pertumbuhan view/like pada hashtag & sound yang dipakai (data historis nyata).
  - Posisi hashtag/sound di trending list saat ini.
  - Rata-rata engagement rate kategori konten yang sama.
- Menampilkan breakdown skor (kontribusi tiap faktor) — bukan angka tunggal tanpa penjelasan.

### 3.2 Trend Radar (Hashtag, Sound, Kategori)
- List hashtag/sound yang sedang naik (growth rate tertinggi dalam 24-72 jam terakhir), berbasis data historis tersimpan di DB (snapshot berkala).
- Filter per kategori konten (Comedy, Dance, Education, Beauty, Food, Gaming, dll).
- Grafik tren naik/turun per item (line chart dari snapshot history).

### 3.3 Competitor Analysis
- Input: username TikTok.
- Output: statistik akun (follower growth, avg views, posting frequency, jam posting paling sering, top performing content akun tersebut) — semua dari data publik akun.
- Bandingkan 2-3 akun sekaligus (side-by-side).

### 3.4 Best Time to Post
- Berdasarkan data historis kapan konten kategori tertentu mendapat engagement tertinggi.
- Ditampilkan per kategori & per timezone user.

### 3.5 Dashboard Utama
- Ringkasan: trending hashtag hari ini, sound naik daun, kategori paling hype minggu ini.
- Watchlist personal (user bisa pin hashtag/sound/akun untuk dipantau).

### 3.6 Notifikasi (opsional fase lanjut)
- Alert email/push kalau item di watchlist user tiba-tiba melonjak.

---

## 4. ROLE PENGGUNA

| Role | Akses |
|---|---|
| Guest | Lihat trend radar publik (terbatas), tidak bisa simpan watchlist |
| Registered User (Free) | Watchlist terbatas (max 5), hype score predictor terbatas (5x/hari) |
| Pro (Subscription) | Watchlist unlimited, hype score unlimited, competitor analysis, export data |
| Admin | Kelola sumber data, monitoring job scraping, kelola user/subscription |

---

## 5. DESIGN SYSTEM

### 5.1 Warna
```css
--color-charcoal: #1E1F22;      /* Background utama */
--color-charcoal-light: #2A2B30; /* Background card/surface */
--color-neon-purple: #7F56FF;    /* Aksen utama, tombol primary, highlight skor tinggi */
--color-lime-green: #80FF56;     /* Aksen sukses, growth positif, CTA sekunder */
--color-text-primary: #F5F5F7;
--color-text-secondary: #A0A0AB;
--color-danger: #FF5C5C;         /* Growth negatif / error */
--color-border: #34353B;
```

### 5.2 Tipografi
- Heading: **Space Grotesk** atau **Sora** (kesan tech/modern)
- Body: **Inter**
- Monospace (untuk angka statistik besar): **JetBrains Mono**

### 5.3 Prinsip UI
- Dark mode only (charcoal based), kontras tinggi.
- Neon Purple untuk elemen interaktif & skor/highlight utama.
- Lime Green khusus untuk indikator "naik/positif/growth" — konsisten, jangan dipakai sembarangan supaya psikologi warnanya tetap kuat (hijau = naik).
- Card dengan border tipis (`--color-border`) + sedikit glow purple pada hover (box-shadow rgba ungu, opacity rendah).
- Gunakan grafik area/line chart dengan gradient dari neon purple ke transparent.
- Komponen skor (Hype Score) ditampilkan sebagai radial/circular progress dengan warna gradasi: 0-40 abu-abu, 40-70 purple, 70-100 lime green.

---

## 6. TECH STACK

### Frontend
- **Next.js 14+ (App Router)**
- **TailwindCSS** + **shadcn/ui** (kustomisasi warna sesuai design system di atas)
- **Recharts** atau **Tremor** untuk chart/grafik dashboard
- **TanStack Query** untuk data fetching & caching di client
- **Zustand** untuk state management ringan (watchlist, filter state)

### Backend
- **Next.js API Routes** untuk endpoint utama (CRUD, auth, billing)
- **Python Microservice (FastAPI)** khusus untuk scraping TikTok (TikTok-Api + Playwright) — dipisah dari Next.js karena scraping butuh environment Python & browser headless
- **BullMQ + Redis** untuk job queue scheduling fetch data berkala
- **PostgreSQL** sebagai database utama (data historis, snapshot, user, watchlist)
- **Redis** untuk caching hasil fetch & rate limiting

### Infrastruktur
- **Docker** untuk containerize semua service (web, api, scraper-service, redis, postgres)
- Deploy: VPS (DigitalOcean/Contabo) karena scraper service butuh resource & tidak cocok di serverless biasa
- **Nginx** sebagai reverse proxy

### Autentikasi & Billing
- **NextAuth.js** (email + Google OAuth)
- **Midtrans** atau **Stripe** untuk subscription Pro (sesuaikan target market — Midtrans kalau fokus Indonesia)

---

## 7. ARSITEKTUR SISTEM (RINGKASAN ALUR DATA)

```
[Scheduler: BullMQ Cron] 
       │
       ▼
[Python Scraper Service (FastAPI + TikTok-Api/Playwright)]
       │  (fallback ke RapidAPI kalau gagal)
       ▼
[Redis Cache] ──► [PostgreSQL: simpan snapshot historis]
       │
       ▼
[Next.js API Routes] ──► [Frontend Dashboard]
```

1. Scheduler trigger job fetch tiap kategori/hashtag/sound secara berkala (interval acak 30-60 menit untuk hindari pola terdeteksi).
2. Scraper service ambil data, simpan mentah ke cache + snapshot ke DB.
3. Backend hitung metrik turunan (growth rate, hype score) dari snapshot historis — bukan realtime per-request, supaya konsisten dan murah secara resource.
4. Frontend ambil data hasil hitung dari Next.js API (sudah di-cache), tidak pernah langsung ke scraper.

---

## 8. SKEMA DATABASE (PostgreSQL)

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  role VARCHAR(20) DEFAULT 'free', -- free | pro | admin
  subscription_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now()
);

-- Categories
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL
);

-- Hashtags
CREATE TABLE hashtags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tag VARCHAR(255) UNIQUE NOT NULL,
  category_id INT REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT now()
);

-- Hashtag historical snapshots (data nyata, time-series)
CREATE TABLE hashtag_snapshots (
  id BIGSERIAL PRIMARY KEY,
  hashtag_id UUID REFERENCES hashtags(id),
  view_count BIGINT NOT NULL,
  video_count BIGINT,
  fetched_at TIMESTAMP DEFAULT now()
);

-- Sounds
CREATE TABLE sounds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tiktok_sound_id VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255),
  author VARCHAR(255),
  category_id INT REFERENCES categories(id)
);

CREATE TABLE sound_snapshots (
  id BIGSERIAL PRIMARY KEY,
  sound_id UUID REFERENCES sounds(id),
  usage_count BIGINT NOT NULL,
  fetched_at TIMESTAMP DEFAULT now()
);

-- Tracked accounts (untuk competitor analysis)
CREATE TABLE tracked_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(255) UNIQUE NOT NULL,
  added_by_user_id UUID REFERENCES users(id)
);

CREATE TABLE account_snapshots (
  id BIGSERIAL PRIMARY KEY,
  account_id UUID REFERENCES tracked_accounts(id),
  follower_count BIGINT,
  avg_views BIGINT,
  posting_frequency_per_week FLOAT,
  fetched_at TIMESTAMP DEFAULT now()
);

-- Watchlist
CREATE TABLE watchlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  item_type VARCHAR(20) NOT NULL, -- hashtag | sound | account
  item_id UUID NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Hype score requests (log + hasil, untuk audit & rate limit)
CREATE TABLE hype_score_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  video_url VARCHAR(500),
  score FLOAT,
  breakdown JSONB, -- {velocity: x, trending_position: y, category_avg: z}
  created_at TIMESTAMP DEFAULT now()
);
```

---

## 9. STRUKTUR FOLDER & FILE LENGKAP

```
viralpulse/
├── apps/
│   ├── web/                          # Next.js frontend + API routes
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/page.tsx
│   │   │   │   └── register/page.tsx
│   │   │   ├── (dashboard)/
│   │   │   │   ├── dashboard/page.tsx          # Ringkasan utama
│   │   │   │   ├── trend-radar/page.tsx        # Fitur 3.2
│   │   │   │   ├── hype-score/page.tsx         # Fitur 3.1
│   │   │   │   ├── competitor/page.tsx         # Fitur 3.3
│   │   │   │   ├── best-time/page.tsx          # Fitur 3.4
│   │   │   │   ├── watchlist/page.tsx
│   │   │   │   └── layout.tsx                  # Sidebar + topbar dashboard
│   │   │   ├── (marketing)/
│   │   │   │   ├── page.tsx                    # Landing page
│   │   │   │   └── pricing/page.tsx
│   │   │   ├── api/
│   │   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   │   ├── hashtags/
│   │   │   │   │   ├── trending/route.ts       # GET trending hashtag
│   │   │   │   │   └── [id]/history/route.ts   # GET snapshot history
│   │   │   │   ├── sounds/
│   │   │   │   │   ├── trending/route.ts
│   │   │   │   │   └── [id]/history/route.ts
│   │   │   │   ├── accounts/
│   │   │   │   │   ├── [username]/route.ts
│   │   │   │   │   └── compare/route.ts
│   │   │   │   ├── hype-score/route.ts         # POST hitung skor
│   │   │   │   ├── watchlist/route.ts
│   │   │   │   └── webhooks/
│   │   │   │       └── midtrans/route.ts
│   │   │   ├── layout.tsx
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── ui/                             # shadcn/ui components (button, card, dll)
│   │   │   ├── charts/
│   │   │   │   ├── TrendLineChart.tsx
│   │   │   │   └── HypeScoreRadial.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── TrendingHashtagCard.tsx
│   │   │   │   ├── TrendingSoundCard.tsx
│   │   │   │   ├── CategoryFilterTabs.tsx
│   │   │   │   ├── CompetitorCompareTable.tsx
│   │   │   │   └── WatchlistButton.tsx
│   │   │   └── layout/
│   │   │       ├── Sidebar.tsx
│   │   │       └── Topbar.tsx
│   │   ├── lib/
│   │   │   ├── db.ts                           # Prisma/Drizzle client
│   │   │   ├── redis.ts
│   │   │   ├── auth.ts
│   │   │   ├── hypeScoreCalculator.ts           # Logika hitung skor dari data historis
│   │   │   └── scraperClient.ts                 # Client untuk call Python scraper service
│   │   ├── prisma/
│   │   │   └── schema.prisma                    # Sesuai skema di Bagian 8
│   │   ├── styles/
│   │   │   └── theme.css                        # Variabel warna design system
│   │   ├── public/
│   │   ├── tailwind.config.ts
│   │   ├── next.config.js
│   │   ├── package.json
│   │   └── .env.example
│   │
│   └── scraper-service/                # Python FastAPI microservice
│       ├── main.py                     # Entry point FastAPI
│       ├── routers/
│       │   ├── hashtags.py             # Endpoint scrape hashtag
│       │   ├── sounds.py               # Endpoint scrape sound
│       │   └── accounts.py             # Endpoint scrape akun
│       ├── services/
│       │   ├── tiktok_api_client.py    # Wrapper TikTok-Api (Playwright)
│       │   ├── rapidapi_fallback.py    # Fallback ke RapidAPI
│       │   └── rate_limiter.py         # Delay & throttle logic
│       ├── jobs/
│       │   └── scheduler.py            # Cron job trigger fetch berkala
│       ├── models/
│       │   └── schemas.py              # Pydantic models response
│       ├── requirements.txt
│       └── Dockerfile
│
├── packages/
│   └── shared-types/                   # TypeScript types yang dipakai web (kontrak API)
│       └── index.ts
│
├── infra/
│   ├── docker-compose.yml              # Orkestrasi web, scraper-service, postgres, redis
│   ├── nginx/
│   │   └── default.conf
│   └── postgres/
│       └── init.sql
│
├── .gitignore
├── README.md
└── docker-compose.yml
```

---

## 10. CONTOH IMPLEMENTASI KUNCI

### 10.1 Logika Hype Score (Server-side, hanya dari data nyata)

```typescript
// apps/web/lib/hypeScoreCalculator.ts

interface HypeScoreInput {
  hashtagGrowthRate: number;    // % growth 24-72 jam terakhir, dari snapshot DB
  soundGrowthRate: number;
  categoryAvgEngagementRate: number; // rata-rata kategori, dari data historis
  trendingPosition: number | null;   // posisi di trending list saat ini, null jika tidak masuk
}

export function calculateHypeScore(input: HypeScoreInput): {
  score: number;
  breakdown: Record<string, number>;
} {
  const velocityScore = Math.min(input.hashtagGrowthRate * 0.6 + input.soundGrowthRate * 0.4, 100);
  const trendingBonus = input.trendingPosition ? Math.max(0, 30 - input.trendingPosition) : 0;
  const categoryScore = Math.min(input.categoryAvgEngagementRate * 10, 100);

  const score = Math.round(
    velocityScore * 0.5 + trendingBonus * 0.2 + categoryScore * 0.3
  );

  return {
    score: Math.min(score, 100),
    breakdown: {
      velocity: Math.round(velocityScore),
      trending_bonus: Math.round(trendingBonus),
      category_avg: Math.round(categoryScore),
    },
  };
}
```

> Catatan: semua input di atas WAJIB diambil dari query ke `hashtag_snapshots`, `sound_snapshots`, dan agregat kategori di database — tidak boleh ada nilai hardcode.

### 10.2 Scraper Service (Python) — Contoh Endpoint

```python
# apps/scraper-service/routers/hashtags.py
from fastapi import APIRouter, HTTPException
from services.tiktok_api_client import fetch_hashtag_data
from services.rapidapi_fallback import fetch_hashtag_data_fallback

router = APIRouter()

@router.get("/hashtags/{tag}")
async def get_hashtag_data(tag: str):
    try:
        data = await fetch_hashtag_data(tag)
        if data is None:
            data = await fetch_hashtag_data_fallback(tag)
        if data is None:
            raise HTTPException(status_code=503, detail="Data tidak tersedia saat ini")
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

### 10.3 Tailwind Config — Warna Tema

```ts
// apps/web/tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        charcoal: { DEFAULT: '#1E1F22', light: '#2A2B30' },
        'neon-purple': '#7F56FF',
        'lime-green': '#80FF56',
        danger: '#FF5C5C',
      },
    },
  },
};
```

---

## 11. ROADMAP PENGEMBANGAN (7 FASE)

| Fase | Fokus | Output |
|---|---|---|
| 1 | Setup project (monorepo, Docker, DB schema, auth) | Skeleton project jalan, login berfungsi |
| 2 | Scraper service MVP (hashtag + sound saja) | Data nyata berhasil masuk ke DB via scheduler |
| 3 | Dashboard utama + Trend Radar | User bisa lihat trending hashtag/sound nyata |
| 4 | Hype Score Predictor | Input video → keluar skor + breakdown dari data nyata |
| 5 | Competitor Analysis + Best Time to Post | Bandingkan akun, lihat jam optimal posting |
| 6 | Watchlist + Subscription/Billing (Midtrans) | User Pro bisa subscribe & unlock fitur penuh |
| 7 | Optimasi (caching, rate limit, monitoring scraper health) + Deploy production | Sistem stabil, siap launch |

---

## 12. CATATAN RISIKO & MITIGASI

- **Risiko block dari TikTok:** mitigasi dengan delay random, rotasi User-Agent, batasi jumlah request per jam, dan fallback ke RapidAPI.
- **Data tidak realtime 100%:** jelaskan ke user bahwa data di-refresh berkala (misal "diperbarui setiap 30-60 menit") — ini jujur dan tetap dianggap "data nyata", bukan dummy.
- **Skalabilitas scraper:** kalau traffic besar, scraper service dipisah jadi worker terpisah dari API agar tidak saling blocking.
- **Legalitas:** scraping data publik TikTok berada di area abu-abu hukum di banyak negara. Sertakan disclaimer di footer website dan pertimbangkan Terms of Service TikTok sebelum scale besar.

---

*Dokumen ini siap dipakai sebagai prompt/context awal untuk AI coding assistant membangun project dari nol.*
