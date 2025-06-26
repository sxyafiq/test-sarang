"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { trpc } from "@/trpc/client";

interface NavItemsProps {
  signedIn: boolean;
  userId?: string;
}

const NavItems = ({ signedIn, userId }: NavItemsProps) => {
  const userID = userId || "";
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  const isAnyOpen = activeIndex !== null;

  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setActiveIndex(null));

  let identifiedPlan = false;

  const plan = trpc.getPlan.useQuery({
    userId: userID,
  });
  if (plan.data?.docs[0]) {
    identifiedPlan = true;
  }

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          if (!category.locked) {
            if (activeIndex === i) {
              setActiveIndex(null);
            } else {
              setActiveIndex(i);
            }
          } else if (category.locked && signedIn && identifiedPlan) {
            if (activeIndex === i) {
              setActiveIndex(null);
            } else {
              setActiveIndex(i);
            }
          } else {
            null;
          }
        };

        const close = () => setActiveIndex(null);

        const isOpen = i === activeIndex;

        return (
          <NavItem
            category={category}
            close={close}
            handleOpen={handleOpen}
            isOpen={isOpen}
            key={category.value}
            isAnyOpen={isAnyOpen}
            locked={category.locked}
            signedIn={signedIn}
            identifiedPlan={identifiedPlan}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
