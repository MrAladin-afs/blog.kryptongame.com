import { getCollection } from "astro:content";

const articlesCollection = (
  await getCollection("articles", ({ data }) => {
    return data.isDraft !== true && new Date(data.publishedTime) < new Date();
  })
).sort((a, b) =>
  new Date(b.data.publishedTime)
    .toISOString()
    .localeCompare(new Date(a.data.publishedTime).toISOString())
);

export const articlesHandler = {
  allArticles: () => articlesCollection,

  mainHeadline: () => {
    const marked = articlesCollection.filter(
      (article) => article.data.isMainHeadline === true
    )[0];
    if (marked) return marked;

    // Fallback: use most recent article if none is explicitly marked
    const fallback = articlesCollection[0];
    if (!fallback) {
      throw new Error(
        "Please ensure there is at least one item to display for the main headline."
      );
    }
    return fallback;
  },

  subHeadlines: () => {
    const mainHeadline = articlesHandler.mainHeadline();
    const subHeadlines = articlesCollection
      .filter(
        (article) =>
          article.data.isSubHeadline === true &&
          mainHeadline.id !== article.id
      )
      .slice(0, 4);

    if (subHeadlines.length === 0)
      throw new Error(
        "Please ensure there is at least one item to display for the sub headlines."
      );
    return subHeadlines;
  },

  // New method for hero slider articles
  heroSliderArticles: () => {
    // Get the most recent 5 articles for the hero slider
    // You can modify this logic to use a specific field like isHeroSlide if you prefer
    return articlesCollection.slice(0, 5);
  },
};
