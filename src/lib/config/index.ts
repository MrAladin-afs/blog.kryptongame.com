import type { Link } from "../types";

export const SITE = {
  title: "Krypton Game",
  description: "Your premier destination for gaming news, reviews, and insights. Stay updated with the latest gaming industry news, game reviews, and platform coverage.",
  author: "Krypton Game",
  url: "https://blog.kryptongame.com",
  github: "https://github.com/kryptongame",
  locale: "en-US",
  dir: "ltr",
  charset: "UTF-8",
  basePath: "/",
  postsPerPage: 4,
};

export const NAVIGATION_LINKS: Link[] = [
  {
    href: "/categories/guide",
    text: "GUIDE",
  },
  {
    href: "/categories/xbox",
    text: "XBOX",
  },
  {
    href: "/categories/playstation",
    text: "PLAYSTATION",
  },
  {
    href: "/categories/update",
    text: "UPDATE",
  },
  {
    href: "/categories/pc-games",
    text: "PC GAMES",
  },
  {
    href: "/categories/reviews",
    text: "REVIEWS",
  },
];

export const OTHER_LINKS: Link[] = [
  {
    href: "/about",
    text: "About us",
  },
  {
    href: "/contact",
    text: "Contact",
  },
  {
    href: "/privacy",
    text: "Privacy",
  },
  {
    href: "/terms",
    text: "Terms",
  },
];

export const SOCIAL_LINKS: Link[] = [
  {
    href: "https://www.facebook.com/gaming/krypton.games.hub",
    text: "Facebook",
    icon: "facebook",
  },
  {
    href: "https://www.instagram.com/me.kryptongame",
    text: "Instagram",
    icon: "instagram",
  },
];
