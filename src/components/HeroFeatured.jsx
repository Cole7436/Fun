import React from 'react';
import { Play, Sparkles, Star } from 'lucide-react';

export const HeroFeatured = ({ game, onPlayGame }) => {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#101726] shadow-xl">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_arcade_showcase_1790431326240.jpg"
          alt="Arcade lounge setup"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center opacity-35 filter brightness-75 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-14 max-w-3xl">
        {/* Clean unboxed metadata */}
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-3 tracking-wide">
          <span className="flex items-center gap-1 font-semibold uppercase tracking-wider text-[11px]">
            <Sparkles className="h-3 w-3" />
            Featured Spotlight
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-300">{game.category}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-300 flex items-center gap-1">
            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
            {game.rating}
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400 font-mono">{game.plays} plays</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-['Syne',sans-serif] leading-tight text-balance">
          {game.title}
        </h1>

        <p className="mt-3.5 text-sm sm:text-base text-slate-300 line-clamp-2 max-w-xl leading-relaxed">
          {game.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            onClick={() => onPlayGame(game)}
            className="flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/10 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Play className="h-4 w-4 fill-slate-950" />
            <span>Launch Game</span>
          </button>

          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <span>Embedded via sandbox iframe</span>
            <span aria-hidden="true">·</span>
            <span>Zero install</span>
          </div>
        </div>
      </div>
    </section>
  );
};
