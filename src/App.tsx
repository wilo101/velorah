/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Nav() {
  const location = useLocation();
  const links = [
    { path: '/', label: 'Home' },
    { path: '/studio', label: 'Studio' },
    { path: '/about', label: 'About' },
    { path: '/journal', label: 'Journal' },
    { path: '/reach', label: 'Reach Us' },
  ];

  return (
    <nav className="relative z-20 flex flex-row items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
      <Link to="/" className="text-3xl tracking-tight text-foreground" style={{ fontFamily: "var(--font-display)" }}>
        Velorah<sup className="text-xs">®</sup>
      </Link>
      
      <div className="hidden md:flex items-center gap-8">
        {links.map(link => (
          <Link 
            key={link.path} 
            to={link.path} 
            className={`text-sm transition-colors ${
              location.pathname === link.path 
                ? 'text-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <Link to="/reach" className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] cursor-pointer hidden md:inline-block">
        Begin Journey
      </Link>
    </nav>
  );
}

function Home() {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 min-h-[calc(100vh-88px)]">
      <h1 
        className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal animate-fade-rise"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Where <em className="not-italic text-muted-foreground">dreams</em> rise <em className="not-italic text-muted-foreground">through the silence.</em>
      </h1>
      
      <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
        We're designing tools for deep thinkers, bold creators, and quiet rebels. Amid the chaos, we build digital spaces for sharp focus and inspired work.
      </p>
      
      <Link to="/studio" className="liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12 hover:scale-[1.03] cursor-pointer animate-fade-rise-delay-2 inline-block">
        Explore Our Work
      </Link>
    </main>
  );
}

function Studio() {
  const projects = [
    { title: 'Echoes of Silence', category: 'Digital Experience', year: '2026' },
    { title: 'Lunar Interface', category: 'Product Design', year: '2025' },
    { title: 'Vanguard', category: 'Brand Identity', year: '2025' },
    { title: 'Aura OS', category: 'System Architecture', year: '2024' },
  ];

  return (
    <main className="relative z-10 px-6 pt-24 pb-40 max-w-7xl mx-auto w-full">
      <h1 className="text-5xl md:text-7xl animate-fade-rise" style={{ fontFamily: "var(--font-display)" }}>Selected Works</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 animate-fade-rise-delay">
        {projects.map((p, i) => (
          <div key={i} className="liquid-glass p-8 rounded-3xl flex flex-col justify-between aspect-video group cursor-pointer hover:bg-white/5 transition-colors">
            <div className="flex justify-between items-start">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">{p.category}</span>
              <span className="text-xs text-muted-foreground">{p.year}</span>
            </div>
            <h3 className="text-3xl mt-8 group-hover:translate-x-2 transition-transform" style={{ fontFamily: "var(--font-display)" }}>{p.title}</h3>
          </div>
        ))}
      </div>
    </main>
  );
}

function About() {
  return (
    <main className="relative z-10 px-6 pt-24 pb-40 max-w-4xl mx-auto w-full text-center">
      <h1 className="text-5xl md:text-7xl animate-fade-rise" style={{ fontFamily: "var(--font-display)" }}>The Quiet Rebels</h1>
      
      <div className="mt-16 space-y-8 text-lg text-muted-foreground leading-relaxed animate-fade-rise-delay text-left md:text-center max-w-2xl mx-auto">
        <p>
          Velorah was born from a simple observation: the digital world has become too loud. We are a collective of designers, engineers, and artists who believe in the power of silence.
        </p>
        <p>
          We craft experiences that don't demand attention, but rather invite immersion. Our tools are built for those who seek depth over breadth, quality over quantity, and resonance over reach.
        </p>
      </div>

      <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-rise-delay-2 border-t border-white/10 pt-16">
        {[
          { label: 'Founded', value: '2024' },
          { label: 'Location', value: 'Global' },
          { label: 'Projects', value: '42+' },
          { label: 'Awards', value: '12' },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-4xl text-foreground" style={{ fontFamily: "var(--font-display)" }}>{stat.value}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-widest mt-2">{stat.label}</span>
          </div>
        ))}
      </div>
    </main>
  );
}

function Journal() {
  const articles = [
    { date: 'Mar 14, 2026', title: 'The Architecture of Silence', readTime: '5 min read' },
    { date: 'Feb 28, 2026', title: 'Designing for Deep Focus', readTime: '8 min read' },
    { date: 'Jan 12, 2026', title: 'Typography as an Interface', readTime: '4 min read' },
    { date: 'Nov 05, 2025', title: 'Beyond the Glassmorphism Trend', readTime: '6 min read' },
  ];

  return (
    <main className="relative z-10 px-6 pt-24 pb-40 max-w-4xl mx-auto w-full">
      <h1 className="text-5xl md:text-7xl animate-fade-rise" style={{ fontFamily: "var(--font-display)" }}>Thoughts & Echoes</h1>
      <div className="mt-16 flex flex-col animate-fade-rise-delay">
        {articles.map((a, i) => (
          <div key={i} className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-white/10 cursor-pointer hover:border-white/30 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
              <span className="text-sm text-muted-foreground w-32">{a.date}</span>
              <h3 className="text-2xl md:text-3xl text-foreground group-hover:translate-x-2 transition-transform" style={{ fontFamily: "var(--font-display)" }}>{a.title}</h3>
            </div>
            <span className="text-xs text-muted-foreground mt-4 md:mt-0 uppercase tracking-widest">{a.readTime}</span>
          </div>
        ))}
      </div>
    </main>
  );
}

function ReachUs() {
  return (
    <main className="relative z-10 px-6 pt-24 pb-40 max-w-2xl mx-auto w-full text-center">
      <h1 className="text-5xl md:text-7xl animate-fade-rise" style={{ fontFamily: "var(--font-display)" }}>Initiate Contact</h1>
      <p className="text-muted-foreground mt-6 animate-fade-rise-delay">Whether you have a project in mind or just want to share a thought, we're here to listen.</p>
      
      <form className="mt-16 flex flex-col gap-6 animate-fade-rise-delay-2 text-left" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground ml-4">Name</label>
            <input type="text" className="liquid-glass w-full px-6 py-4 rounded-2xl text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-white/30 transition-all" placeholder="Jane Doe" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-muted-foreground ml-4">Email</label>
            <input type="email" className="liquid-glass w-full px-6 py-4 rounded-2xl text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-white/30 transition-all" placeholder="jane@example.com" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-muted-foreground ml-4">Message</label>
          <textarea rows={5} className="liquid-glass w-full px-6 py-4 rounded-2xl text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-white/30 transition-all resize-none" placeholder="Tell us about your vision..."></textarea>
        </div>
        <button className="liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-4 hover:scale-[1.03] cursor-pointer w-full md:w-auto self-center">
          Send Message
        </button>
      </form>
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground font-sans">
        {/* Global Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-full h-full object-cover z-0 opacity-60"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
            type="video/mp4"
          />
        </video>
        
        {/* Overlay to ensure text readability on all pages */}
        <div className="fixed inset-0 bg-background/40 z-0 backdrop-blur-[2px]"></div>

        <Nav />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/about" element={<About />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/reach" element={<ReachUs />} />
        </Routes>
      </div>
    </Router>
  );
}
