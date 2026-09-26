import React from 'react';
import { Play, Star, Bookmark, Trash2 } from 'lucide-react';

export const GameCard = ({
  game,
  isFavorite,
  onToggleFavorite,
  onPlay,
  onDeleteCustom,
}) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-[#121927] hover:border-slate-700 hover:shadow-lg transition-all duration-200">
      
      {/* Thumbnail Area */}
      <div 
        onClick={() => onPlay(game)}
        className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 cursor-pointer"
      >
        <img
          src={game.thumbnail}
          alt={game.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />

        {/* Hover Overlay with Play Button */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400 text-slate-950 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="h-5 w-5 fill-slate-950 translate-x-0.5" />
          </div>
        </div>

        {/* Top Floating Actions (Favorite + Custom Delete) */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
          {game.isCustom && onDeleteCustom && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteCustom(game.id);
              }}
              title="Delete custom game"
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/60 text-rose-400 hover:bg-rose-950 hover:text-rose-200 backdrop-blur-sm transition-colors cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(game.id);
            }}
            title={isFavorite ? "Remove favorite" : "Save favorite"}
            className={`flex h-7 w-7 items-center justify-center rounded-lg backdrop-blur-sm transition-colors cursor-pointer ${
              isFavorite
                ? 'bg-amber-400 text-slate-950'
                : 'bg-black/60 text-slate-300 hover:text-white hover:bg-black/80'
            }`}
          >
            <Bookmark className={`h-3.5 w-3.5 ${isFavorite ? 'fill-slate-950' : ''}`} />
          </button>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="flex flex-1 flex-col p-4">
        {/* Clean unboxed metadata line */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5 font-medium">
          <span className="text-emerald-400">{game.category}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="flex items-center gap-1 text-slate-300">
            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
            {game.rating}
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="font-mono text-[11px] text-slate-400">{game.plays} plays</span>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onPlay(game)}
          className="text-base font-semibold text-white group-hover:text-emerald-400 transition-colors cursor-pointer line-clamp-1"
        >
          {game.title}
        </h3>

        {/* Short description */}
        <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed flex-1">
          {game.description}
        </p>

        {/* Card Footer */}
        <div className="mt-3.5 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 truncate max-w-[180px]">
            {game.controls.split(',')[0]}
          </span>

          <button
            type="button"
            onClick={() => onPlay(game)}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
          >
            Play →
          </button>
        </div>

      </div>

    </div>
  );
};
