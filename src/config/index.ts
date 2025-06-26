import {
  CakeSlice,
  Camera,
  Mic2,
  Hand,
  Hotel,
  Shirt,
  SprayCan,
  Flower2,
  Gift,
  Crown,
  ToyBrick,
  ShoppingBag,
  Soup,
  Drum,
  HandHeart,
  Album,
  HandPlatter,
  Package,
} from "lucide-react";

export const PRODUCT_CATEGORIES = [
  {
    label: "Discover",
    locked: false,
    value: "discover" as const,
    featured: [
      {
        name: "Venues",
        value: "venues",
        href: "/vendors?category=venues",
        imageSrc: "https://placehold.co/600x600",
      },
      {
        name: "Wedding Coordinators",
        value: "coordinators",
        href: "/vendors?category=coordinators",
        imageSrc: "https://placehold.co/600x600",
      },
      {
        name: "Exclusive Packages",
        value: "packages",
        href: "/packages",
        imageSrc: "https://placehold.co/600x600",
      },
      {
        name: "Wedding Stylist",
        value: "stylist",
        href: "/vendors?category=stylist",
        imageSrc: "https://placehold.co/600x600",
      },
      {
        name: "Photo & Video",
        value: "photovideo",
        href: `/vendors?category=photovideo`,
        imageSrc: "https://placehold.co/600x600",
      },
      {
        name: "Bridals",
        value: "bridals",
        href: "/vendors?category=bridals",
        imageSrc: "https://placehold.co/600x600",
      },
      {
        name: "MUA",
        value: "mua",
        href: "/vendors?category=mua",
        imageSrc: "https://placehold.co/600x600",
      },
      {
        name: "Pak Andam",
        value: "pakandam",
        href: "/vendors?category=pakandam",
        imageSrc: "https://placehold.co/600x600",
      },
      {
        name: "Berkat",
        value: "berkat",
        href: "/vendors?category=berkat",
        imageSrc: "https://placehold.co/600x600",
      },
      {
        name: "Dulang & Gubahan",
        value: "dulang",
        href: "/vendors?category=dulang",
        imageSrc: "https://placehold.co/600x600",
      },
      {
        name: "Live Stations",
        value: "live",
        href: "/vendors?category=live",
        imageSrc: "https://placehold.co/600x600",
      },
      {
        name: "Henna",
        value: "henna",
        href: "/vendors?category=henna",
        imageSrc: "https://placehold.co/600x600",
      },
      {
        name: "Emcees",
        value: "emcees",
        href: "/vendors?category=emcees",
        imageSrc: "https://placehold.co/600x600",
      },
      {
        name: "Performers",
        value: "performers",
        href: "/vendors?category=performers",
        imageSrc: "https://placehold.co/600x600",
      },
      {
        name: "Wedding Preperations",
        value: "prep",
        href: "/vendors?category=prep",
        imageSrc: "https://placehold.co/600x600",
      },
      // {
      //   name: "Wedding Stationery",
      //   value: "stationery",
      //   href: "/vendors?category=stationery",
      //   imageSrc: "https://placehold.co/600x600",
      // },
      {
        name: "Wedding Cake",
        value: "cake",
        href: "/vendors?category=cake",
        imageSrc: "https://placehold.co/600x600",
      },
      {
        name: "Catering",
        value: "catering",
        href: "/vendors?category=catering",
        imageSrc: "https://placehold.co/600x600",
      },
    ],
  },
  {
    label: "Plan",
    locked: true,
    value: "plan" as const,
    featured: [
      {
        name: "Wishlist",
        href: `/plan/wishlist`,
        imageSrc: "/planmenu/1.jpg",
      },
      {
        name: "Wedding Overview",
        href: "/plan/details",
        imageSrc: "/planmenu/2.jpg",
      },
      {
        name: "To Do List",
        href: "/plan/todo",
        imageSrc: "/planmenu/3.jpg",
      },
      {
        name: "Budget",
        href: "/plan/budget",
        imageSrc: "/planmenu/4.jpg",
      },
      {
        name: "Guest List",
        href: "/plan/guests",
        imageSrc: "/planmenu/5.jpg",
      },
      {
        name: "Itinerary",
        href: "/plan/itinerary",
        imageSrc: "/planmenu/6.jpg",
      },
    ],
  },
];

export const VENDOR_CATEGORIES = [
  {
    label: "Venues",
    value: "venues",
    icon: Hotel,
  },
  {
    label: "Wedding Coordinators",
    value: "coordinators",
    icon: Gift,
  },
  {
    label: "Exclusive Packages",
    value: "packages",
    icon: Package,
  },
  {
    label: "Wedding Stylist",
    value: "stylist",
    icon: Flower2,
  },
  {
    label: "Photo & Video",
    value: "photovideo",
    icon: Camera,
  },
  {
    label: "Bridals",
    value: "bridals",
    icon: Shirt,
  },
  {
    label: "MUA",
    value: "mua",
    icon: SprayCan,
  },
  {
    label: "Pak Andam",
    value: "pakandam",
    icon: Crown,
  },
  {
    label: "Berkat",
    value: "berkat",
    icon: ShoppingBag,
  },
  {
    label: "Dulang & Gubahan",
    value: "dulang",
    icon: ToyBrick,
  },
  {
    label: "Live Stations",
    value: "live",
    icon: Soup,
  },
  {
    label: "Henna",
    value: "henna",
    icon: Hand,
  },
  {
    label: "Emcees",
    value: "emcees",
    icon: Mic2,
  },
  {
    label: "Performers",
    value: "performers",
    icon: Drum,
  },
  {
    label: "Wedding Preperations",
    value: "prep",
    icon: HandHeart,
  },
  // {
  //   label: "Wedding Stationery",
  //   value: "stationery",
  //   icon: Album,
  // },
  {
    label: "Wedding Cake",
    value: "cake",
    icon: CakeSlice,
  },
  {
    label: "Catering",
    value: "catering",
    icon: HandPlatter,
  },
];
