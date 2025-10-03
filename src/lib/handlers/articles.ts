import { getCollection } from "astro:content";

const articlesCollection = (
  await getCollection("articles", ({ data }) => {
    // In development, include future posts to make previewing easier.
    // In production, include items published up to now OR with the same calendar date as today.
    const articleDate = new Date(data.publishedTime);
    const now = new Date();
    const isSameDay =
      articleDate.getFullYear() === now.getFullYear() &&
      articleDate.getMonth() === now.getMonth() &&
      articleDate.getDate() === now.getDate();
    const isPublished = articleDate <= now || isSameDay;
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
    const explicitMain = articlesCollection.filter(
      (article) => article.data.isMainHeadline === true
    )[0];
    if (explicitMain) return explicitMain;

    // Fallback: use the most recent article if none explicitly marked
    const fallback = articlesCollection[0];
    if (fallback) return fallback;

    // No articles at all
    throw new Error(
      "Please add at least one article to display for the main headline."
    );
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

    // If still empty but there are articles, return up to desiredCount recent ones (may include main)
    if (subHeadlines.length === 0) {
      subHeadlines = articlesCollection.slice(0, desiredCount);
    }

    if (subHeadlines.length === 0)
      throw new Error(
        "Please add at least one article to display for the sub headlines."
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
