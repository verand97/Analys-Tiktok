import asyncio
import random

async def random_delay(min_seconds: float = 1.0, max_seconds: float = 5.0):
    """
    Menambahkan delay acak antar request untuk mengurangi risiko block (sesuai spesifikasi).
    """
    delay = random.uniform(min_seconds, max_seconds)
    await asyncio.sleep(delay)
