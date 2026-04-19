import Image from "next/image";
import { TonalSurface } from "@/components/ui/TonalSurface";
import { AmbientShadow } from "@/components/ui/AmbientShadow";
import { GhostBorder } from "@/components/ui/GhostBorder";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-surface font-sans">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-center py-32 px-16 gap-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-on-surface">
            Tonal Base Verification
          </h1>
          <p className="text-lg text-on-surface/70">
            Testing Organic Brutalism depth layers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Tier Base */}
          <TonalSurface tier="base" className="p-8 rounded-3xl space-y-4">
            <h2 className="font-semibold">Tier: Base</h2>
            <p className="text-sm opacity-70">The primary canvas. Subtle ring inset for boundary softening.</p>
          </TonalSurface>

          {/* Tier Low */}
          <TonalSurface tier="low" className="p-8 rounded-3xl space-y-4">
            <h2 className="font-semibold">Tier: Low</h2>
            <p className="text-sm opacity-70">Subtle sectioning.- Used for background grouping.</p>
          </TonalSurface>

          {/* Tier High + Ambient Shadow */}
          <AmbientShadow>
            <TonalSurface tier="high" className="p-8 rounded-3xl space-y-4">
              <h2 className="font-semibold">Tier: High + Ambient Shadow</h2>
              <p className="text-sm opacity-70">Elevated container with the tinted high-blur shadow.</p>
            </TonalSurface>
          </AmbientShadow>

          {/* Tier Highest + Ghost Border */}
          <GhostBorder>
            <TonalSurface tier="highest" className="p-8 rounded-3xl space-y-4">
              <h2 className="font-semibold">Tier: Highest + Ghost Border</h2>
              <p className="text-sm opacity-70">Focus area with the accessibility boundary utility.</p>
            </TonalSurface>
          </GhostBorder>
        </div>
      </main>
    </div>
  );
}
