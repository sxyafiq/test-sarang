"use client";

import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import CouponCard from "./Coupon";
import { trpc } from "@/trpc/client";

const CouponsCont = () => {
  const subbed = true;
  const coupons = trpc.getAllCoupons.useQuery();

  if (subbed) {
    return (
      <MaxWidthWrapper className="py-5">
        {coupons.isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <CouponCard
              //@ts-ignore
              vendor={undefined}
              //@ts-ignore
              method={undefined}
              //@ts-ignore
              amount={undefined}
              //@ts-ignore
              min={undefined}
              //@ts-ignore
              expiry={undefined}
              loading
            />
            <CouponCard
              //@ts-ignore
              vendor={undefined}
              //@ts-ignore
              method={undefined}
              //@ts-ignore
              amount={undefined}
              //@ts-ignore
              min={undefined}
              //@ts-ignore
              expiry={undefined}
              loading
            />
          </div>
        ) : (
          <>
            {/* {coupons.data ? JSON.stringify(coupons.data) : null} */}
            {coupons.data && coupons.data.length > 1 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {coupons.data.map((coupon) => (
                  <CouponCard
                    key={coupon.id}
                    //@ts-ignore
                    vendor={coupon.vendor}
                    //@ts-ignore
                    method={coupon.method}
                    //@ts-ignore
                    amount={coupon.amount}
                    //@ts-ignore
                    min={coupon.min}
                    //@ts-ignore
                    expiry={new Date(coupon.expiry)}
                  />
                ))}
              </div>
            ) : null}
            {coupons.data && coupons.data.length == 1 ? (
              <CouponCard
                //@ts-ignore
                vendor={coupons.data[0].vendor}
                //@ts-ignore
                method={coupons.data[0].method}
                //@ts-ignore
                amount={coupons.data[0].amount}
                //@ts-ignore
                min={coupons.data[0].min}
                //@ts-ignore
                expiry={new Date(coupons.data[0].expiry)}
              />
            ) : null}
          </>
        )}
      </MaxWidthWrapper>
    );
  } else {
    return (
      <MaxWidthWrapper className="py-5">
        <p>haha loser no sub</p>
      </MaxWidthWrapper>
    );
  }
};

export default CouponsCont;
