from TikTokApi import TikTokApi
import os
from models.schemas import HashtagData, SoundData
from typing import Optional

# Wajib: ms_token TikTok untuk mem-bypass security check (disediakan oleh user via .env)
MS_TOKEN = os.getenv("TIKTOK_MS_TOKEN", "")

async def fetch_hashtag_data(tag: str) -> Optional[HashtagData]:
    if not MS_TOKEN:
        print("TIKTOK_MS_TOKEN is not set.")
        return None
        
    try:
        async with TikTokApi() as api:
            await api.create_sessions(ms_tokens=[MS_TOKEN], num_sessions=1, sleep_after=3)
            hashtag = api.hashtag(name=tag)
            info = await hashtag.info()
            
            stats = info.get('challengeInfo', {}).get('stats', {})
            return HashtagData(
                tag=tag,
                view_count=stats.get('viewCount', 0),
                video_count=stats.get('videoCount', 0)
            )
    except Exception as e:
        print(f"Error fetching hashtag: {e}")
        return None

async def fetch_sound_data(sound_id: str) -> Optional[SoundData]:
    if not MS_TOKEN:
        print("TIKTOK_MS_TOKEN is not set.")
        return None
        
    try:
        async with TikTokApi() as api:
            await api.create_sessions(ms_tokens=[MS_TOKEN], num_sessions=1, sleep_after=3)
            sound = api.sound(id=sound_id)
            info = await sound.info()
            
            music_info = info.get('musicInfo', {})
            return SoundData(
                tiktok_sound_id=sound_id,
                title=music_info.get('music', {}).get('title', ''),
                author=music_info.get('music', {}).get('authorName', ''),
                usage_count=music_info.get('stats', {}).get('videoCount', 0)
            )
    except Exception as e:
        print(f"Error fetching sound: {e}")
        return None
