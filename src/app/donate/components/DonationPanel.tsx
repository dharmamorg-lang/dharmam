'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import Image from 'next/image';

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
  const [showQRModal, setShowQRModal] = useState(false);

  const activeAmount = custom ? parseInt(custom) || 0 : selected || 0;
  const studentCount = getStudentCount(activeAmount);

  return (
    <div className="bg-white rounded-3xl shadow-card border border-border p-6 md:p-8">
      {/* QR Payment Modal */}
      {showQRModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShowQRModal(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <Icon name="XMarkIcon" size={16} className="text-foreground" />
            </button>

            {/* Header */}
            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 mx-auto mb-3 flex items-center justify-center">
                <Icon name="QrCodeIcon" size={26} className="text-accent" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-1">Scan to Pay</h3>
              <p className="text-foreground-muted text-sm leading-relaxed">
                Kindly scan the QR to make a payment
              </p>
              {activeAmount > 0 && (
                <div className="mt-2 inline-block bg-primary/10 text-primary font-bold text-base px-4 py-1.5 rounded-full">
                  ₹{activeAmount.toLocaleString('en-IN')}
                  {type === 'monthly' ? '/month' : ''}
                </div>
              )}
            </div>

            {/* QR Code */}
            <div className="bg-primary-light rounded-2xl p-4 mb-4 flex items-center justify-center border border-border">
              <div className="relative w-[200px] h-[200px]">
                <Image
                  src="/assets/images/image-1773668512051.png"
                  alt="Dharmam Charitable Trust UPI QR Code"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>

            {/* UPI ID */}
            <div className="bg-primary-light rounded-xl p-3 mb-4 flex items-center justify-between border border-border">
              <div>
                <div className="text-xs text-foreground-muted font-medium mb-0.5">UPI ID</div>
                <div className="font-display font-bold text-primary text-base">DHARMAM91.09@CMSIDFC</div>
              </div>
              <button
                onClick={() => navigator.clipboard?.writeText('DHARMAM91.09@CMSIDFC')}
                className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white text-primary transition-all"
                aria-label="Copy UPI ID"
              >
                <Icon name="ClipboardDocumentIcon" size={16} />
              </button>
            </div>

            {/* WhatsApp notice */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4">
              <div className="flex items-start gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-green-600 flex-shrink-0 mt-0.5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <p className="text-sm text-green-800 leading-relaxed">
                  After payment, please share the screenshot on{' '}
                  <a href="https://wa.me/919176917626" className="font-semibold underline" target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>{' '}
                  for confirmation.
                </p>
              </div>
            </div>

            {/* UPI Apps */}
            <div className="flex gap-2 justify-center">
              {['Google Pay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                <div
                  key={app}
                  className="flex-1 text-center py-1.5 px-1 bg-gray-50 rounded-lg border border-border text-xs text-foreground-muted font-medium"
                >
                  {app}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
        onClick={() => setShowQRModal(true)}
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