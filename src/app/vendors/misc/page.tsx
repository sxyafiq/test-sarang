import FeaturedReel from "@/components/FeaturedReel";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MiscBanner from "@/components/MiscBanner";
import MiscPull from "@/components/MiscPull";
import { getServerSideUser } from "@/lib/payload-utils";
import { BadgeCheck } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

const Misc = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  const subC = [
    { title: "Berkat", value: "berkat" },
    { title: "Dulang & Gubahan", value: "dulang" },
    { title: "Wedding Stationery", value: "stationery" },
    { title: "Wedding Cake", value: "cake" },
    { title: "Live Stations", value: "liveStation" },
    { title: "Henna", value: "henna" },
    { title: "Catering", value: "catering" },
  ];

  return (
    <>
      {/* <MiscBanner /> */}
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

export default Misc;
