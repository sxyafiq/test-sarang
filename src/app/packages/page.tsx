import PackageReel from "@/components/PackageReel";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";

import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";

const ProductsPage = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  const label = "Exclusive Packages";
  const category = "packages";

  return (
    <>
      <MaxWidthWrapper>
        <PackageReel
          title={label ?? "Vendors"}
          href="#"
          user={user?.id}
          query={{
            category,
            limit: 1000,
          }}
          idvPage
        />
      </MaxWidthWrapper>
    </>
  );
};

export default ProductsPage;
