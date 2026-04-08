/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useParams,
  Navigate,
} from 'react-router-dom';
import { ArrowLeft, Bookmark, BookmarkCheck, Search } from 'lucide-react';
import { resolveRouterBasename } from './routerBasename';
import { BackgroundVideo } from './components/BackgroundVideo';
import { SiteNav } from './components/SiteNav';
import { ContactForm } from './components/ContactForm';
import { CommandPalette } from './components/CommandPalette';
import { ShareBar } from './components/ShareBar';
import { ReadingProgress } from './components/ReadingProgress';
import { useArticleSaveToggle, useSavedSlugs } from './hooks/useSavedArticles';
import { loadFocusModeFromStorage } from './lib/focusMode';
import {
  getArticleBySlug,
  getProjectBySlug,
  journalArticles,
  studioProjects,
} from './data/siteContent';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Home() {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 min-h-[calc(100vh-88px)]">
      <h1
        className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal animate-fade-rise"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Where <em className="not-italic text-muted-foreground">dreams</em> rise{' '}
        <em className="not-italic text-muted-foreground">through the silence.</em>
      </h1>

      <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
        We&apos;re designing tools for deep thinkers, bold creators, and quiet rebels. Amid the chaos, we build digital
        spaces for sharp focus and inspired work.
      </p>

      <Link
        to="/studio"
        className="liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12 hover:scale-[1.03] cursor-pointer animate-fade-rise-delay-2 inline-block"
      >
        Explore Our Work
      </Link>

      <p className="text-xs text-muted-foreground/90 mt-14 max-w-md animate-fade-rise-delay-2 leading-relaxed">
        <span className="inline-flex items-center gap-1 flex-wrap justify-center">
          Press{' '}
          <kbd className="px-1.5 py-0.5 rounded border border-white/20 font-sans text-[10px]">⌘K</kbd>{' '}
          <span className="hidden sm:inline">or</span>{' '}
          <kbd className="px-1.5 py-0.5 rounded border border-white/20 font-sans text-[10px]">Ctrl+K</kbd>
          — instant search across projects &amp; essays.
        </span>
      </p>
    </main>
  );
}

