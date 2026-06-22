import asyncio
from apscheduler.schedulers.asyncio import AsyncIOScheduler
import random

scheduler = AsyncIOScheduler()

async def fetch_trending_job():
    """
    Job periodik untuk fetch hashtag/sound yang sedang tren.
    Akan dipanggil secara berkala.
    """
    print("Menjalankan job scraping berkala...")
    # Delay acak 1-5 detik untuk naturalisasi
    delay = random.uniform(1.0, 5.0)
    await asyncio.sleep(delay)
    
    # Di sini nantinya kita panggil fetch_hashtag_data untuk setiap target di DB
    print("Job selesai. Data disimpan ke cache/DB.")

def start_scheduler():
    # Menjadwalkan job setiap 30-60 menit
    scheduler.add_job(fetch_trending_job, 'interval', minutes=30)
    scheduler.start()
