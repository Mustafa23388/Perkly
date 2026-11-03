import { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  CircleHelp,
  CreditCard,
  Gift,
  Leaf,
  Menu,
  Search,
  Sparkles,
  Ticket,
  Truck,
  X,
} from 'lucide-react';

type Reward = { title: string; detail: string; points: string; tone: 'cream' | 'mint' | 'lavender'; icon: 'coffee' | 'voucher' | 'tote' };
type Transaction = { merchant: string; date: string; detail: string; points: string; kind: 'earned' | 'redeemed'; icon: 'coffee' | 'bag' | 'market' | 'voucher' | 'bonus' };

const rewards: Reward[] = [
  { title: 'Free Coffee', detail: 'Your next little ritual', points: '400', tone: 'cream', icon: 'coffee' },
  { title: '$10 Voucher', detail: 'Spend it on something good', points: '1,000', tone: 'mint', icon: 'voucher' },
  { title: 'Linen Tote', detail: 'Carry good things with you', points: '1,800', tone: 'lavender', icon: 'tote' },
];
const offers = [
  { eyebrow: 'MEMBER EXCLUSIVE', value: '2×', title: 'points on all drinks', merchant: 'Bloom Cafe', ends: 'ends in 2d', tone: 'coffee' },
  { eyebrow: 'JUST FOR YOU', value: '20%', title: 'off your next order', merchant: 'Nordic Outfitters', ends: 'ends Sunday', tone: 'knit' },
  { eyebrow: 'ONLINE ONLY', value: 'Free ship', title: 'on any order', merchant: 'Perkly Market', ends: 'ends in 3d', tone: 'boxes' },
];
const transactions: Transaction[] = [
  { merchant: 'Bloom Cafe', date: 'Today, 9:42 AM', detail: 'Morning coffee', points: '+120', kind: 'earned', icon: 'coffee' },
  { merchant: 'Nordic Outfitters', date: 'Yesterday, 4:18 PM', detail: 'Everyday essentials', points: '+640', kind: 'earned', icon: 'bag' },
  { merchant: 'Perkly Market', date: 'May 18, 12:06 PM', detail: 'Household favorites', points: '+285', kind: 'earned', icon: 'market' },
  { merchant: 'Perkly Rewards', date: 'May 15, 8:30 AM', detail: 'Free Coffee reward', points: '−400', kind: 'redeemed', icon: 'voucher' },
  { merchant: 'Gold member bonus', date: 'May 01, 12:00 AM', detail: 'Monthly tier bonus', points: '+250', kind: 'earned', icon: 'bonus' },
];

function OfferArt({ tone }: { tone: string }) {
  if (tone === 'coffee') return <div className="offer-art coffee-art"><div className="coffee-cup"><span /></div></div>;
  if (tone === 'knit') return <div className="offer-art knit-art"><span className="hanger" /><span className="sweater" /></div>;
  return <div className="offer-art boxes-art"><span /><span /><span /></div>;
}
function RewardIcon({ icon }: { icon: Reward['icon'] }) {
  if (icon === 'coffee') return <div className="reward-visual coffee-small"><span /></div>;
  if (icon === 'voucher') return <div className="reward-visual voucher-small">Perkly</div>;
  return <div className="reward-visual tote-small"><span>Perkly</span></div>;
}
function TransactionIcon({ icon }: { icon: Transaction['icon'] }) {
  const Icon = icon === 'coffee' ? CoffeeIcon : icon === 'bag' ? BagIcon : icon === 'market' ? MarketIcon : icon === 'voucher' ? Ticket : Sparkles;
  return <span className={`transaction-icon transaction-${icon}`}><Icon size={18} strokeWidth={1.7} /></span>;
}
function CoffeeIcon({ size, strokeWidth }: { size?: number; strokeWidth?: number }) { return <span className="tiny-cup" style={{ width: size, height: size, borderWidth: strokeWidth }} />; }
function BagIcon({ size, strokeWidth }: { size?: number; strokeWidth?: number }) { return <span className="tiny-bag" style={{ width: size, height: size, borderWidth: strokeWidth }} />; }
function MarketIcon({ size, strokeWidth }: { size?: number; strokeWidth?: number }) { return <span className="tiny-market" style={{ width: size, height: size, borderWidth: strokeWidth }} />; }

