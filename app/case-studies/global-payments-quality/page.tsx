import caseStudyHtml from '../../../case-studies/global-payments-quality/index.html?raw';
import { caseStudies } from '../../../case-studies.config.mjs';
import CaseStudyPage, { createCaseStudyMetadata } from '../case-study-page';

const study = caseStudies.globalPayments;

export const metadata = createCaseStudyMetadata(study);

export default function GlobalPaymentsQualityCaseStudy() {
  return <CaseStudyPage html={caseStudyHtml} study={study} />;
}
