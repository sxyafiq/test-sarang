"use client";

import { Guest } from "@/payload-types";
import { trpc } from "@/trpc/client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import GuestPullCont from "./GuestPullCont";

interface GuestPullProps {
  planId: string;
}

const GuestPull = ({ planId }: GuestPullProps) => {
  const guests = trpc.getGuests.useQuery({
    planId: planId,
  });

  const results = guests.data?.docs as Guest[];

  const tables = [
    { title: "Bride's Family" },
    { title: "Bride's Colleagues" },
    { title: "Bride's Friends" },
    { title: "Groom's Family" },
    { title: "Groom's Colleagues" },
    { title: "Groom's Friends" },
    { title: "Others" },
  ];

  return (
    <>
      {results ? (
        <>
          {tables.map((category) => (
            <div key={category.title} className="py-4">
              <h1 className="text-xl font-semibold tracking-tight mb-4">
                {category.title}
              </h1>
              <Table className="border-2 rounded-md">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[400px]">Guest(s)</TableHead>
                    <TableHead className="w-[150px]">Number of Pax</TableHead>
                    <TableHead className="w-[100px]">Invitation Sent</TableHead>
                    <TableHead className="w-[300px]">Attendance</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((guest) => (
                    <>
                      {guest.group === category.title ? (
                        <GuestPullCont guest={guest} key={guest.id} />
                      ) : null}
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </>
      ) : null}
    </>
  );
};

export default GuestPull;
