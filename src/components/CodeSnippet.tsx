import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeSnippetProps {
  lang?: string;
  title?: string;
  code: string;
}

export default function CodeSnippet({ lang = "R / SQL", title, code }: CodeSnippetProps): React.ReactElement {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Échec de la copie :", err);
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div className="my-6 bevel-window overflow-hidden">
      {/* ── Retro Editor Titlebar ── */}
      <div className="bevel-titlebar">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="w-2.5 h-2.5 rounded-full bg-violet-600 shadow-[0_0_8px_rgba(139,92,246,0.7)] dark:bg-violet-400 flex-shrink-0 animate-pulse" />
          <span className="retro-badge text-terracotta bg-terracotta-bg border-terracotta-border">
            {lang}
          </span>
          {title && (
            <span className="font-display font-semibold text-xs text-bp-text truncate">
              {title}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            aria-label="Copier le code"
            className="bevel-btn text-[0.5625rem] py-0.5 px-2 flex items-center gap-1 hover:text-retro-cyan"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-forest" />
                <span className="text-forest font-pixel">COPIÉ !</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span className="font-pixel">COPIER</span>
              </>
            )}
          </button>

          <div className="bevel-controls hidden sm:flex">
            <span className="bevel-control-btn">_</span>
            <span className="bevel-control-btn">□</span>
            <span className="bevel-control-btn">×</span>
          </div>
        </div>
      </div>

      {/* ── Inset Code Container with Line Numbers ── */}
      <div className="m-2 bevel-inset p-3 overflow-x-auto">
        <table className="w-full font-mono text-xs text-bp-text border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="leading-relaxed hover:bg-bp-surface/60 transition-colors">
                <td className="pr-4 py-0.5 text-right select-none text-bp-dim text-[0.6875rem] w-8 border-r border-bevel-mid">
                  {idx + 1}
                </td>
                <td className="pl-4 py-0.5 whitespace-pre font-mono text-bp-text">
                  <code>{line}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
