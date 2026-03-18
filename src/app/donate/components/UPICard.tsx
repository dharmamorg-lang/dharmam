'use client';
import React from 'react';
import Icon from '@/components/ui/AppIcon';
import Image from 'next/image';

const UPI_ID = 'DHARMAM91.09@CMSIDFC';

export default function UPICard() {
  return (
    <div className="qr-card p-6 md:p-8 sticky top-24">
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-2xl bg-accent/10 mx-auto mb-3 flex items-center justify-center">
          <Icon name="QrCodeIcon" size={26} className="text-accent" />
        </div>
        <h3 className="font-display font-bold text-xl text-foreground mb-1">Donate via UPI QR</h3>
        <p className="text-foreground-muted text-sm leading-relaxed">
          Scan the QR code using any UPI app<br />
          <span className="font-medium">(Google Pay, PhonePe, Paytm, BHIM)</span>
        </p>
      </div>
      {/* QR Code Image */}
      <div className="bg-primary-light rounded-2xl p-4 mb-4 flex items-center justify-center border border-border">
        <div className="relative w-[180px] h-[180px]">
          <Image
            src="/assets/images/image-1773668512051.png"
            alt="Dharmam Charitable Trust UPI QR Code for DHARMAM91.09@CMSIDFC"
            fill
            className="object-contain rounded-lg"
          />
        </div>
      </div>
      {/* UPI ID */}
      <div className="bg-primary-light rounded-xl p-3 mb-4 flex items-center justify-between border border-border">
        <div>
          <div className="text-xs text-foreground-muted font-medium mb-0.5">UPI ID</div>
          <div className="font-display font-bold text-primary text-base">{UPI_ID}</div>
        </div>
        <button
          onClick={() => navigator.clipboard?.writeText(UPI_ID)}
          className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white text-primary transition-all"
          aria-label="Copy UPI ID"
        >
          <Icon name="ClipboardDocumentIcon" size={16} />
        </button>
      </div>
      {/* UPI Apps */}
      <div className="flex gap-2 justify-center mb-4">
        {['Google Pay', 'PhonePe', 'Paytm', 'BHIM']?.map((app) => (
          <div
            key={app}
            className="flex-1 text-center py-1.5 px-1 bg-white rounded-lg border border-border text-xs text-foreground-muted font-medium"
          >
            {app}
          </div>
        ))}
      </div>
      {/* Notice */}
      <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
        <div className="flex items-start gap-2">
          <Icon name="InformationCircleIcon" size={18} className="text-accent flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground-muted leading-relaxed">
            After completing the payment, please share the transaction screenshot via{' '}
            <a href="https://wa.me/919176917626" className="text-primary font-semibold hover:underline">WhatsApp</a>{' '}
            or{' '}
            <a href="mailto:founder@dharmam.org" className="text-primary font-semibold hover:underline">email</a>{' '}
            for confirmation.
          </p>
        </div>
      </div>
      {/* Contact */}
      <div className="mt-4 text-center">
        <p className="text-xs text-foreground-muted">
          Questions?{' '}
          <a href="tel:+919176917626" className="text-primary font-semibold hover:underline">
            +91 9176 9176 26
          </a>
        </p>
      </div>
    </div>
  );
}