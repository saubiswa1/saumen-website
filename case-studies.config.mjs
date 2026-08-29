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
    'AI-Assisted CI Quality: 60% Faster Feedback — Case Study',
    'See how Saumen Biswas used intelligent test selection, reliability scoring, and guarded self-healing to cut CI feedback time by 60% and reduce flaky failures.',
  ),
  predictiveMetrics: caseStudy(
    'predictive-engineering-metrics',
    'Engineering intelligence that turned delivery data into earlier decisions',
    'Predictive Metrics Across 1,000+ Repositories — Case Study',
    'See how Saumen Biswas turned signals from 1,000+ repositories and 5,000–8,000 daily pull requests into earlier, decision-ready engineering insights.',
  ),
  globalPayments: caseStudy(
    'global-payments-quality',
    'Quality engineering for high-scale global payment platforms',
    'Global Payments Quality and Apple Pay — Case Study',
    'See how Saumen Biswas led quality engineering for global payments, including Apple Pay, regression intelligence, and continuous release validation.',
  ),
};
