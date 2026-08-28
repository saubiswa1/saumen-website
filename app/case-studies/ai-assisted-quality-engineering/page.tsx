import caseStudyHtml from '../../../case-studies/ai-assisted-quality-engineering/index.html?raw';
import { caseStudies } from '../../../case-studies.config.mjs';
import CaseStudyPage, { createCaseStudyMetadata } from '../case-study-page';

const study = caseStudies.aiAssistedQuality;

export const metadata = createCaseStudyMetadata(study);

export default function AiAssistedQualityEngineeringCaseStudy() {
  return <CaseStudyPage html={caseStudyHtml} study={study} />;
}
