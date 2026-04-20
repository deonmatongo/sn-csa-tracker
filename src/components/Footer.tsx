'use client';

interface FooterProps {
  onReset: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
}

export default function Footer({ onReset, onExport, onImport }: FooterProps) {
  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) onImport(file);
    };
    input.click();
  };

  return (
    <footer className="border-t border-[#1e2d47] px-10 py-5 flex items-center justify-between gap-4 flex-wrap">
      <span className="text-xs text-[#4a5e7a]">
        Progress saved as JSON in browser ·{' '}
        <a href="https://www.pearsonvue.com/us/en/servicenow.html" target="_blank" rel="noopener noreferrer" className="text-[#0099ff] no-underline hover:underline">
          Book via Pearson VUE ↗
        </a>
        {' · '}
        <a href="https://learning.servicenow.com/lxp/en/pages/now-learning-get-certified?achievement_id=38e2296493cdf9d0fb94b4886cba10ba&id=amap_detail" target="_blank" rel="noopener noreferrer" className="text-[#0099ff] no-underline hover:underline">
          Now Learning portal ↗
        </a>
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={onExport}
          className="font-mono text-[11px] text-[#4a5e7a] bg-transparent border border-[#1e2d47] rounded-md px-3.5 py-1.5 cursor-pointer tracking-wide transition-all hover:text-[#8a9bb5] hover:border-[#2a3f5c]"
        >
          export json
        </button>
        <button
          onClick={handleImportClick}
          className="font-mono text-[11px] text-[#4a5e7a] bg-transparent border border-[#1e2d47] rounded-md px-3.5 py-1.5 cursor-pointer tracking-wide transition-all hover:text-[#8a9bb5] hover:border-[#2a3f5c]"
        >
          import json
        </button>
        <button
          onClick={() => { if (confirm('Reset all progress? This cannot be undone.')) onReset(); }}
          className="font-mono text-[11px] text-[#4a5e7a] bg-transparent border border-[#1e2d47] rounded-md px-3.5 py-1.5 cursor-pointer tracking-wide transition-all hover:text-[#8a9bb5] hover:border-[#2a3f5c]"
        >
          reset progress
        </button>
      </div>
    </footer>
  );
}
