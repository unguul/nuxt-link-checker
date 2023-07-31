import { parseURL } from 'ufo'
import { defineRule } from './util'

export default function RuleAbsoluteSiteUrls() {
  return defineRule({
    test({ report, link, siteConfig }) {
      if (!link.startsWith(siteConfig.url!))
        return // ignore external links

      const $url = parseURL(link)
      report({
        name: 'absolute-site-urls',
        scope: 'warning',
        message: 'Internal links should be relative.',
        tip: 'Using internal links that start with / is recommended to avoid issues when deploying your site to different domain names',
        fix: $url.pathname,
        fixDescription: `Remove ${siteConfig.url!}.`,
      })
    },
  })
}
