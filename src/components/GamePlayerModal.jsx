import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Maximize2, Minimize2, RotateCcw, Copy, Check, 
  ExternalLink, Bookmark, Code2, Keyboard, Share2 
} from 'lucide-react';

export const GamePlayerModal = ({
  game,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [isTheater, setIsTheater] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !document.fullscreenElement) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!game) return null;

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.warn('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().catch(err => {
        console.warn('Error attempting to exit fullscreen:', err);
      });
    }
  };

  const handleReload = () => {
    setReloadKey(prev => prev + 1);
  };

  const handleCopyEmbedCode = () => {
    navigator.clipboard.writeText(game.iframeCode || `<iframe src="${game.iframeUrl}" width="100%" height="600" allow="fullscreen; autoplay"></iframe>`);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('game', game.id);
    navigator.clipboard.writeText(url.toString());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleOpenBlank = () => {
    window.open(game.iframeUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        ref={containerRef}
        className={`relative flex flex-col rounded-2xl border border-slate-800 bg-[#0f172a] shadow-2xl transition-all duration-200 overflow-hidden ${
          isTheater 
            ? 'w-[98vw] max-w-7xl h-[92vh]' 
            : 'w-full max-w-4xl max-h-[92vh]'
        }`}
      >
        
        {/* Player Header Bar */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800 px-4 sm:px-6 bg-[#0c1322]">
          <div className="flex items-center gap-3 min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-white truncate font-['Syne',sans-serif]">
              {game.title}
            </h2>
            <span className="hidden sm:inline-block text-xs text-slate-400 font-medium">
              · {game.category}
            </span>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onToggleFavorite(game.id)}
              title={isFavorite ? "Remove favorite" : "Bookmark game"}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isFavorite 
                  ? 'bg-amber-400/20 text-amber-400 hover:bg-amber-400/30' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Bookmark className={`h-4 w-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
            </button>

            <button
              onClick={handleReload}
              title="Reload game frame"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            <button
              onClick={() => setIsTheater(prev => !prev)}
              title={isTheater ? "Exit theater mode" : "Theater mode"}
              className={`hidden sm:flex p-2 rounded-lg transition-colors cursor-pointer ${
                isTheater ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {isTheater ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>

            <button
              onClick={handleFullscreen}
              title="Fullscreen"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <Maximize2 className="h-4 w-4" />
            </button>

            <button
              onClick={handleOpenBlank}
              title="Open direct game tab"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <ExternalLink className="h-4 w-4" />
            </button>

            <div className="h-5 w-[1px] bg-slate-800 mx-1" />

            <button
              onClick={onClose}
              title="Close (Esc)"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Embedded Iframe Container */}
        <div className="relative flex-1 w-full bg-black min-h-[380px] sm:min-h-[500px]">
          <iframe
            key={reloadKey}
            src={game.iframeUrl}
            title={game.title}
            className="w-full h-full min-h-[420px] sm:min-h-[520px] border-0"
            allow="fullscreen; autoplay; gamepad"
            sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms"
          />
        </div>

        {/* Player Footer & Controls Bar */}
        <div className="shrink-0 border-t border-slate-800 bg-[#0c1322] px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            {/* Controls Instructions */}
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Keyboard className="h-4 w-4 text-emerald-400 shrink-0" />
              <span className="font-semibold text-slate-400">Controls:</span>
              <span className="text-slate-200">{game.controls}</span>
            </div>

            {/* Embed & Share utilities */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyEmbedCode}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-md transition-colors cursor-pointer"
              >
                {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
                <span>{copiedCode ? "Copied Embed" : "Copy Iframe"}</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-md transition-colors cursor-pointer"
              >
                {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5 text-slate-400" />}
                <span>{copiedLink ? "Link Copied" : "Share"}</span>
              </button>

              <button
                onClick={() => setShowCode(prev => !prev)}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>{showCode ? "Hide JSON" : "Inspect JSON"}</span>
              </button>
            </div>

          </div>

          {/* Collapsible JSON Viewer for this game */}
          {showCode && (
            <div className="mt-3 p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto">
              <pre>{JSON.stringify(game, null, 2)}</pre>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
