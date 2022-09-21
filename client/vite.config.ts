import { fetchDecoratorHtml } from '@navikt/nav-dekoratoren-moduler/ssr'
import react from '@vitejs/plugin-react'
import { render } from 'mustache'
import { defineConfig, Plugin, splitVendorChunkPlugin } from 'vite'
import macrosPlugin from 'vite-plugin-babel-macros'

const htmlPlugin = ({ development }: { development?: boolean }): Plugin => ({
  name: 'html-transform',
  async transformIndexHtml(html) {
    if (development) {
      const decorator = await fetchDecoratorHtml({
        env: 'dev',
        context: 'samarbeidspartner',
        chatbot: false,
        language: 'nb',
        availableLanguages: [
          {
            locale: 'nb',
            handleInApp: true,
          },
          {
            locale: 'nn',
            handleInApp: true,
          },
        ],
      })
      return {
        html: render(html, decorator),
        tags: [
          {
            tag: 'script',
            children: `window.appSettings = {
              MILJO: 'dev-gcp',
              USE_MSW: true,
            }`,
          },
        ],
      }
    } else {
      return {
        html,
        tags: [
          {
            tag: 'script',
            children: `window.appSettings = {}`,
          },
          {
            tag: 'script',
            attrs: {
              src: '/sosialhjelp/avtaler/settings.js',
            },
          },
        ],
      }
    }
  },
})

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  base: env.mode === 'development' ? '/' : '/sosialhjelp/avtaler/',
  plugins: [htmlPlugin({ development: env.mode === 'development' }), react(), splitVendorChunkPlugin(), macrosPlugin()],
  build: {
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
  },
}))
