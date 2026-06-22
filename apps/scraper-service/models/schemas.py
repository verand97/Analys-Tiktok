from pydantic import BaseModel
from typing import Optional

class HashtagData(BaseModel):
    tag: str
    view_count: int
    video_count: Optional[int] = None
    
class SoundData(BaseModel):
    tiktok_sound_id: str
    title: str
    author: str
    usage_count: int
