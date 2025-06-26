"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VENDOR_CATEGORIES = exports.PRODUCT_CATEGORIES = void 0;
var lucide_react_1 = require("lucide-react");
exports.PRODUCT_CATEGORIES = [
    {
        label: "Discover",
        locked: false,
        value: "discover",
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
                href: "/vendors?category=photovideo",
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
        value: "plan",
        featured: [
            {
                name: "Wishlist",
                href: "/plan/wishlist",
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
exports.VENDOR_CATEGORIES = [
    {
        label: "Venues",
        value: "venues",
        icon: lucide_react_1.Hotel,
    },
    {
        label: "Wedding Coordinators",
        value: "coordinators",
        icon: lucide_react_1.Gift,
    },
    {
        label: "Exclusive Packages",
        value: "packages",
        icon: lucide_react_1.Package,
    },
    {
        label: "Wedding Stylist",
        value: "stylist",
        icon: lucide_react_1.Flower2,
    },
    {
        label: "Photo & Video",
        value: "photovideo",
        icon: lucide_react_1.Camera,
    },
    {
        label: "Bridals",
        value: "bridals",
        icon: lucide_react_1.Shirt,
    },
    {
        label: "MUA",
        value: "mua",
        icon: lucide_react_1.SprayCan,
    },
    {
        label: "Pak Andam",
        value: "pakandam",
        icon: lucide_react_1.Crown,
    },
    {
        label: "Berkat",
        value: "berkat",
        icon: lucide_react_1.ShoppingBag,
    },
    {
        label: "Dulang & Gubahan",
        value: "dulang",
        icon: lucide_react_1.ToyBrick,
    },
    {
        label: "Live Stations",
        value: "live",
        icon: lucide_react_1.Soup,
    },
    {
        label: "Henna",
        value: "henna",
        icon: lucide_react_1.Hand,
    },
    {
        label: "Emcees",
        value: "emcees",
        icon: lucide_react_1.Mic2,
    },
    {
        label: "Performers",
        value: "performers",
        icon: lucide_react_1.Drum,
    },
    {
        label: "Wedding Preperations",
        value: "prep",
        icon: lucide_react_1.HandHeart,
    },
    // {
    //   label: "Wedding Stationery",
    //   value: "stationery",
    //   icon: Album,
    // },
    {
        label: "Wedding Cake",
        value: "cake",
        icon: lucide_react_1.CakeSlice,
    },
    {
        label: "Catering",
        value: "catering",
        icon: lucide_react_1.HandPlatter,
    },
];
