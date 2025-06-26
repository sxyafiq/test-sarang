import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { VENDOR_CATEGORIES } from "../../config";

import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import Filter from "@/components/Filter";
import Search from "@/components/Search";
import FeaturedReel from "@/components/FeaturedReel";
import { BadgeCheck, Heart } from "lucide-react";
import Link from "next/link";
import PhotoVideoBanner from "@/components/PhotoVideoBanner";
import StylistBanner from "@/components/StylistBanner";
import CoordinatorBanner from "@/components/CoordinatorBanner";
import VenueBanner from "@/components/VenueBanner";
import BerkatBanner from "@/components/BerkatBanner";
import BridalBanner from "@/components/BridalBanner";
import VendorBanner from "@/components/VendorBanner";

type Param = string | string[] | undefined;

interface ProductsPageProps {
  searchParams: { [key: string]: Param };
}

const parse = (param: Param) => {
  return typeof param === "string" ? param : undefined;
};

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  const sort = parse(searchParams.sort);
  const search = parse(searchParams.search);
  const category = parse(searchParams.category);

  const label = VENDOR_CATEGORIES.find(
    ({ value }) => value === category
  )?.label;

  return (
    <>
      {category === "photovideo" ? <PhotoVideoBanner /> : null}
      {category === "stylist" ? <StylistBanner /> : null}
      {category === "coordinators" ? <CoordinatorBanner /> : null}
      {category === "venues" ? <VendorBanner cat="venues" /> : null}
      {category === "berkat" ? <BerkatBanner /> : null}
      {/* {category === "bridals" ? <VendorBanner cat="bridals" /> : null} */}

      <MaxWidthWrapper>
        <div className="mt-6 flex items-center gap-3">
          {category ? <Search search={search} category={category} /> : null}
          {category ? <Filter sort={sort} category={category} /> : null}
        </div>

        <ProductReel
          title={label ?? "Vendors"}
          href="#"
          user={user?.id}
          query={{
            category,
            search,
            limit: 1000,
            sort:
              sort === "-name" ||
              sort === "name" ||
              sort === "likes" ||
              sort === "-likes"
                ? sort
                : undefined,
          }}
        />
      </MaxWidthWrapper>
    </>
  );
};

export default ProductsPage;
