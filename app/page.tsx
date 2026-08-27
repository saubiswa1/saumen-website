import portfolioHtml from '../index.html?raw';
import PortfolioBehavior from './portfolio-behavior';

const bodyMarkup = portfolioHtml
  .match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]
  ?.replace(/<script\s+src="script\.js"\s+defer><\/script>/i, '') ?? '';

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: bodyMarkup }} />
      <PortfolioBehavior />
    </>
  );
}
