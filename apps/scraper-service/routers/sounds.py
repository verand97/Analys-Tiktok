from fastapi import APIRouter, HTTPException
from services.tiktok_api_client import fetch_sound_data
from services.rapidapi_fallback import fetch_sound_data_fallback
from services.rate_limiter import random_delay

router = APIRouter()

@router.get("/sounds/{sound_id}")
async def get_sound_data(sound_id: str):
    try:
        # Rate limiting: delay random
        await random_delay(1.0, 3.0)
        
        data = await fetch_sound_data(sound_id)
        
        if data is None:
            data = await fetch_sound_data_fallback(sound_id)
            
        if data is None:
            raise HTTPException(status_code=503, detail="Data tidak tersedia saat ini")
            
        return data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
