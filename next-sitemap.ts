/* eslint-disable import/no-extraneous-dependencies */
import { IConfig } from 'next-sitemap';

import { homepage as siteUrl } from './package.json';

// @ts-ignore
const config: IConfig = {
 alternateRefs: [
  {
   href: `${siteUrl}/pt`,
   hreflang: 'pt',
  },
 ],
 generateRobotsTxt: true,
 siteUrl,
};

export default config;
