import os
import httpx
from typing import Optional
from models.schemas import HashtagData, SoundData

RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY", "")

async def fetch_hashtag_data_fallback(tag: str) -> Optional[HashtagData]:
    # Placeholder untuk RapidAPI TikTok API (contoh endpoint)
    # Return None jika gagal atau API Key tidak diset
    return None

async def fetch_sound_data_fallback(sound_id: str) -> Optional[SoundData]:
    return None
