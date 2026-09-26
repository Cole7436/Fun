import React from 'react';
import { Gamepad2, Plus, Code2 } from 'lucide-react';

export const Navbar = ({
  activeCategory,
  onSelectCategory,
  onOpenAddModal,
  onOpenJsonModal,
  searchQuery,
  onSearchChange,
  favoritesCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0f19]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Gamepad2 className="h-5 w-5" />
          </div>
          <button 
            onClick={() => { onSelectCategory('All'); onSearchChange(''); }}
            className="text-left group cursor-pointer border-0 bg-transparent p-0"
          >
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors font-['Syne',sans-serif]">
              PortalPlay
            </span>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectCategory('All')}
            className={`cursor-pointer transition-colors ${
              activeCategory === 'All' && !searchQuery
                ? 'text-emerald-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            All Games
          </button>
          <button
            onClick={() => onSelectCategory('Arcade')}
            className={`cursor-pointer transition-colors ${
              activeCategory === 'Arcade' ? 'text-emerald-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Arcade
          </button>
          <button
            onClick={() => onSelectCategory('Puzzle')}
            className={`cursor-pointer transition-colors ${
              activeCategory === 'Puzzle' ? 'text-emerald-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Puzzle
          </button>
          <button
            onClick={() => onSelectCategory('Action')}
            className={`cursor-pointer transition-colors ${
              activeCategory === 'Action' ? 'text-emerald-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Action
          </button>
          <button
            onClick={() => onSelectCategory('Retro')}
            className={`cursor-pointer transition-colors ${
              activeCategory === 'Retro' ? 'text-emerald-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Retro
          </button>
          <button
            onClick={() => onSelectCategory('Favorites')}
            className={`cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeCategory === 'Favorites' ? 'text-emerald-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Favorites
            {favoritesCount > 0 && (
              <span className="text-xs text-slate-400 font-mono">({favoritesCount})</span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenJsonModal}
            title="Inspect games.json database"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-750 hover:text-white rounded-lg border border-slate-700/60 transition-colors whitespace-nowrap cursor-pointer"
          >
            <Code2 className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline">JSON</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Game</span>
          </button>
        </div>

      </div>
    </header>
  );
};
