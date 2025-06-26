import React from "react";
import { categories } from "@/app/data/data";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import FeaturedReel from "@/components/FeaturedReel";

const Trending = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);
  return (
    <>
      {categories.map((category) => (
        <div key={category.value} className="bg-sky-100">
          <MaxWidthWrapper>
            {category.value != "mua" &&
            category.value != "misc" &&
            category.value != "bridals" ? (
              <FeaturedReel
                title={category.label}
                category={category.value}
                user={user?.id}
                featured={false}
                href={`/vendors?category=${category.value}`}
              />
            ) : (
              <FeaturedReel
                title={category.label}
                category={category.value}
                user={user?.id}
                featured={false}
                href={`/vendors/${category.value}`}
              />
            )}
          </MaxWidthWrapper>
        </div>
      ))}
    </>
  );
};

export default Trending;
