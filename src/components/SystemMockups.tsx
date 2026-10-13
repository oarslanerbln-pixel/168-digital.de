import { Check, CalendarDays, Bell, MessageCircle, Mail, UserPlus, Globe, Zap } from 'lucide-react';
import type { MockCopy, SolutionId } from '../data/homeContent';
import './SystemMockups.css';

/* ════════════════════════════════════════════════════════════════
   SYSTEM MOCKUPS — illustrative product UI, drawn in HTML/CSS.

   A business owner decides faster when they can *see* the thing they
   would be buying: a booking calendar, a QR menu on a phone, a
   dashboard. These mockups do that without a single image request:
   no screenshots to optimise, nothing loaded from another domain
   (DSGVO rule 1), crisp at every pixel density, and every label comes
   from homeContent.ts, so they speak the visitor's language.

   They are decoration for sighted visitors — the same facts are in the
   copy next to them — so each one is hidden from assistive technology.
   Colours come only from the :root tokens; the one accent is the
   functional blue, never the hero's gold.
   ════════════════════════════════════════════════════════════════ */

const BOOKINGS = [
  { time: '18:00', name: 'Schneider', guests: 2, isNew: false },
  { time: '19:00', name: 'Yılmaz', guests: 6, isNew: false },
  { time: '19:30', name: 'Nguyen', guests: 4, isNew: true },
  { time: '20:15', name: 'Okafor', guests: 3, isNew: false },
];

// Relative heights for the dashboard's week chart — shape only, no data.
const BARS = [42, 58, 50, 72, 64, 88, 76];

export function BrowserFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="mock-browser">
      <div className="mock-browser-bar">
        <span className="mock-dots"><i /><i /><i /></span>
        <span className="mock-url">{url}</span>
      </div>
      <div className="mock-browser-body">{children}</div>
    </div>
  );
}

export function PhoneFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mock-phone ${className}`}>
      <span className="mock-phone-notch" />
      <div className="mock-phone-screen">{children}</div>
    </div>
  );
}

function BookingMock({ m }: { m: MockCopy }) {
  return (
    <div className="mock-booking">
      <div className="mock-head">
        <span className="mock-head-title"><CalendarDays size={14} /> {m.bookingTitle}</span>
        <span className="mock-pill">{m.today}</span>
      </div>
      <ul className="mock-list">
        {BOOKINGS.map((b) => (
          <li key={b.time} className={b.isNew ? 'is-new' : ''}>
            <span className="mock-time">{b.time}</span>
            <span className="mock-name">{b.name}</span>
            <span className="mock-meta">{b.guests} {m.guests}</span>
            <span className={`mock-status ${b.isNew ? 'mock-status-new' : ''}`}>
              {b.isNew ? m.newBadge : <><Check size={11} /> {m.confirmed}</>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OrderingMock({ m }: { m: MockCopy }) {
  return (
    <div className="mock-menu">
      <div className="mock-menu-hero">
        <span className="mock-menu-brand">Café Mitte</span>
        <span className="mock-menu-table">{m.table}</span>
      </div>
      <div className="mock-tabs">
        {m.menuTabs.map((tab, i) => (
          <span key={tab} className={i === 1 ? 'is-active' : ''}>{tab}</span>
        ))}
      </div>
      <ul className="mock-menu-items">
        {m.menuItems.map((item, i) => (
          <li key={item.name}>
            <span className={`mock-thumb mock-thumb-${i}`} />
            <span className="mock-item-name">{item.name}</span>
            <span className="mock-item-price">{item.price}</span>
          </li>
        ))}
      </ul>
      <span className="mock-order-btn">{m.orderButton}</span>
    </div>
  );
}

function DashboardMock({ m }: { m: MockCopy }) {
  return (
    <div className="mock-dash">
      <aside className="mock-dash-nav">
        <span className="mock-logo">16</span>
        <i className="is-active" /><i /><i /><i />
      </aside>
      <div className="mock-dash-main">
        <div className="mock-head">
          <span className="mock-head-title">{m.dashTitle}</span>
          <span className="mock-avatar" />
        </div>
        <div className="mock-kpis">
          {m.kpis.map((k) => (
            <div key={k.label} className="mock-kpi">
              <span className="mock-kpi-label">{k.label}</span>
              <span className="mock-kpi-value">{k.value}</span>
            </div>
          ))}
        </div>
        <div className="mock-chart">
          {BARS.map((h, i) => (
            <span key={i} style={{ height: `${h}%` }} className={i === 5 ? 'is-peak' : ''} />
          ))}
        </div>
        <div className="mock-recent">
          <span className="mock-recent-title">{m.recent}</span>
          {m.recentItems.map((r) => (
            <span key={r} className="mock-recent-row"><i />{r}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

const FLOW_ICONS = [Globe, UserPlus, MessageCircle, Mail];

function AutomationMock({ m }: { m: MockCopy }) {
  return (
    <div className="mock-flow">
      {m.flowSteps.map((step, i) => {
        const Icon = FLOW_ICONS[i];
        return (
          <div key={step} className="mock-flow-step">
            <span className="mock-flow-icon"><Icon size={15} /></span>
            <span className="mock-flow-label">{step}</span>
            <Check size={14} className="mock-flow-check" />
          </div>
        );
      })}
      <span className="mock-flow-foot"><Zap size={13} /> {m.flowFoot}</span>
    </div>
  );
}

/** One mockup per solution card on the homepage. */
export function SolutionMockup({ id, m }: { id: SolutionId; m: MockCopy }) {
  let body: React.ReactNode;
  switch (id) {
    case 'booking':
      body = <BrowserFrame url={m.urlBooking}><BookingMock m={m} /></BrowserFrame>;
      break;
    case 'ordering':
      body = <PhoneFrame className="mock-phone-solo"><OrderingMock m={m} /></PhoneFrame>;
      break;
    case 'dashboard':
      body = <BrowserFrame url={m.urlPortal}><DashboardMock m={m} /></BrowserFrame>;
      break;
    case 'automation':
      body = <AutomationMock m={m} />;
      break;
  }
  return <div className={`mock-stage mock-stage-${id}`} aria-hidden="true">{body}</div>;
}

/**
 * The hero composition: a dashboard in a browser, the guest-facing menu
 * on a phone in front of it, and a booking notification — three of the
 * four systems in one picture, so the first screen already answers
 * "what would I actually get?".
 */
export function HeroMockup({ m }: { m: MockCopy }) {
  return (
    <div className="mock-hero" aria-hidden="true">
      <BrowserFrame url={m.urlPortal}><DashboardMock m={m} /></BrowserFrame>
      <PhoneFrame className="mock-hero-phone"><OrderingMock m={m} /></PhoneFrame>
      <div className="mock-toast">
        <span className="mock-toast-icon"><Bell size={14} /></span>
        <span>
          <strong>{m.toastTitle}</strong>
          <em>{m.toastBody}</em>
        </span>
      </div>
    </div>
  );
}
