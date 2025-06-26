import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MiscPull from "@/components/MiscPull";
import VendorBanner from "@/components/VendorBanner";
import { getServerSideUser } from "@/lib/payload-utils";
import { BadgeCheck } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

const Bridal = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  const subC = [
    { title: "Bridals", value: "bridal" },
    { title: "Bridal Heels", value: "heels" },
  ];
  return (
    <>
      <VendorBanner cat="bridals" />
      <MaxWidthWrapper>
        {subC.map((cat) => (
          <MiscPull
            key={cat.value}
            category={cat.value}
            title={cat.title}
            user={user?.id}
          />
        ))}
      </MaxWidthWrapper>
    </>
  );
};

export default Bridal;
