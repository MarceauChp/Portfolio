import React from 'react';
import { Download, Cpu, MapPin, type LucideIcon } from 'lucide-react';
import type { PipelineStepItem } from '../types';

const icons: Record<string, LucideIcon> = {
  Download,
  Cpu,
  MapPin
};

interface PipelineStepProps {
  step: PipelineStepItem;
  index: number;
}

type ColorKey = 'emerald' | 'cyan' | 'violet';

const accentThemes: Record<ColorKey, { text: string; dot: string; badge: string }> = {
  emerald: {
    text: 'text-emerald-600 dark:text-emerald-400',
    dot: 'bg-emerald-600 dark:bg-emerald-400',
    badge: 'text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 border-emerald-600 dark:border-emerald-400'
  },
  cyan: {
    text: 'text-blue-600 dark:text-cyan-400',
    dot: 'bg-blue-600 dark:bg-cyan-400',
    badge: 'text-blue-700 dark:text-cyan-300 bg-blue-100 dark:bg-cyan-950/80 border-blue-600 dark:border-cyan-400'
  },
  violet: {
    text: 'text-amber-600 dark:text-amber-400',
    dot: 'bg-amber-600 dark:bg-amber-400',
    badge: 'text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 border-amber-600 dark:border-amber-400'
  },
};

export default function PipelineStep({ step }: PipelineStepProps): React.ReactElement {
  const IconComponent = icons[step.icon] ?? Cpu;
  const accent = accentThemes[step.color] ?? accentThemes.cyan;

  return (
    <div className="bevel-window p-4 sm:p-5 flex flex-col justify-between h-full">
      <div>
        {/* Titlebar / Header */}
        <div className="bevel-titlebar mb-3">
          <div className="flex items-center gap-2">
            <IconComponent className={`w-4 h-4 ${accent.text}`} />
            <span className={`font-pixel text-[0.6875rem] tracking-wider uppercase font-bold px-2 py-0.5 border ${accent.badge}`}>
              PHASE {step.number}
            </span>
          </div>
          <div className="bevel-controls">
            <span className="bevel-control-btn">_</span>
            <span className="bevel-control-btn">□</span>
          </div>
        </div>

        {/* Step Title in Space Grotesk */}
        <h4 className="font-display font-bold text-base sm:text-lg text-bp-text mb-2 tracking-tight">
          {step.title}
        </h4>

        <p className="text-xs sm:text-[0.8125rem] text-bp-muted font-mono leading-relaxed mb-4">
          {step.description}
        </p>
      </div>

      {/* Terminal items list */}
      <div className="space-y-1.5 pt-3 border-t border-bevel-mid">
        {step.items.map((item, i) => (
          <div
            key={i}
            className="bevel-inset px-2.5 py-1.5 text-xs font-mono text-bp-text flex items-center gap-2"
          >
            <span className={`w-1.5 h-1.5 rounded-none flex-shrink-0 ${accent.dot}`} />
            <span className="truncate">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
