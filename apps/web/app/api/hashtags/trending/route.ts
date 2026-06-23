import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;
function getPrisma() {
  if (!prisma) prisma = new PrismaClient();
  return prisma;
}

export async function GET() {
  try {
    const prismaClient = getPrisma();
    const hashtags = await prismaClient.hashtag.findMany({
      include: {
        snapshots: {
          orderBy: { fetchedAt: 'asc' },
        }
      }
    });

    const formattedData = hashtags.map(h => {
       const latest = h.snapshots[h.snapshots.length - 1];
       const first = h.snapshots[0];
       
       let growth = 0;
       if (h.snapshots.length > 1 && Number(first.viewCount) > 0) {
          growth = (Number(latest.viewCount - first.viewCount) / Number(first.viewCount)) * 100;
       }

       return {
         id: h.id,
         tag: h.tag,
         latestViews: latest ? Number(latest.viewCount) : 0,
         growth: growth.toFixed(2),
         history: h.snapshots.map(s => ({
            name: s.fetchedAt ? new Date(s.fetchedAt).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }) : '',
            views: Number(s.viewCount)
         }))
       };
    });

    const sounds = await prismaClient.sound.findMany({
      include: { snapshots: { orderBy: { fetchedAt: 'desc' }, take: 1 } },
      take: 5
    });

    const categories = await prismaClient.category.findMany({
      take: 5
    });

    return NextResponse.json({ 
      data: formattedData,
      sounds: sounds.map(s => ({
         id: s.id,
         title: s.title || `Sound #${s.tiktokSoundId}`,
         usageCount: s.snapshots[0] ? Number(s.snapshots[0].usageCount) : 0
      })),
      categories: categories.map(c => ({
         id: c.id,
         name: c.name
      }))
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
