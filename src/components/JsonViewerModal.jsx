import React, { useState } from 'react';
import { X, Copy, Check, Download, Upload, FileCode } from 'lucide-react';

export const JsonViewerModal = ({
  isOpen,
  onClose,
  games,
  onImportGames,
}) => {
  const [copied, setCopied] = useState(false);
  const [importError, setImportError] = useState('');

  if (!isOpen) return null;

  const jsonString = JSON.stringify(games, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'games.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id) {
          onImportGames(parsed);
          onClose();
        } else {
          setImportError('Invalid JSON format: Must be an array of game objects with at least id, title, and iframeUrl/iframeCode.');
        }
      } catch (err) {
        setImportError('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-[#0f172a] shadow-2xl overflow-hidden my-8 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex h-14 items-center justify-between border-b border-slate-800 px-6 bg-[#0c1322] shrink-0">
          <div className="flex items-center gap-2">
            <FileCode className="h-4 w-4 text-emerald-400" />
            <h2 className="text-base font-bold text-white font-['Syne',sans-serif]">
              games.json Database Viewer
            </h2>
            <span className="text-xs text-slate-400 font-mono">({games.length} games)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content body */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          {importError && (
            <div className="mb-3 p-2.5 text-xs text-rose-300 bg-rose-950/60 border border-rose-800 rounded-lg">
              {importError}
            </div>
          )}

          <div className="text-xs text-slate-400 mb-2.5 flex items-center justify-between">
            <span>Each game defines an embedded sandbox iframe with its source code and controls:</span>
            <label className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 cursor-pointer">
              <Upload className="h-3.5 w-3.5" />
              <span>Import games.json</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="relative rounded-xl border border-slate-800 bg-[#070b13] p-4 overflow-x-auto text-xs font-mono text-emerald-400 leading-relaxed max-h-[460px]">
            <pre>{jsonString}</pre>
          </div>
        </div>

      </div>
    </div>
  );
};
