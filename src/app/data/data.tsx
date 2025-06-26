import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  PhoneOff,
  PhoneMissed,
  SignalLow,
  SignalMedium,
  SignalHigh,
  Annoyed,
  ClipboardSignature,
  CakeSlice,
  Camera,
  Hand,
  Hotel,
  Mic2,
  Search,
  Shirt,
  SprayCan,
  Flower2,
  Gift,
} from "lucide-react";

export const statuses = [
  {
    value: "not contacted",
    label: "Not Contacted",
    icon: PhoneOff,
    icon2: <PhoneOff className="w-3 h-3" />,
  },
  {
    value: "warm",
    label: "Warm",
    icon: SignalMedium,
    icon2: <SignalMedium className="w-3 h-3" />,
  },
  {
    value: "hot",
    label: "Hot",
    icon: SignalHigh,
    icon2: <SignalHigh className="w-3 h-3" />,
  },
  {
    value: "cold",
    label: "Cold",
    icon: SignalLow,
    icon2: <SignalLow className="w-3 h-3" />,
  },
  {
    value: "lnr",
    label: "Lead Not Responding",
    icon: PhoneMissed,
    icon2: <PhoneMissed className="w-3 h-3" />,
  },
  {
    value: "not interested",
    label: "Not Interested",
    icon: Annoyed,
    icon2: <Annoyed className="w-3 h-3" />,
  },
  {
    value: "contract signed",
    label: "Contract Signed (Closed)",
    icon: ClipboardSignature,
    icon2: <ClipboardSignature className="w-3 h-3" />,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
    icon2: <ArrowDownIcon className="w-3 h-3" />,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
    icon2: <ArrowRightIcon className="w-3 h-3" />,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
    icon2: <ArrowUpIcon className="w-3 h-3" />,
  },
];

export const categories = [
  {
    label: "Venues",
    value: "venues",
    icon: <Hotel />,
  },
  {
    label: "Wedding Stylist",
    value: "stylist",
    icon: <Flower2 />,
  },
  {
    label: "Wedding Coordinators",
    value: "coordinators",
    icon: <Gift />,
  },
  {
    label: "Bridals",
    value: "bridals",
    icon: <Shirt />,
  },
  {
    label: "Photo & Video",
    value: "photovideo",
    icon: <Camera />,
  },
  {
    label: "Make Up Artists",
    value: "mua",
    icon: <SprayCan />,
  },
  {
    label: "Emcees & Performers",
    value: "emceesperformers",
    icon: <Mic2 />,
  },
  {
    label: "Misc",
    value: "misc",
    icon: <CakeSlice />,
  },
];
