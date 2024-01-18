import { describe, expect, it } from 'vitest'
import { createResolver } from '@nuxt/kit'
import { $fetch, setup } from '@nuxt/test-utils'

const { resolve } = createResolver(import.meta.url)

await setup({
  rootDir: resolve('./fixtures/content'),
  dev: true,
})

export const FooMarkdown = resolve('./fixtures/content/content/foo.md')

describe('nuxt/content documentDriven', () => {
  it('basic', async () => {
    const singleInspect = await $fetch('/__link-checker__/inspect', {
      method: 'POST',
      body: {
        tasks: [
          {
            paths: [FooMarkdown],
            link: '/about-us',
            textContent: 'About Us',
          },
        ],
        ids: [],
      },
    })
    expect(singleInspect).toMatchInlineSnapshot(`
      [
        {
          "error": [],
          "fix": "/about-us",
          "link": "/about-us",
          "passes": true,
          "textContent": "About Us",
          "warning": [],
        },
      ]
    `)
  }, 60000)
})
