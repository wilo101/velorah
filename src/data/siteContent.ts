/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type StudioProject = {
  slug: string;
  title: string;
  category: string;
  year: string;
  tagline: string;
  overview: string;
  role: string;
  stack: string[];
  highlights: string[];
};

export type JournalArticle = {
  slug: string;
  date: string;
  title: string;
  readTime: string;
  excerpt: string;
  sections: { heading: string; body: string }[];
};

export const studioProjects: StudioProject[] = [
  {
    slug: 'echoes-of-silence',
    title: 'Echoes of Silence',
    category: 'Digital Experience',
    year: '2026',
    tagline: 'An immersive web experience built around restraint, rhythm, and negative space.',
    overview:
      'Echoes of Silence is a flagship narrative site for a boutique audio label. We designed a reading and listening flow that never shouts: typography carries the story, motion hints at tempo, and playback stays one gesture away.',
    role: 'Creative direction, UX, front-end implementation',
    stack: ['React', 'Web Audio', 'Motion', 'Tailwind'],
    highlights: [
      'Reduced time-to-first-listen by 40% versus the previous marketing site.',
      'WCAG-oriented contrast and focus states without losing the midnight aesthetic.',
      'Modular content blocks so the label can ship new releases without a redeploy.',
    ],
  },
  {
    slug: 'lunar-interface',
    title: 'Lunar Interface',
    category: 'Product Design',
    year: '2025',
    tagline: 'Dashboard and workflow UI for teams who plan work in phases, not noise.',
    overview:
      'Lunar Interface is a productivity surface for distributed teams. We reframed “busy” dashboards into calm phases—intake, focus, and review—so managers see signal instead of charts for their own sake.',
    role: 'Product design systems, prototyping, developer handoff',
    stack: ['Figma', 'Tokens', 'React', 'Storybook'],
    highlights: [
      'Introduced a token-based theme so light, dark, and “lunar” modes stay consistent.',
      'Cut reported onboarding confusion in half in two rounds of usability tests.',
      'Shipped a documented component library aligned with engineering constraints.',
    ],
  },
  {
    slug: 'vanguard',
    title: 'Vanguard',
    category: 'Brand Identity',
    year: '2025',
    tagline: 'Identity and digital guidelines for a security startup that preferred precision over hype.',
    overview:
      'Vanguard needed to feel trustworthy without looking like every other cybersecurity gradient. We built a wordmark, motion language, and digital guidelines that privilege clarity, grids, and one accent color.',
    role: 'Brand, motion, website art direction',
    stack: ['Identity', 'Motion', 'Guidelines', 'Next.js marketing'],
    highlights: [
      'Single accent system used consistently across deck, site, and product.',
      'Motion guidelines capped at subtle parallax—no gratuitous particle fields.',
      'Print and digital specs packaged for both agency partners and in-house devs.',
    ],
  },
  {
    slug: 'aura-os',
    title: 'Aura OS',
    category: 'System Architecture',
    year: '2024',
    tagline: 'Information architecture and API shape for a creative OS concept.',
    overview:
      'Aura OS explored how files, sessions, and AI assist could coexist in one calm shell. We modeled entities, events, and permissions so the experience could scale from solo creator to small studio.',
    role: 'IA, API design, narrative prototype',
    stack: ['OpenAPI', 'Event model', 'React prototype'],
    highlights: [
      'Defined entity graph and optimistic UI patterns for multi-device sync.',
      'Prototype validated core flows with five design partners before build.',
      'Documentation became the template for later production services.',
    ],
  },
];

export const journalArticles: JournalArticle[] = [
  {
    slug: 'architecture-of-silence',
    date: 'Mar 14, 2026',
    title: 'The Architecture of Silence',
    readTime: '5 min read',
    excerpt:
      'Silence in digital products is not the absence of sound—it is room for cognition. Here is how we structure layouts and motion to respect that room.',
    sections: [
      {
        heading: 'Why quiet interfaces win',
        body: 'Interfaces compete for attention. The ones that whisper tend to retain users longer because they do not exhaust working memory. We treat silence as spacing: between sections, between state changes, and between the user and the next decision.',
      },
      {
        heading: 'Spacing as a system',
        body: 'We use a small set of vertical rhythms—usually three or four steps—and refuse ad-hoc margins. When every block aligns to the same grid, the interface feels intentional even when almost nothing moves.',
      },
      {
        heading: 'Motion with a ceiling',
        body: 'Motion should answer questions: What changed? Where am I now? We cap durations and avoid choreography that only shows off engineering. If animation does not aid comprehension, it does not ship.',
      },
    ],
  },
  {
    slug: 'designing-for-deep-focus',
    date: 'Feb 28, 2026',
    title: 'Designing for Deep Focus',
    readTime: '8 min read',
    excerpt:
      'Deep work requires predictable surfaces. This note summarizes patterns we reuse when building tools for writers, composers, and engineers.',
    sections: [
      {
        heading: 'Predictable chrome',
        body: 'Toolbars and navigation should not reshape casually. We keep global placement stable and push contextual options into panes that can be hidden. Surprise is for marketing sites, not for focus tools.',
      },
      {
        heading: 'One primary action per view',
        body: 'Each screen gets a single obvious next step. Secondary actions are available but visually quieter. This reduces choice paralysis when someone is mid-flow.',
      },
      {
        heading: 'Respect system affordances',
        body: 'Keyboard shortcuts, focus rings, and OS-level reduced motion settings are not polish—they are requirements. We test tab order as carefully as hover states.',
      },
    ],
  },
  {
    slug: 'typography-as-interface',
    date: 'Jan 12, 2026',
    title: 'Typography as an Interface',
    readTime: '4 min read',
    excerpt:
      'Type hierarchy is navigation. When headings, captions, and body text are disciplined, users scan faster and trust the product more.',
    sections: [
      {
        heading: 'A strict scale',
        body: 'We define display, title, body, and caption sizes up front. Designers do not invent new sizes mid-project unless there is a documented exception. That constraint speeds both design and implementation.',
      },
      {
        heading: 'Pairing with purpose',
        body: 'Serif for voice, sans for utility is a pattern we return to—display faces carry emotion while UI types stay neutral. The pairing should feel inevitable, not decorative.',
      },
    ],
  },
  {
    slug: 'beyond-glassmorphism',
    date: 'Nov 05, 2025',
    title: 'Beyond the Glassmorphism Trend',
    readTime: '6 min read',
    excerpt:
      'Glass effects are easy to mimic and hard to master. We share the constraints we use so “glass” stays readable and accessible.',
    sections: [
      {
        heading: 'Contrast first',
        body: 'Frosted panels must still pass contrast checks against real content behind them—not against a designer’s ideal screenshot. We test on both busy and minimal backplates.',
      },
      {
        heading: 'Blur budget',
        body: 'Heavy blur is expensive and can feel muddy. We limit blur radius and combine it with subtle borders so structure remains visible on low-end hardware.',
      },
      {
        heading: 'When not to use glass',
        body: 'Dense data tables, long-form reading, and critical alerts rarely benefit from translucency. Knowing when to switch to solid surfaces is what keeps the trend from becoming gimmick.',
      },
    ],
  },
];

export function getProjectBySlug(slug: string | undefined): StudioProject | undefined {
  if (!slug) return undefined;
  return studioProjects.find((p) => p.slug === slug);
}

export function getArticleBySlug(slug: string | undefined): JournalArticle | undefined {
  if (!slug) return undefined;
  return journalArticles.find((a) => a.slug === slug);
}
