import BerkatBanner from "@/components/BerkatBanner";
import FeaturedReel from "@/components/FeaturedReel";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MiscPull from "@/components/MiscPull";
import { getServerSideUser } from "@/lib/payload-utils";
import { BadgeCheck } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

const Berkat = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  const subC = [
    { title: "Berkat", value: "berkat" },
    { title: "Dulang & Gubahan", value: "dulang" },
  ];
  return (
    <>
      {/* <BerkatBanner /> */}
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

export default Berkat;
