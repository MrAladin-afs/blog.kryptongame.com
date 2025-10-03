import { getCollection } from "astro:content";

const articlesCollection = (
  await getCollection("articles", ({ data }) => {
    // In development, include future posts to make previewing easier.
    // In production, include only posts published up to now (inclusive).
    const isPublished = new Date(data.publishedTime) <= new Date();
    return data.isDraft !== true && (import.meta.env.DEV || isPublished);
  })
).sort((a, b) =>
  new Date(b.data.publishedTime)
    .toISOString()
    .localeCompare(new Date(a.data.publishedTime).toISOString())
);

export const articlesHandler = {
  allArticles: () => articlesCollection,

  mainHeadline: () => {
    const article = articlesCollection.filter(
      (article) => article.data.isMainHeadline === true
    )[0];
    if (!article)
      throw new Error(
        "Please ensure there is at least one item to display for the main headline."
      );
    return article;
  },

  subHeadlines: () => {
    const desiredCount = 6;
    const mainHeadline = articlesHandler.mainHeadline();
    let subHeadlines = articlesCollection
      .filter(
        (article) =>
          article.data.isSubHeadline === true &&
          mainHeadline.id !== article.id
      )
      .slice(0, desiredCount);

    // Fallback to recent articles excluding main if none explicitly marked
    if (subHeadlines.length === 0) {
      subHeadlines = articlesCollection
        .filter((article) => article.id !== mainHeadline.id)
        .slice(0, desiredCount);
    }

    // Pad to ensure up to 4 items by adding recent articles not already included
    if (subHeadlines.length < desiredCount) {
      const existingIds = new Set(subHeadlines.map((a) => a.id));
      const fillers = articlesCollection.filter(
        (a) => a.id !== mainHeadline.id && !existingIds.has(a.id)
      );
      for (const a of fillers) {
        if (subHeadlines.length >= desiredCount) break;
        subHeadlines.push(a);
        existingIds.add(a.id);
      }
    }

    // As a last resort, include main headline to avoid empty space
    if (
      subHeadlines.length < desiredCount &&
      !subHeadlines.find((a) => a.id === mainHeadline.id)
    ) {
      subHeadlines.push(mainHeadline);
    }

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
