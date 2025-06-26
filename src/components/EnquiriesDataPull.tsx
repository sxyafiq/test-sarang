import { Separator } from "@radix-ui/react-dropdown-menu";
import { ScrollArea } from "./ui/scroll-area";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { Skeleton } from "./ui/skeleton";
import { Chat, User } from "@/payload-types";
import EnquiryItem from "./EnquiryItem";
import EnquiryItemSupervendor from "./EnquiryItemSupervendor";

interface EnquiriesDataPullProps {
  chats: Chat[];
  itemCount: number;
  role: string;
}

const EnquiriesDataPull = ({
  chats,
  itemCount,
  role,
}: EnquiriesDataPullProps) => {
  const isSuperVendor = role !== "vendor";

  return (
    <>
      <SheetHeader className="space-y-2.5 pr-6">
        <SheetTitle>Enquiries ({itemCount})</SheetTitle>
      </SheetHeader>
      {itemCount > 0 ? (
        <div className="flex w-full flex-col pr-6">
          <ScrollArea>
            {chats.map((chat) =>
              !isSuperVendor ? (
                <EnquiryItem chat={chat} key={chat.id} />
              ) : (
                <EnquiryItemSupervendor
                  chat={chat}
                  key={chat.id}
                  user={chat.user as User}
                />
              )
            )}
          </ScrollArea>
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center space-y-1">
          <div className="text-xl font-semibold">No enquiries yet!</div>
        </div>
      )}
    </>
  );
};

export default EnquiriesDataPull;
