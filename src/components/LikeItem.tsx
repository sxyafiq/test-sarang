import { VENDOR_CATEGORIES } from "@/config";
import { Vendor } from "@/payload-types";
import { trpc } from "@/trpc/client";
import { ImageIcon, Loader, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

interface LikeItemProps {
  vendorId: string;
  likeId: string;
}

const LikeItem = ({ vendorId, likeId }: LikeItemProps) => {
  const vendor = trpc.getVendor.useQuery({
    id: vendorId,
  });

  const removeLike = trpc.removeLike.useMutation();

  if (vendor.status === "loading") {
    return (
      <div className="space-y-3 py-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
              <Skeleton className="h-40 w-40" />
            </div>
            <div className="flex flex-col self-start">
              <span className="line-clamp-1 text-sm font-medium mb-1">
                <Skeleton className="h-4 w-[200px]" />
              </span>

              <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
                <Skeleton className="h-4 w-[100px]" />
              </span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            <Skeleton className="h-4 w-[50px]" />
          </div>
        </div>
      </div>
    );
  } else if (vendor.status === "success") {
    const validVendor = vendor.data.docs[0] as Vendor;

    const label = VENDOR_CATEGORIES.find(
      ({ value }) => value === validVendor.category
    )?.label;

    return (
      <div className="space-y-3 py-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative aspect-square h-20 w-20 min-w-fit overflow-hidden rounded">
              {validVendor.images &&
              typeof validVendor.images[0].image !== "string" &&
              validVendor.images[0].image.url ? (
                <Link href={`/vendor/${validVendor.id}`}>
                  <Image
                    src={validVendor.images[0].image.url}
                    alt={validVendor.name}
                    width={400}
                    height={400}
                    className="absolute object-cover aspect-square"
                    onLoad={() => (
                      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
                        <Skeleton className="h-full w-full" />
                      </div>
                    )}
                  />
                </Link>
              ) : (
                <div className="flex h-full items-center justify-center bg-secondary">
                  <ImageIcon
                    aria-hidden="true"
                    className="h-4 w-4 text-muted-foreground"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col self-start">
              <Link href={`/vendor/${validVendor.id}`}>
                <span className="line-clamp-1 text-sm font-medium mb-1 hover:underline">
                  {validVendor.name}
                </span>
              </Link>

              <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
                {label}
              </span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            <button
              onClick={() => removeLike.mutate({ likeId: likeId })}
              className="flex items-center gap-0.5"
            >
              <X className="w-3 h-4" />
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default LikeItem;