function Dashboard({ onNavigate, redeem }: { onNavigate: (tab: string) => void; redeem: (title: string) => void }) {
  return <>
    <section className="hero-grid">
      <div className="points-panel"><p className="mono-label">GOOD EVENING, MAYA</p><div className="points-value">2,480</div><p className="points-caption">points, <strong>320 from Platinum</strong></p><div className="tier-track" aria-label="Membership progress from Bronze to Platinum"><div className="track-line"><span /></div>{['Bronze', 'Silver', 'Gold', 'Platinum'].map((tier) => <div key={tier} className={`tier ${tier === 'Gold' ? 'current' : ''}`}><span className="tier-dot" /><small>{tier}</small></div>)}</div><div className="points-footer"><span><Sparkles size={15} /> 70 points earned this month</span><button onClick={() => onNavigate('Activity')}>View activity <ArrowRight size={15} /></button></div></div>
      <div className="statement-card"><div className="statement-copy"><p className="mono-label">PERKLY MEMBERS</p><h1>Good things<br />reward people<br />like you.</h1><p className="statement-subtitle">EXCLUSIVE OFFERS. BRIGHTER DAYS.</p><div className="scribble" /></div><div className="paper-ticket"><div className="ticket-brand">Perkly</div><p>MEMBERS<br />MAKE A MORE<br />REWARDING<br />TOMORROW</p><div className="stamp"><span>GOOD</span><span>THINGS</span><span>AHEAD</span></div><small>EST. 2023</small></div></div>
    </section>
    <section className="offers-section"><div className="offers-heading"><div><p className="mono-label">CURATED FOR YOU</p><h2>Small surprises.<br /><em>Big everyday energy.</em></h2></div><button className="text-link" onClick={() => onNavigate('Rewards')}>See all offers <ArrowRight size={16} /></button></div><div className="offer-grid">{offers.map((offer) => <article className="offer-ticket" key={offer.merchant}><OfferArt tone={offer.tone} /><div className="offer-details"><p className="mono-label">{offer.eyebrow}</p><h3><strong>{offer.value}</strong> {offer.title}</h3><p className="merchant">{offer.merchant} <span>—</span> {offer.ends}</p></div><div className="offer-aside"><span>{offer.tone === 'coffee' ? <Leaf size={20} /> : offer.tone === 'knit' ? <Sparkles size={20} /> : <Truck size={20} />}</span><small>GOOD<br />THINGS<br />AHEAD</small></div></article>)}</div></section>
    <section className="rewards-section"><div className="rewards-intro"><p className="mono-label">REDEEM YOUR POINTS</p><h2>Little rewards.<br /><em>A brighter you.</em></h2><p>Turn your points into everyday moments you&apos;ll love.</p><button className="dark-link" onClick={() => onNavigate('Rewards')}>Explore marketplace <ArrowRight size={16} /></button></div><div className="reward-list">{rewards.map((reward) => <div className="reward-row" key={reward.title}><RewardIcon icon={reward.icon} /><div className="reward-name"><strong>{reward.title}</strong><span>{reward.detail}</span></div><div className="dotted-line" /><strong className="reward-points">{reward.points}</strong><button className="redeem-link" onClick={() => redeem(reward.title)}>Redeem <ArrowRight size={16} /></button></div>)}</div></section>
    <section className="member-strip"><div className="strip-icon"><CreditCard size={23} /></div><div><p className="mono-label">YOUR DIGITAL MEMBERSHIP</p><h3>Always have your perks close.</h3></div><p className="strip-detail">Show your membership card in-store to earn points and unlock your Gold benefits.</p><button className="strip-button" onClick={() => onNavigate('Card')}>Open card <ArrowRight size={16} /></button></section>
  </>;
}

