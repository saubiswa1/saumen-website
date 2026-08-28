import caseStudyHtml from '../../../case-studies/predictive-engineering-metrics/index.html?raw';
import { caseStudies } from '../../../case-studies.config.mjs';
import CaseStudyPage, { createCaseStudyMetadata } from '../case-study-page';

const study = caseStudies.predictiveMetrics;

export const metadata = createCaseStudyMetadata(study);

export default function PredictiveEngineeringMetricsCaseStudy() {
  return <CaseStudyPage html={caseStudyHtml} study={study} />;
}
