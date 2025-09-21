// Server Base Products Data
export interface ServerProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  link: string;
  features: string[];
  category: string;
}

export const serverProducts: ServerProduct[] = [
  {
    id: "freeroam-paradise",
    title: "Xenon V4 Complete QB-Core Server Pack",
    description: "Complete freeroam experience with 100+ vehicles, custom maps, and EUP clothing pack for your FiveM server.",
    price: 59,
    image: "https://kryptongame.com/_image?href=https%3A%2F%2Fcdn.kryptongame.com%2FOZ-WnTSYtoLSM5Mrj04du.png&w=700&h=700&f=avif",
    link: "https://kryptongame.com/categories/server-base",
    features: ["100+ Custom Cars", "Custom Maps", "EUP Clothing Pack", "Easy Installation"],
    category: "Server Base"
  },
  {
    id: "nopixel-3-5",
    title: "Xenon V3 Complete QB-Core Server Pack",
    description: "Complete server pack inspired by NoPixel 3.5 with QBCore framework integration and premium scripts.",
    price: 110,
    image: "https://kryptongame.com/_image?href=https%3A%2F%2Fcdn.kryptongame.com%2FypIfcfYLSNeOP-Vo7t1pn.png&w=700&h=700&f=avif",
    link: "https://kryptongame.com/categories/server-base",
    features: ["QBCore Framework", "NoPixel 3.5 Style", "Premium Scripts", "Full Documentation"],
    category: "Server Base"
  },
  {
    id: "nopixel-4-0",
    title: "Freeroam Paradise: 100+ Cars , Maps & Custom EUP Pack",
    description: "Latest NoPixel 4.0 inspired server pack with advanced features and optimized performance.",
    price: 160,
    image: "https://kryptongame.com/_image?href=https%3A%2F%2Fcdn.kryptongame.com%2F-pZxpnydBjtwyJGHMszbv.png&w=700&h=700&f=avif",
    link: "https://kryptongame.com/categories/server-base",
    features: ["NoPixel 4.0 Features", "QB-Core Integration", "Advanced Scripts", "Performance Optimized"],
    category: "Server Base"
  }
];

export const serverProductsHandler = {
  allProducts: () => serverProducts,

  heroSliderProducts: () => {
    // Return all products for hero slider
    return serverProducts;
  },

  getProductById: (id: string) => {
    return serverProducts.find(product => product.id === id);
  },

  getProductsByCategory: (category: string) => {
    return serverProducts.filter(product => product.category === category);
  }
};
