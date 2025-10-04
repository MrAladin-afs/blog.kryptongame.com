import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import { parseString } from 'set-cookie-parser';
import { collection, fields, config as config$1 } from '@keystatic/core';
export { renderers } from '../../../renderers.mjs';

function makeHandler(_config) {
  return async function keystaticAPIRoute(context) {
    var _context$locals, _ref, _config$clientId, _ref2, _config$clientSecret, _ref3, _config$secret;
    const envVarsForCf = (_context$locals = context.locals) === null || _context$locals === void 0 || (_context$locals = _context$locals.runtime) === null || _context$locals === void 0 ? void 0 : _context$locals.env;
    const handler = makeGenericAPIRouteHandler({
      ..._config,
      clientId: (_ref = (_config$clientId = _config.clientId) !== null && _config$clientId !== void 0 ? _config$clientId : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_ID) !== null && _ref !== void 0 ? _ref : tryOrUndefined(() => {
        return undefined                                          ;
      }),
      clientSecret: (_ref2 = (_config$clientSecret = _config.clientSecret) !== null && _config$clientSecret !== void 0 ? _config$clientSecret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_SECRET) !== null && _ref2 !== void 0 ? _ref2 : tryOrUndefined(() => {
        return undefined                                              ;
      }),
      secret: (_ref3 = (_config$secret = _config.secret) !== null && _config$secret !== void 0 ? _config$secret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_SECRET) !== null && _ref3 !== void 0 ? _ref3 : tryOrUndefined(() => {
        return undefined                                ;
      })
    }, {
      slugEnvName: "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG"
    });
    const {
      body,
      headers,
      status
    } = await handler(context.request);
    let headersInADifferentStructure = /* @__PURE__ */ new Map();
    if (headers) {
      if (Array.isArray(headers)) {
        for (const [key, value] of headers) {
          if (!headersInADifferentStructure.has(key.toLowerCase())) {
            headersInADifferentStructure.set(key.toLowerCase(), []);
          }
          headersInADifferentStructure.get(key.toLowerCase()).push(value);
        }
      } else if (typeof headers.entries === "function") {
        for (const [key, value] of headers.entries()) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
        if ("getSetCookie" in headers && typeof headers.getSetCookie === "function") {
          const setCookieHeaders2 = headers.getSetCookie();
          if (setCookieHeaders2 !== null && setCookieHeaders2 !== void 0 && setCookieHeaders2.length) {
            headersInADifferentStructure.set("set-cookie", setCookieHeaders2);
          }
        }
      } else {
        for (const [key, value] of Object.entries(headers)) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
      }
    }
    const setCookieHeaders = headersInADifferentStructure.get("set-cookie");
    headersInADifferentStructure.delete("set-cookie");
    if (setCookieHeaders) {
      for (const setCookieValue of setCookieHeaders) {
        var _options$sameSite;
        const {
          name,
          value,
          ...options
        } = parseString(setCookieValue);
        const sameSite = (_options$sameSite = options.sameSite) === null || _options$sameSite === void 0 ? void 0 : _options$sameSite.toLowerCase();
        context.cookies.set(name, value, {
          domain: options.domain,
          expires: options.expires,
          httpOnly: options.httpOnly,
          maxAge: options.maxAge,
          path: options.path,
          sameSite: sameSite === "lax" || sameSite === "strict" || sameSite === "none" ? sameSite : void 0
        });
      }
    }
    return new Response(body, {
      status,
      headers: [...headersInADifferentStructure.entries()].flatMap(([key, val]) => val.map((x) => [key, x]))
    });
  };
}
function tryOrUndefined(fn) {
  try {
    return fn();
  } catch {
    return void 0;
  }
}

const articlesKs = collection({
  label: "Articles",
  slugField: "title",
  path: "src/content/articles/*/",
  format: { contentField: "content" },
  entryLayout: "form",
  schema: {
    isDraft: fields.checkbox({
      label: "Is this a draft?",
      defaultValue: false
    }),
    isMainHeadline: fields.checkbox({
      label: "Is this a main headline?",
      defaultValue: false
    }),
    isSubHeadline: fields.checkbox({
      label: "Is this a sub headline?",
      defaultValue: false
    }),
    description: fields.text({
      label: "Description",
      validation: { isRequired: true, length: { max: 160 } }
    }),
    title: fields.slug({
      name: { label: "Title", validation: { length: { max: 60 } } }
    }),
    cover: fields.image({
      label: "Cover",
      directory: "src/assets/images/articles",
      publicPath: "@assets/images/articles/"
    }),
    category: fields.relationship({
      label: "Category",
      collection: "categories"
    }),
    publishedTime: fields.datetime({
      label: "Published Time",
      validation: { isRequired: true }
    }),
    authors: fields.array(
      fields.relationship({
        label: "Authors",
        collection: "authors"
      }),
      {
        label: "Authors",
        itemLabel: (props) => props.value ?? "",
        validation: {
          length: {
            min: 1
          }
        }
      }
    ),
    content: fields.mdx({
      label: "Content",
      options: {
        image: {
          directory: "src/assets/images/articles",
          publicPath: "@assets/images/articles"
        }
      }
    })
  }
});

const authorsKs = collection({
  label: "Authors",
  slugField: "name",
  path: "src/content/authors/*/",
  format: { contentField: "content" },
  entryLayout: "form",
  schema: {
    name: fields.slug({ name: { label: "Name" } }),
    job: fields.text({ label: "Job" }),
    avatar: fields.image({
      label: "Avatar",
      directory: "src/assets/images/authors",
      publicPath: "@assets/images/authors"
    }),
    bio: fields.text({ label: "Bio" }),
    social: fields.array(
      fields.object({
        name: fields.text({ label: "Name", validation: { isRequired: true } }),
        url: fields.url({ label: "URL", validation: { isRequired: true } }),
        icon: fields.text({ label: "Icon", validation: { isRequired: true } })
      }),
      {
        label: "Social Links",
        itemLabel: (props) => props.fields?.name.value ?? ""
      }
    ),
    content: fields.mdx({
      label: "Content",
      options: {
        image: {
          directory: "src/assets/images/authors",
          publicPath: "@assets/images/authors"
        }
      }
    })
  }
});

const categoriesKs = collection({
  label: "Categories",
  slugField: "path",
  path: "src/content/categories/*/",
  format: { data: "json" },
  schema: {
    title: fields.text({
      label: "Title",
      description: "The title of the category."
    }),
    path: fields.text({
      label: "Path",
      description: "The path of the category."
    })
  }
});

const config = config$1({
  storage: {
    kind: "local"
  },
  ui: {
    brand: {
      name: "krypton blog"
    },
    navigation: ["---", "articles", "---", "authors", "categories"]
  },
  collections: {
    articles: articlesKs,
    authors: authorsKs,
    categories: categoriesKs
  }
});

const all = makeHandler({ config });
const ALL = all;

const prerender = false;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ALL,
  all,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
