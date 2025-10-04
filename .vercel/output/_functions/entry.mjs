import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DbsL5Q4M.mjs';
import { manifest } from './manifest_COeNt638.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/keystatic/_---params_.astro.mjs');
const _page4 = () => import('./pages/articles/_id_.astro.mjs');
const _page5 = () => import('./pages/articles/_page_.astro.mjs');
const _page6 = () => import('./pages/articles.astro.mjs');
const _page7 = () => import('./pages/authors/_id_/_page_.astro.mjs');
const _page8 = () => import('./pages/authors/_id_.astro.mjs');
const _page9 = () => import('./pages/authors.astro.mjs');
const _page10 = () => import('./pages/categories/_category_/_page_.astro.mjs');
const _page11 = () => import('./pages/categories/_category_.astro.mjs');
const _page12 = () => import('./pages/categories.astro.mjs');
const _page13 = () => import('./pages/contact.astro.mjs');
const _page14 = () => import('./pages/keystatic/_---params_.astro.mjs');
const _page15 = () => import('./pages/privacy.astro.mjs');
const _page16 = () => import('./pages/rss.xml.astro.mjs');
const _page17 = () => import('./pages/search.astro.mjs');
const _page18 = () => import('./pages/terms.astro.mjs');
const _page19 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.14.1_@types+node@24.6.2_@vercel+functions@2.2.13_idb-keyval@6.2.2_jiti@2.6.1_li_a65fdd81cfbf4a7323c84a56ffaea699/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["node_modules/.pnpm/@keystatic+astro@5.0.6_@keystatic+core@0.5.48_react-dom@19.2.0_react@19.2.0__react@19.2_e427819229ec81d4aa094e1f50174335/node_modules/@keystatic/astro/internal/keystatic-api.js", _page3],
    ["src/pages/articles/[id].astro", _page4],
    ["src/pages/articles/[page].astro", _page5],
    ["src/pages/articles/index.astro", _page6],
    ["src/pages/authors/[id]/[page].astro", _page7],
    ["src/pages/authors/[id]/index.astro", _page8],
    ["src/pages/authors/index.astro", _page9],
    ["src/pages/categories/[category]/[page].astro", _page10],
    ["src/pages/categories/[category]/index.astro", _page11],
    ["src/pages/categories/index.astro", _page12],
    ["src/pages/contact.astro", _page13],
    ["node_modules/.pnpm/@keystatic+astro@5.0.6_@keystatic+core@0.5.48_react-dom@19.2.0_react@19.2.0__react@19.2_e427819229ec81d4aa094e1f50174335/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro", _page14],
    ["src/pages/privacy.astro", _page15],
    ["src/pages/rss.xml.js", _page16],
    ["src/pages/search/index.astro", _page17],
    ["src/pages/terms.astro", _page18],
    ["src/pages/index.astro", _page19]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "b0128774-405d-4f10-bced-8af106111260",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
