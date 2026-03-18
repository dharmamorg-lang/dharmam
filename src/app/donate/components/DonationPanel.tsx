'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const presetAmounts = [100, 200, 500, 1000, 1500, 2000, 5000, 10000];

const KIT_COST = 811;

function formatAmount(amt: number): string {
  if (amt >= 1000) {
    const k = amt / 1000;
    return k % 1 === 0 ? `₹${k}K` : `₹${k}K`;
  }
  return `₹${amt}`;
}

function getStudentCount(amount: number): number {
  if (amount <= 0) return 0;
  return Math.floor(amount / KIT_COST);
}

interface KitCategory {
  emoji: string;
  title: string;
  items: string[];
}

const preKgKit: KitCategory[] = [
  {
    emoji: '📝',
    title: 'Writing & Basic Learning',
    items: [
      'Pencil (HB) – 12 pcs (Standard HB wooden pencils)',
      'Eraser – 12 pcs (Soft, non-dust quality)',
      'Sharpener – 3 pcs (Single-hole, metal/good plastic)',
      'Slate – 1 pc (For writing practice)',
    ],
  },
  {
    emoji: '📏',
    title: 'Measuring Tools',
    items: ['Scale (15 cm) – 3 pcs (Small ruler for pencil box use)'],
  },
  {
    emoji: '🎨',
    title: 'Creativity & Learning Materials',
    items: [
      'Colour Pencils – 1 set (12-colour pack)',
      'Sketch Pens – 1 set (12-colour pack – optional)',
      'Crayons / Oil Pastels – 1 set (12/25 shades for drawing)',
    ],
  },
  {
    emoji: '🎒',
    title: 'Carry & Storage Essentials',
    items: [
      'Pencil Box / Pouch – 1 pc (Hard/soft case – medium size)',
      'School Bag – 1 (2-compartment bag suitable for age)',
    ],
  },
  {
    emoji: '🥤',
    title: 'Daily School Essentials',
    items: [
      'Water Bottle – 1 pc (750ml–1L, BPA-free, leak-proof)',
      'Lunch Box – 1 pc (2-compartment – optional)',
    ],
  },
];

const lkgUkgKit: KitCategory[] = [
  {
    emoji: '📝',
    title: 'Writing & Academic Essentials',
    items: [
      'Pencil (HB) – 12 pcs',
      'Eraser – 12 pcs',
      'Sharpener – 3 pcs',
      'Slate – 1 pc',
    ],
  },
  {
    emoji: '📏',
    title: 'Measuring Tools',
    items: ['Scale (15 cm) – 3 pcs'],
  },
  {
    emoji: '🎨',
    title: 'Creative Learning Materials',
    items: [
      'Colour Pencils – 1 set',
      'Sketch Pens – 1 set (optional)',
      'Crayons / Oil Pastels – 1 set',
    ],
  },
  {
    emoji: '🎒',
    title: 'Student Utility Kit',
    items: ['Pencil Box / Pouch – 1 pc', 'School Bag – 1'],
  },
  {
    emoji: '🥤',
    title: 'Daily Essentials',
    items: ['Water Bottle – 1 pc (BPA-free)', 'Lunch Box – 1 pc (optional)'],
  },
];

