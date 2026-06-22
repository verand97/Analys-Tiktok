from fastapi import FastAPI
from routers import hashtags, sounds
from jobs.scheduler import start_scheduler

app = FastAPI(title="ViralPulse Scraper Service")

app.include_router(hashtags.router, prefix="/api")
app.include_router(sounds.router, prefix="/api")

@app.on_event("startup")
async def startup_event():
    start_scheduler()
    print("Scheduler started.")

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Scraper service is running"}
