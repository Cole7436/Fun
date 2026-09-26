import React, { useState } from 'react';
import { X, Plus, AlertCircle, Sparkles } from 'lucide-react';

export const AddGameModal = ({
  isOpen,
  onClose,
  onAddGame,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [iframeInput, setIframeInput] = useState('');
  const [description, setDescription] = useState('');
  const [controls, setControls] = useState('Mouse and Keyboard');
  const [selectedThumb, setSelectedThumb] = useState('/src/assets/images/thumb_block_puzzle_1790431346375.jpg');
  const [customThumb, setCustomThumb] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Please provide a game title.');
      return;
    }
    if (!iframeInput.trim()) {
      setError('Please provide an iframe URL or embed code.');
      return;
    }

    let url = iframeInput.trim();
    let embedCode = iframeInput.trim();

    if (iframeInput.includes('<iframe')) {
      const match = iframeInput.match(/src=["']([^"']+)["']/i);
      if (match && match[1]) {
        url = match[1];
      } else {
        setError('Invalid <iframe> code format. Could not find a valid src attribute.');
        return;
      }
    } else {
      embedCode = `<iframe src="${url}" width="100%" height="600" allow="fullscreen; autoplay" style="border:0;" title="${title}"></iframe>`;
    }

    const finalThumbnail = customThumb.trim() || selectedThumb;

    onAddGame({
      title: title.trim(),
      category,
      description: description.trim() || 'Custom unblocked web game.',
      controls: controls.trim() || 'Mouse / Keyboard',
      tags: [category, 'Custom'],
      thumbnail: finalThumbnail,
      iframeUrl: url,
      iframeCode: embedCode,
      featured: false,
    });

    onClose();
  };

  const presetThumbnails = [
    { label: 'Arcade', path: '/src/assets/images/hero_arcade_showcase_1790431326240.jpg' },
    { label: 'Snake Grid', path: '/src/assets/images/thumb_retro_snake_1790431336564.jpg' },
    { label: 'Blocks', path: '/src/assets/images/thumb_block_puzzle_1790431346375.jpg' },
    { label: 'Cosmic', path: '/src/assets/images/thumb_space_asteroids_1790431357268.jpg' },
    { label: 'Prism', path: '/src/assets/images/thumb_brick_breaker_1790431366791.jpg' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0f172a] shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex h-14 items-center justify-between border-b border-slate-800 px-6 bg-[#0c1322]">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <h2 className="text-base font-bold text-white font-['Syne',sans-serif]">
              Add Iframe Game to JSON
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 text-xs text-rose-300 bg-rose-950/50 border border-rose-800 rounded-lg">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Game Title
            </label>
            <input
              type="text"
              placeholder="e.g. Retro Speed Racer"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-900 border border-slate-700/80 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-900 border border-slate-700/80 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
              >
                <option value="Arcade">Arcade</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Action">Action</option>
                <option value="Classic">Classic</option>
                <option value="Retro">Retro</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Controls
              </label>
              <input
                type="text"
                placeholder="e.g. WASD to drive"
                value={controls}
                onChange={e => setControls(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-slate-900 border border-slate-700/80 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Iframe URL or &lt;iframe&gt; Embed Code
            </label>
            <textarea
              rows={3}
              placeholder='e.g. /games/snake.html or <iframe src="https://example.com/game"></iframe>'
              value={iframeInput}
              onChange={e => setIframeInput(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-mono bg-slate-900 border border-slate-700/80 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <p className="mt-1 text-[11px] text-slate-500">
              Paste either a direct URL or an entire &lt;iframe&gt; embed code.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Description
            </label>
            <textarea
              rows={2}
              placeholder="Short summary of game rules and objective..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-900 border border-slate-700/80 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Select Thumbnail Artwork
            </label>
            <div className="grid grid-cols-5 gap-2 mb-2">
              {presetThumbnails.map(thumb => (
                <button
                  type="button"
                  key={thumb.label}
                  onClick={() => { setSelectedThumb(thumb.path); setCustomThumb(''); }}
                  className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedThumb === thumb.path && !customThumb
                      ? 'border-emerald-400 ring-2 ring-emerald-400/20'
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={thumb.path}
                    alt={thumb.label}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Or paste custom image URL..."
              value={customThumb}
              onChange={e => setCustomThumb(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800/80">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Save Game to JSON</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
