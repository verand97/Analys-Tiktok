interface HypeScoreInput {
  hashtagGrowthRate: number;    // % growth 24-72 jam terakhir
  soundGrowthRate: number;
  categoryAvgEngagementRate: number; // rata-rata kategori
  trendingPosition: number | null;   // posisi di trending list
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
