from fastapi import APIRouter, HTTPException
from services.tiktok_api_client import fetch_hashtag_data
from services.rapidapi_fallback import fetch_hashtag_data_fallback
from services.rate_limiter import random_delay

router = APIRouter()

@router.get("/hashtags/{tag}")
async def get_hashtag_data(tag: str):
    try:
        # Rate limiting: delay random
        await random_delay(1.0, 3.0)
        
        # Priority 1: Main Scraper
        data = await fetch_hashtag_data(tag)
        
        # Priority 2: Fallback API
        if data is None:
            data = await fetch_hashtag_data_fallback(tag)
            
        if data is None:
            raise HTTPException(status_code=503, detail="Data tidak tersedia saat ini")
            
        return data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
