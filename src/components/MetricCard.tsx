import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Building2, Thermometer, Layers, CheckCircle2, TrendingUp, Sparkles, type LucideIcon } from 'lucide-react';
import type { Metric } from '../types';

const icons: Record<string, LucideIcon> = {
  Building2,
  Thermometer,
  Layers,
  CheckCircle2,
  TrendingUp,
  Sparkles
};

interface MetricCardProps {
  metric: Metric;
  index?: number;
}

export default function MetricCard({ metric, index = 0 }: MetricCardProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState('0');

  const IconComponent = icons[metric.icon] ?? Sparkles;

  useEffect(() => {
    if (!isInView) return;

    const targetVal = metric.value;
    const isFloat = metric.isFloat ?? false;

    const controls = animate(0, targetVal, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        if (isFloat) {
          setDisplayValue(value.toFixed(1));
        } else {
          setDisplayValue(Math.round(value).toLocaleString('fr-FR'));
        }
      }
    });

    return () => controls.stop();
  }, [isInView, metric.value, metric.isFloat]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bevel-window p-4 flex flex-col justify-between"
    >
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between pb-2 border-b border-bevel-mid mb-3">
        <div className="bevel-btn px-2 py-0.5 text-retro-cyan flex items-center gap-1.5">
          <IconComponent className="w-3.5 h-3.5" />
          <span className="text-[0.5625rem] font-pixel uppercase tracking-wider">INDICATEUR</span>
        </div>
        <div className="bevel-controls">
          <span className="bevel-control-btn">_</span>
          <span className="bevel-control-btn">□</span>
        </div>
      </div>

      {/* ── Value & Description ── */}
      <div className="space-y-2">
        <div className="bevel-inset p-3 text-center">
          <span className="font-pixel text-2xl sm:text-3xl text-retro-cyan font-bold tracking-tight">
            {metric.prefix}{displayValue}{metric.suffix}
          </span>
        </div>

        <h4 className="font-mono text-xs sm:text-sm font-semibold text-bp-text leading-snug">
          {metric.label}
        </h4>

        <p className="text-[0.6875rem] text-bp-muted font-mono leading-relaxed">
          {metric.description}
        </p>
      </div>
    </motion.div>
  );
}
