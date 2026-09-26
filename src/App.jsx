import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, SlidersHorizontal, Gamepad2, Sparkles, 
  Bookmark, Flame, Layers, ArrowUpDown, Plus
} from 'lucide-react';
import { 
  CATEGORIES, loadAllGames, saveCustomGame, 
  deleteCustomGame, getFavorites, toggleFavoriteId 
} from './data/games.js';
import { Navbar } from './components/Navbar.jsx';
import { HeroFeatured } from './components/HeroFeatured.jsx';
import { GameCard } from './components/GameCard.jsx';
import { GamePlayerModal } from './components/GamePlayerModal.jsx';
import { AddGameModal } from './components/AddGameModal.jsx';
import { JsonViewerModal } from './components/JsonViewerModal.jsx';

export default function App() {
  const [games, setGames] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [favorites, setFavorites] = useState([]);
  const [activeGame, setActiveGame] = useState(null);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);

  const searchInputRef = useRef(null);

  // Load games from data and favorites from storage
  useEffect(() => {
    const loaded = loadAllGames();
    setGames(loaded);
    setFavorites(getFavorites());

    // Check URL query param for deep link
    const params = new URLSearchParams(window.location.search);
    const gameParam = params.get('game');
    if (gameParam) {
      const matched = loaded.find(g => g.id === gameParam);
      if (matched) setActiveGame(matched);
    }

    // Keyboard shortcut '/' to focus search
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current && !activeGame) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGame]);

  const handleToggleFavorite = (id) => {
    const next = toggleFavoriteId(id);
    setFavorites(next);
  };

  const handleAddGame = (newGameData) => {
    const created = saveCustomGame(newGameData);
    setGames(prev => [created, ...prev]);
    setActiveGame(created);
  };

  const handleDeleteCustom = (id) => {
    deleteCustomGame(id);
    setGames(prev => prev.filter(g => g.id !== id));
    if (activeGame?.id === id) setActiveGame(null);
  };

  const handleImportGames = (imported) => {
    try {
      localStorage.setItem('portalplay_custom_games', JSON.stringify(imported));
      setGames(imported);
    } catch (err) {
      console.error('Import failed', err);
    }
  };

  // Filter and sort games
  const filteredGames = useMemo(() => {
    return games
      .filter(game => {
        // Category filter
        if (activeCategory === 'Favorites') {
          if (!favorites.includes(game.id)) return false;
        } else if (activeCategory !== 'All' && game.category !== activeCategory) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = game.title.toLowerCase().includes(q);
          const matchDesc = game.description.toLowerCase().includes(q);
          const matchCategory = game.category.toLowerCase().includes(q);
          const matchTag = game.tags.some(t => t.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchCategory && !matchTag) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (sortBy === 'alphabetical') {
          return a.title.localeCompare(b.title);
        }
        // 'featured'
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [games, activeCategory, searchQuery, sortBy, favorites]);

  const featuredGame = useMemo(() => {
    return games.find(g => g.featured) || games[0];
  }, [games]);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Bar Contract Navigation */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenJsonModal={() => setIsJsonModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        favoritesCount={favorites.length}
      />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Hero Spotlight (shown when not actively searching) */}
        {!searchQuery && activeCategory === 'All' && featuredGame && (
          <HeroFeatured 
            game={featuredGame} 
            onPlayGame={setActiveGame} 
          />
        )}

        {/* Controls Toolbar: Search & Category Segmented Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search unblocked games... (Press '/' to focus)"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#121927] border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <ArrowUpDown className="h-4 w-4 text-slate-400" />
              <span className="text-xs text-slate-400 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-[#121927] border border-slate-800 rounded-lg px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="rating">Highest Rated</option>
                <option value="alphabetical">Title (A - Z)</option>
              </select>
            </div>

          </div>

          {/* Interactive Category Segmented Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#121927] border border-slate-800 rounded-xl overflow-x-auto no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-emerald-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            ))}

            <div className="h-4 w-[1px] bg-slate-800 mx-1 shrink-0" />

            <button
              onClick={() => setActiveCategory('Favorites')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'Favorites'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Bookmark className="h-3.5 w-3.5" />
              <span>Favorites</span>
              {favorites.length > 0 && (
                <span className="font-mono text-[11px] opacity-80">({favorites.length})</span>
              )}
            </button>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-baseline justify-between border-b border-slate-800/80 pb-3">
          <div>
            <h2 className="text-xl font-bold text-white font-['Syne',sans-serif]">
              {activeCategory === 'Favorites' 
                ? 'Saved Favorite Games' 
                : activeCategory === 'All' 
                  ? 'All Available Games' 
                  : `${activeCategory} Games`}
            </h2>
            <div className="text-xs text-slate-400 mt-0.5">
              <span>{filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'} ready to play</span>
              <span aria-hidden="true" className="mx-1.5">·</span>
              <span>Direct HTML5 iframe sandboxes</span>
            </div>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Iframe Game</span>
          </button>
        </div>

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGames.map(game => (
              <GameCard
                key={game.id}
                game={game}
                isFavorite={favorites.includes(game.id)}
                onToggleFavorite={handleToggleFavorite}
                onPlay={setActiveGame}
                onDeleteCustom={handleDeleteCustom}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 p-12 text-center bg-[#101726]/40">
            <Gamepad2 className="h-10 w-10 text-slate-600 mb-3" />
            <h3 className="text-base font-semibold text-slate-200">No matching games found</h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm">
              {activeCategory === 'Favorites'
                ? "You haven't bookmarked any games yet. Click the bookmark icon on any card to save it."
                : `We couldn't find any games matching "${searchQuery}".`}
            </p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="px-4 py-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                Add Custom Game
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Quiet, clean Footer (no fake telemetry tickers) */}
      <footer className="border-t border-slate-800/80 bg-[#090d16] py-8 mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300 font-['Syne',sans-serif]">PortalPlay</span>
            <span aria-hidden="true">·</span>
            <span>All games stored as responsive iframes in JSON</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsJsonModalOpen(true)}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Inspect games.json
            </button>
            <span aria-hidden="true">·</span>
            <span>Zero install · Browser native</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <GamePlayerModal
        game={activeGame}
        onClose={() => setActiveGame(null)}
        isFavorite={activeGame ? favorites.includes(activeGame.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      <AddGameModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddGame={handleAddGame}
      />

      <JsonViewerModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        games={games}
        onImportGames={handleImportGames}
      />

    </div>
  );
}