function StudioList() {
  const categories = useMemo(() => {
    const unique = [...new Set(studioProjects.map((p) => p.category))];
    return ['All', ...unique];
  }, []);
  const [cat, setCat] = useState('All');
  const shown = useMemo(
    () => (cat === 'All' ? studioProjects : studioProjects.filter((p) => p.category === cat)),
    [cat],
  );

  return (
    <main className="relative z-10 px-6 pt-24 pb-40 max-w-7xl mx-auto w-full">
      <h1 className="text-5xl md:text-7xl animate-fade-rise" style={{ fontFamily: 'var(--font-display)' }}>
        Selected Works
      </h1>
      <p className="text-muted-foreground mt-4 max-w-2xl animate-fade-rise-delay">
        Case studies with context, constraints, and outcomes—click a project for the full story.
      </p>

      <div className="flex flex-wrap gap-2 mt-10 animate-fade-rise-delay" role="tablist" aria-label="Filter by category">
        {categories.map((c) => {
          const active = c === cat;
          return (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                active ? 'bg-white/15 text-foreground ring-1 ring-white/20' : 'liquid-glass text-muted-foreground hover:text-foreground'
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 animate-fade-rise-delay">
        {shown.map((p) => (
          <Link
            key={p.slug}
            to={`/studio/${p.slug}`}
            className="liquid-glass p-8 rounded-3xl flex flex-col justify-between aspect-video group cursor-pointer hover:bg-white/5 transition-colors text-left"
          >
            <div className="flex justify-between items-start">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">{p.category}</span>
              <span className="text-xs text-muted-foreground">{p.year}</span>
            </div>
            <div>
              <h3
                className="text-3xl mt-8 group-hover:translate-x-2 transition-transform"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{p.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

function StudioProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);
  if (!project) return <Navigate to="/studio" replace />;

  return (
    <main className="relative z-10 px-6 pt-20 pb-40 max-w-3xl mx-auto w-full">
      <Link
        to="/studio"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
      >
        <ArrowLeft className="w-4 h-4 mr-1" strokeWidth={1.5} />
        Selected Works
      </Link>

      <p className="text-xs uppercase tracking-widest text-muted-foreground animate-fade-rise">
        {project.category} · {project.year}
      </p>
      <h1 className="text-4xl sm:text-6xl md:text-7xl mt-3 animate-fade-rise" style={{ fontFamily: 'var(--font-display)' }}>
        {project.title}
      </h1>
      <p className="text-lg text-muted-foreground mt-6 leading-relaxed animate-fade-rise-delay">{project.tagline}</p>

      <div className="mt-12 space-y-6 text-muted-foreground leading-relaxed animate-fade-rise-delay">
        <p className="text-foreground/90">{project.overview}</p>
        <div className="liquid-glass rounded-2xl p-6 space-y-2">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Role</p>
          <p className="text-foreground/90">{project.role}</p>
        </div>
        <div className="liquid-glass rounded-2xl p-6 space-y-3">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Stack</p>
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tag) => (
              <li key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 text-foreground/90 border border-white/10">
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <div className="liquid-glass rounded-2xl p-6 space-y-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Highlights</p>
          <ul className="list-disc pl-5 space-y-2">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </div>

      <ShareBar label={project.title} />

      <Link
        to="/reach"
        className="liquid-glass inline-block rounded-full px-10 py-4 text-foreground mt-8 hover:scale-[1.03] transition-transform"
      >
        Start a similar project
      </Link>
    </main>
  );
}

function About() {
  return (
    <main className="relative z-10 px-6 pt-24 pb-40 max-w-4xl mx-auto w-full text-center">
      <h1 className="text-5xl md:text-7xl animate-fade-rise" style={{ fontFamily: 'var(--font-display)' }}>
        The Quiet Rebels
      </h1>

      <div className="mt-16 space-y-8 text-lg text-muted-foreground leading-relaxed animate-fade-rise-delay text-left md:text-center max-w-2xl mx-auto">
        <p>
          Velorah was born from a simple observation: the digital world has become too loud. We are a collective of
          designers, engineers, and artists who believe in the power of silence.
        </p>
        <p>
          We craft experiences that don&apos;t demand attention, but rather invite immersion. Our tools are built for
          those who seek depth over breadth, quality over quantity, and resonance over reach.
        </p>
      </div>

      <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-rise-delay-2 border-t border-white/10 pt-16">
        {[
          { label: 'Founded', value: '2024' },
          { label: 'Location', value: 'Global' },
          { label: 'Projects', value: `${studioProjects.length}+` },
          { label: 'Journal', value: `${journalArticles.length}` },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center">
            <span className="text-4xl text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              {stat.value}
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-widest mt-2">{stat.label}</span>
          </div>
        ))}
      </div>
    </main>
  );
}

function JournalList() {
  const [query, setQuery] = useState('');
  const [savedOnly, setSavedOnly] = useState(false);
  const savedSlugs = useSavedSlugs();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return journalArticles.filter((a) => {
      if (savedOnly && !savedSlugs.includes(a.slug)) return false;
      if (!q) return true;
      return a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q);
    });
  }, [query, savedOnly, savedSlugs]);

  return (
    <main className="relative z-10 px-6 pt-24 pb-40 max-w-4xl mx-auto w-full">
      <h1 className="text-5xl md:text-7xl animate-fade-rise" style={{ fontFamily: 'var(--font-display)' }}>
        Thoughts &amp; Echoes
      </h1>
      <p className="text-muted-foreground mt-4 animate-fade-rise-delay">Long-form notes on quiet interfaces and studio practice.</p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-rise-delay">
        <div className="liquid-glass rounded-2xl flex items-center gap-3 px-4 py-3 flex-1">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles & excerpts…"
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm"
            aria-label="Search journal"
          />
        </div>
        <button
          type="button"
          onClick={() => setSavedOnly((v) => !v)}
          className={`liquid-glass rounded-2xl px-5 py-3 text-sm flex items-center justify-center gap-2 transition-colors ${
            savedOnly ? 'text-foreground ring-1 ring-white/25' : 'text-muted-foreground hover:text-foreground'
          }`}
          aria-pressed={savedOnly}
        >
          {savedOnly ? <BookmarkCheck className="w-4 h-4" strokeWidth={1.5} /> : <Bookmark className="w-4 h-4" strokeWidth={1.5} />}
          Saved{savedSlugs.length > 0 ? ` (${savedSlugs.length})` : ''}
        </button>
      </div>

      <div className="mt-16 flex flex-col animate-fade-rise-delay">
        {filtered.length === 0 ? (
          <p className="text-muted-foreground py-16 text-center border border-white/10 rounded-2xl liquid-glass">
            {savedOnly ? 'No saved pieces yet — open an article and tap Save for later.' : 'No articles match your search.'}
          </p>
        ) : (
          filtered.map((a) => (
            <Link
              key={a.slug}
              to={`/journal/${a.slug}`}
              className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-white/10 cursor-pointer hover:border-white/30 transition-colors text-left"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
                <span className="text-sm text-muted-foreground w-32 shrink-0">{a.date}</span>
                <div>
                  <h2
                    className="text-2xl md:text-3xl text-foreground group-hover:translate-x-2 transition-transform"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {a.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2 max-w-xl">{a.excerpt}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground mt-4 md:mt-0 uppercase tracking-widest shrink-0">{a.readTime}</span>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}

function JournalArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug);
  const { saved, toggle } = useArticleSaveToggle(slug ?? '');
  if (!article || !slug) return <Navigate to="/journal" replace />;

  return (
    <>
      <ReadingProgress />
      <article className="relative z-10 px-6 pt-20 pb-40 max-w-3xl mx-auto w-full">
        <Link
          to="/journal"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4 mr-1" strokeWidth={1.5} />
          Journal
        </Link>

        <p className="text-sm text-muted-foreground">
          {article.date} · {article.readTime}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mt-3">
          <h1 className="text-4xl sm:text-6xl md:text-7xl flex-1" style={{ fontFamily: 'var(--font-display)' }}>
            {article.title}
          </h1>
          <button
            type="button"
            onClick={toggle}
            className={`shrink-0 liquid-glass rounded-full px-5 py-2.5 text-sm inline-flex items-center gap-2 ${
              saved ? 'text-foreground ring-1 ring-white/25' : 'text-muted-foreground hover:text-foreground'
            }`}
            aria-pressed={saved}
          >
            {saved ? <BookmarkCheck className="w-4 h-4" strokeWidth={1.5} /> : <Bookmark className="w-4 h-4" strokeWidth={1.5} />}
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>
        <p className="text-lg text-muted-foreground mt-6 leading-relaxed">{article.excerpt}</p>

        <div className="mt-14 space-y-12 text-muted-foreground leading-relaxed">
          {article.sections.map((sec) => (
            <section key={sec.heading}>
              <h2 className="text-xl text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                {sec.heading}
              </h2>
              <p>{sec.body}</p>
            </section>
          ))}
        </div>

        <ShareBar label={article.title} />
      </article>
    </>
  );
}

function ReachUs() {
  return (
    <main className="relative z-10 px-6 pt-24 pb-40 max-w-2xl mx-auto w-full text-center">
      <h1 className="text-5xl md:text-7xl animate-fade-rise" style={{ fontFamily: 'var(--font-display)' }}>
        Initiate Contact
      </h1>
      <p className="text-muted-foreground mt-6 animate-fade-rise-delay">
        Whether you have a project in mind or just want to share a thought, we&apos;re here to listen.
      </p>
      <div className="mt-12">
        <ContactForm />
      </div>
    </main>
  );
}

function NotFound() {
  return (
    <main className="relative z-10 px-6 pt-32 pb-40 max-w-lg mx-auto w-full text-center">
      <h1 className="text-5xl md:text-6xl" style={{ fontFamily: 'var(--font-display)' }}>
        Lost in the quiet
      </h1>
      <p className="text-muted-foreground mt-6">This page doesn&apos;t exist. The silence is intentional—but yours need not be.</p>
      <Link to="/" className="liquid-glass inline-block rounded-full px-10 py-4 mt-10 text-foreground hover:scale-[1.03] transition-transform">
        Return home
      </Link>
    </main>
  );
}

function AppShell() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useLayoutEffect(() => {
    loadFocusModeFromStorage();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <ScrollToTop />
      <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground font-sans">
        <BackgroundVideo />
        <div className="velorah-scrim fixed inset-0 bg-background/40 z-0 backdrop-blur-[2px]" aria-hidden />
        <SiteNav onOpenSearch={() => setPaletteOpen(true)} />
        <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studio" element={<StudioList />} />
          <Route path="/studio/:slug" element={<StudioProjectPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/journal" element={<JournalList />} />
          <Route path="/journal/:slug" element={<JournalArticlePage />} />
          <Route path="/reach" element={<ReachUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router basename={resolveRouterBasename()}>
      <AppShell />
    </Router>
  );
}
