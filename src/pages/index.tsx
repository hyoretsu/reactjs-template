import { NextSeo } from 'next-seo';

import appPackageJson from '../../package.json';
import { siteName as title } from './_document';

const Homepage: React.FC = () => {
 const { description, homepage: url } = appPackageJson;

 return (
  <>
   <NextSeo
    canonical={url}
    description={description}
    openGraph={{ description, title }}
    twitter={{ handle: `@${process.env.NEXT_PUBLIC_SITE_OWNER}` || '@hyoretsu' }}
   />
  </>
 );
};

export default Homepage;
