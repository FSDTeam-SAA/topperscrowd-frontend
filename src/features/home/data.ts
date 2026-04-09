import type { Book, Category, CountdownUnit } from "./types";

export const featuredBooks: Book[] = [
  {
    id: "scifi-1",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    price: "$14.99",
    rating: 5.0,
    image: "/images/home/book1.png",
  },
  {
    id: "scifi-2",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    price: "$14.99",
    rating: 5.0,
    image: "/images/home/book2.png",
  },
  {
    id: "scifi-3",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    price: "$14.99",
    rating: 5.0,
    image: "/images/home/book3.png",
  },
  {
    id: "scifi-4",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    price: "$14.99",
    rating: 5.0,
    image: "/images/home/book4.png",
  },
];

export const newArrivals: Book[] = [
  {
    id: "classic-1",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    price: "$14.99",
    rating: 5.0,
    image: "/images/home/book3.png",
  },
  {
    id: "classic-2",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    price: "$14.99",
    rating: 5.0,
    image: "/images/home/book3.png",
  },
  {
    id: "classic-3",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    price: "$14.99",
    rating: 5.0,
    image: "/images/home/book3.png",
  },
  {
    id: "classic-4",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    price: "$14.99",
    rating: 5.0,
    image: "/images/home/book3.png",
  },
];

export const categories: Category[] = [
  {
    slug: "sci-fi-cyberpunk",
    title: "Sci-Fi & Cyberpunk",
    subtitle: "Neon worlds and digital dreams.",
    image: "/images/home/category-scifi.png",
  },
  {
    slug: "classic-literature",
    title: "Classic Literature",
    subtitle: "140 Curated Titles",
    image: "/images/home/category-classic.png",
  },
  {
    slug: "mystery",
    title: "Mystery",
    subtitle: "",
    image: "/images/home/category-mystery.png",
  },
  {
    slug: "horror",
    title: "Horror",
    subtitle: "",
    image: "/images/home/category-horror.png",
  },
];

export const countdownUnits: CountdownUnit[] = [
  { value: "02", label: "Hrs" },
  { value: "45", label: "Min" },
  { value: "18", label: "Sec" },
];