function ActivityPage() {
  const [filter, setFilter] = useState<'All activity' | 'Earned' | 'Redeemed'>('All activity');
  const filteredTransactions = transactions.filter((item) => filter === 'All activity' || item.kind === filter.toLowerCase());
  return <section className="activity-page"><div className="page-heading"><div><p className="mono-label">YOUR PERKLY JOURNEY</p><h1>Every point has<br /><em>a story.</em></h1><p>See what you&apos;ve earned, redeemed, and unlocked along the way.</p></div><div className="activity-total"><span>Current balance</span><strong>2,480</strong><small>points</small></div></div><div className="activity-toolbar"><div className="activity-tabs">{(['All activity', 'Earned', 'Redeemed'] as const).map((item) => <button key={item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div><button className="download-button"><ArrowRight size={15} /> Export history</button></div><div className="activity-card"><div className="activity-card-header"><span>ACTIVITY</span><span>POINTS</span></div>{filteredTransactions.map((item) => <div className="transaction-row" key={`${item.merchant}-${item.date}`}><TransactionIcon icon={item.icon} /><div className="transaction-copy"><strong>{item.merchant}</strong><span>{item.detail} <i>·</i> {item.date}</span></div><span className={`transaction-points ${item.kind}`}>{item.points}</span></div>)}{filteredTransactions.length === 0 && <div className="empty-activity">There&apos;s nothing here yet.</div>}</div><div className="activity-note"><Sparkles size={17} /><span>You&apos;re <strong>320 points</strong> away from Platinum. Keep going, Maya.</span><button>See tier benefits <ArrowRight size={15} /></button></div></section>;
}

function App() {
  const [activeTab, setActiveTab] = useState('For you');
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redeemed, setRedeemed] = useState<string | null>(null);
  const navigate = (tab: string) => { if (tab === activeTab) return; setLoading(true); setMobileMenuOpen(false); window.setTimeout(() => { setActiveTab(tab); setLoading(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }, 450); };
  const redeem = (title: string) => { setRedeemed(title); window.setTimeout(() => setRedeemed(null), 3200); };
  const navItems = [{ label: 'For you', icon: Gift }, { label: 'Rewards', icon: Ticket }, { label: 'Card', icon: CreditCard }, { label: 'Activity', icon: BarChart3 }];
  return <div className="app-shell">
    <header className="topbar"><button className="wordmark" onClick={() => navigate('For you')}>Perkly</button><nav className="main-nav" aria-label="Main navigation">{navItems.map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${activeTab === label ? 'active' : ''}`} onClick={() => navigate(label)}><Icon size={18} strokeWidth={1.8} /><span>{label}</span></button>)}</nav><div className="header-actions"><button className="icon-button" aria-label="Search" onClick={() => setRedeemed('Search is coming soon')}><Search size={20} /></button><button className="profile-button" onClick={() => setMenuOpen(!menuOpen)}><span className="avatar">M</span><span className="profile-name">Maya</span><ChevronDown size={16} /></button>{menuOpen && <div className="profile-menu"><strong>Maya Chen</strong><span>Gold member</span><button onClick={() => setMenuOpen(false)}>Close menu</button></div>}</div><button className="mobile-menu" aria-label="Open menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}><Menu size={22} /></button>{mobileMenuOpen && <nav className="mobile-nav">{navItems.map(({ label, icon: Icon }) => <button key={label} onClick={() => navigate(label)} className={activeTab === label ? 'active' : ''}><Icon size={17} />{label}</button>)}</nav>}</header>
    {loading && <div className="page-loader" role="status" aria-label="Loading page"><div className="loader-orbit"><span className="orbit-dot dot-one" /><span className="orbit-dot dot-two" /><span className="orbit-dot dot-three" /><Gift size={19} /></div><div className="loader-copy"><strong>Good things loading</strong><span>Gathering your perks <i>...</i></span><div className="loader-bar"><span /></div></div><div className="loader-ticket-shape">+320</div></div>}
    <main id="top" className={loading ? 'is-loading' : ''}>{activeTab === 'Activity' ? <ActivityPage /> : <Dashboard onNavigate={navigate} redeem={redeem} />}</main>
    <footer><span>© 2024 Perkly</span><span>Good things ahead.</span><button aria-label="Help"><CircleHelp size={18} /></button></footer>
    {redeemed && <div className="toast"><span className="toast-check"><Check size={16} /></span><div><strong>{redeemed}</strong><span>{redeemed === 'Search is coming soon' ? 'We are polishing this for you.' : 'Find it in your rewards wallet.'}</span></div><button onClick={() => setRedeemed(null)} aria-label="Dismiss"><X size={16} /></button></div>}
  </div>;
}
export default App;