function KitSection({
  title,
  ageLabel,
  categories,
  defaultOpen,
}: {
  title: string;
  ageLabel: string;
  categories: KitCategory[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <div className="border border-primary/20 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-primary/5 hover:bg-primary/10 transition-colors text-left"
      >
        <div>
          <span className="font-bold text-primary text-sm">🎒 {title}</span>
          <span className="ml-2 text-xs text-foreground-muted">({ageLabel})</span>
        </div>
        <Icon
          name={open ? 'ChevronUpIcon' : 'ChevronDownIcon'}
          size={16}
          className="text-primary flex-shrink-0"
        />
      </button>

      {open && (
        <div className="px-4 py-4 space-y-4 bg-white">
          {categories.map((cat) => (
            <div key={cat.title}>
              <p className="text-xs font-bold text-foreground mb-1.5">
                {cat.emoji} {cat.title}
              </p>
              <ul className="space-y-1">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-foreground-muted">
                    <span className="mt-0.5 text-primary font-bold flex-shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs font-bold text-foreground">
              💰 Estimated Kit Value
            </p>
            <p className="text-xs text-primary font-bold mt-0.5">
              👉 Approximate cost per student: ₹800 – ₹850
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DonationPanel() {
  const [type, setType] = useState<'one-time' | 'monthly'>('one-time');
  const [selected, setSelected] = useState<number | null>(1000);
  const [custom, setCustom] = useState('');

  const activeAmount = custom ? parseInt(custom) || 0 : selected || 0;
  const studentCount = getStudentCount(activeAmount);

  return (
    <div className="bg-white rounded-3xl shadow-card border border-border p-6 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-display font-bold text-2xl text-foreground mb-1">Choose Your Impact</h2>
        <p className="text-foreground-muted text-sm leading-relaxed">
          Your contribution directly supports a child's education, health, and future. Select an amount and see how you can make a difference.
        </p>
      </div>

      {/* Type Toggle */}
      <div className="flex gap-2 p-1 bg-primary-light rounded-xl mb-6">
        {(['one-time', 'monthly'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
              type === t
                ? 'bg-primary text-white shadow-sm'
                : 'text-foreground-muted hover:text-foreground'
            }`}
          >
            {t === 'one-time' ? 'One-Time' : 'Monthly'}
          </button>
        ))}
      </div>

      {/* Preset Amounts – 4 per row, 2 rows */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {presetAmounts.map((amt) => (
          <button
            key={amt}
            onClick={() => { setSelected(amt); setCustom(''); }}
            className={`amount-card text-xs md:text-sm font-bold ${selected === amt && !custom ? 'selected' : ''}`}
          >
            {formatAmount(amt)}
          </button>
        ))}
      </div>

      {/* Custom Amount */}
      <div className="mb-5">
        <label className="form-label">Custom Amount (₹)</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted font-bold text-lg">₹</span>
          <input
            type="number"
            placeholder="Enter amount"
            value={custom}
            onChange={(e) => {
              setCustom(e.target.value);
              setSelected(null);
            }}
            className="form-input pl-8"
            min="100"
          />
        </div>
      </div>

      {/* Dynamic Impact Callout */}
      {activeAmount > 0 && (
        <div className="mb-6 rounded-2xl bg-primary/5 border border-primary/20 px-4 py-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="HeartIcon" size={18} className="text-primary" variant="solid" />
            <span className="font-bold text-primary text-sm">💙 Your Donation Impact</span>
          </div>
          {studentCount >= 1 ? (
            <p className="text-foreground font-bold text-base">
              Your ₹{activeAmount.toLocaleString('en-IN')} will support{' '}
              <span className="text-primary">~{studentCount} student{studentCount > 1 ? 's' : ''}</span>
            </p>
          ) : (
            <p className="text-foreground-muted text-sm">
              Every contribution counts! ₹{KIT_COST} = 1 complete education kit.
            </p>
          )}

          {/* Trust callout */}
          <div className="mt-3 pt-3 border-t border-primary/15 flex items-center gap-2">
            <span className="text-lg">🏷️</span>
            <p className="text-xs font-bold text-primary">
              ₹811 = 1 Child Complete Education Kit
            </p>
          </div>

          {/* Short version checklist */}
          <div className="mt-3 space-y-1">
            {[
              'Complete school kit (bag, stationery & essentials)',
              'Writing & learning materials',
              'Creative tools for development',
              'Daily essentials (bottle & lunch box)',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-1.5 text-xs text-foreground-muted">
                <Icon name="CheckCircleIcon" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Kit Breakdown Sections */}
      <div className="mb-6 space-y-3">
        <p className="text-xs font-bold text-foreground-muted uppercase tracking-wide">
          What your donation provides:
        </p>
        <KitSection
          title="Helps Provide – Pre-KG / Nursery"
          ageLabel="Age 3–4"
          categories={preKgKit}
          defaultOpen={false}
        />
        <KitSection
          title="Helps Provide – LKG / UKG"
          ageLabel="Age 4–5"
          categories={lkgUkgKit}
          defaultOpen={false}
        />
      </div>

      {/* Donate Button */}
      <button
        className="w-full py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl text-lg transition-all shadow-accent flex items-center justify-center gap-2 group"
        onClick={() => alert('Redirecting to payment gateway...')}
      >
        <Icon name="HeartIcon" size={20} variant="solid" />
        {activeAmount > 0
          ? type === 'monthly'
            ? `Donate ₹${activeAmount.toLocaleString('en-IN')}/month`
            : `Donate ₹${activeAmount.toLocaleString('en-IN')}`
          : 'Donate Now'}
        <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>

      <p className="text-center text-xs text-foreground-muted mt-3">
        Secure payment · Tax benefits under 80G · Instant receipt
      </p>
    </div>
  );
}