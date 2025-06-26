import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { Like, User, Vendor } from "@/payload-types";
import { trpc } from "@/trpc/client";
import { Loader2 } from "lucide-react";
import TVLChat from "./TVLChat";

interface TotalVendorLikesProps {
  vendor: Vendor;
  role: string;
}

const TVLDataPull = ({ vendor, role }: TotalVendorLikesProps) => {
  const getLikes = trpc.getLikesFromVendId.useQuery({
    vendorId: vendor.id,
  });

  const likes = getLikes.data?.docs as unknown as Like[];

  function formatDate(string: string | number | Date) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    //@ts-ignore
    return new Date(string).toLocaleDateString([], options);
  }

  return (
    <>
      {likes ? (
        <>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-2xl font-bold">
                {likes.length}
              </AccordionTrigger>
              <AccordionContent>
                {/* {JSON.stringify(likes)} */}
                <Table>
                  <TableCaption>
                    A list of everyone who liked your vendor profile.
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      {role === "supervendor" ? (
                        <TableHead>Chat</TableHead>
                      ) : null}
                      <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {likes.map((like) => (
                      <TableRow key={like.id}>
                        <TableCell className="font-medium">
                          {/* @ts-ignore */}
                          {like.user.name}
                        </TableCell>

                        <TableCell>
                          {/* @ts-ignore */}
                          {like.user.email}
                        </TableCell>
                        {role === "supervendor" ? (
                          <TableCell>
                            {/* @ts-ignore */}
                            <TVLChat user={like.user} vendor={vendor} />
                          </TableCell>
                        ) : null}
                        <TableCell className="text-right">
                          {formatDate(like.createdAt)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      ) : (
        <Loader2 className="animate-spin" />
      )}
    </>
  );
};

export default TVLDataPull;
