import FeaturedReel from "@/components/FeaturedReel";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MiscPull from "@/components/MiscPull";
import MUABanner from "@/components/MUABanner";
import { getServerSideUser } from "@/lib/payload-utils";
import { BadgeCheck } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

const MakeUp = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  const subC = [
    { title: "Make Up Artist", value: "mua" },
    { title: "Pak Andam", value: "pakandam" },
  ];
  return (
    <>
      {/* <MUABanner /> */}
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

export default MakeUp;
