import { siteMetadata } from './site.config.mjs';

const caseStudy = (slug, heading, title, description) => ({
  slug,
  heading,
  title,
  description,
  canonicalUrl: `${siteMetadata.canonicalUrl}case-studies/${slug}/`,
});

export const caseStudies = {
  aiAssistedQuality: caseStudy(
    'ai-assisted-quality-engineering',
    'AI-assisted quality engineering that made CI feedback faster and more trustworthy',
    'AI-Assisted Quality Engineering Case Study — Saumen Biswas',
    'How Saumen Biswas combined intelligent test selection, reliability signals, and guarded self-healing automation to improve CI feedback and reduce flaky failures.',
  ),
  predictiveMetrics: caseStudy(
    'predictive-engineering-metrics',
    'Engineering intelligence that turned delivery data into earlier decisions',
    'Predictive Engineering Metrics Case Study — Saumen Biswas',
    'How Saumen Biswas designed engineering-quality analytics across 1,000+ repositories and 5,000–8,000 daily pull requests with reliable, decision-ready signals.',
  ),
  globalPayments: caseStudy(
    'global-payments-quality',
    'Quality engineering for high-scale global payment platforms',
    'Global Payments Quality Engineering Case Study — Saumen Biswas',
    'How Saumen Biswas led quality and release engineering for complex global payment initiatives, including Apple Pay, reusable regression intelligence, and continuous validation.',
  ),
};
