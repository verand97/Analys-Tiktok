import { Check, X, ShieldCheck } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-charcoal text-foreground py-20 px-4 flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto text-center space-y-4 mb-16">
        <div className="flex justify-center mb-4">
           <ShieldCheck className="w-12 h-12 text-lime-green" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-lime-green">
          Unlock the Full Potential of ViralPulse
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose a plan that scales with your content strategy. Get real-time alerts and unlimited historical data.
        </p>
      </div>

      <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="bg-card border border-border rounded-3xl p-8 flex flex-col transition-all hover:border-border/80">
          <h3 className="text-2xl font-bold mb-2">Creator Free</h3>
          <p className="text-muted-foreground mb-6">For individuals just starting out.</p>
          <div className="text-4xl font-black mb-8">Rp 0 <span className="text-lg text-muted-foreground font-normal">/month</span></div>
          
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-lime-green" /> 5 Watchlist Items</li>
            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-lime-green" /> 5 Hype Score Predicts/Day</li>
            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-lime-green" /> Basic Trend Radar</li>
            <li className="flex items-center gap-3 text-muted-foreground"><X className="w-5 h-5" /> No Competitor Analysis</li>
            <li className="flex items-center gap-3 text-muted-foreground"><X className="w-5 h-5" /> No Email Alerts</li>
          </ul>
          
          <button className="w-full py-3 rounded-xl border border-border bg-charcoal hover:bg-charcoal-light font-medium transition-colors text-muted-foreground cursor-not-allowed">
            Current Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-charcoal border-2 border-neon-purple relative rounded-3xl p-8 flex flex-col transform md:-translate-y-4 shadow-[0_0_40px_rgba(127,86,255,0.15)]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-neon-purple to-lime-green text-charcoal px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide">
            MOST POPULAR
          </div>
          <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-lime-green">Agency Pro</h3>
          <p className="text-muted-foreground mb-6">For professionals and social media managers.</p>
          <div className="text-4xl font-black mb-8">Rp 99k <span className="text-lg text-muted-foreground font-normal">/month</span></div>
          
          <ul className="space-y-4 mb-8 flex-1 text-foreground/90">
            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-neon-purple" /> Unlimited Watchlist</li>
            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-neon-purple" /> Unlimited Hype Predicts</li>
            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-neon-purple" /> Advanced Trend Analytics</li>
            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-neon-purple" /> Track 10 Competitors</li>
            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-neon-purple" /> Instant Email/Push Alerts</li>
          </ul>
          
          <button className="w-full py-3.5 rounded-xl bg-neon-purple hover:bg-neon-purple/90 text-white font-bold transition-all shadow-[0_0_20px_rgba(127,86,255,0.4)] hover:shadow-[0_0_30px_rgba(127,86,255,0.6)]">
            Subscribe via Midtrans
          </button>
        </div>
      </div>
    </div>
  );
}
