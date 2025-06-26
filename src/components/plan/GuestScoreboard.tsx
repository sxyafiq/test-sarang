"use client";

import { cn } from "@/lib/utils";
import { Guest } from "@/payload-types";

interface GuestScoreboardProps {
  guests: Guest[];
}

const GuestScoreboard = ({ guests }: GuestScoreboardProps) => {
  let invited = 0;
  let attending = 0;
  const invitations = guests.length;
  let sent = 0;
  let bride = 0;
  let groom = 0;
  let others = 0;

  for (let i = 0; i < guests.length; i++) {
    //@ts-ignore
    invited = invited + guests[i].pax;

    if (guests[i].attendance === "Attending") {
      attending = attending + guests[i].pax;
    }

    if (guests[i].sent === true) {
      sent++;
    }
  }

  for (let b = 0; b < guests.length; b++) {
    if (
      guests[b].group == "Bride's Family" ||
      guests[b].group == "Bride's Colleagues" ||
      guests[b].group == "Bride's Friends"
    ) {
      bride = bride + guests[b].pax;
    } else if (guests[b].group === "Others") {
      others = others + guests[b].pax;
    } else {
      groom = groom + guests[b].pax;
    }
  }

  const percentage = (number: number) => {
    const result = (number / invited) * 10;
    return ("col-span-" + result.toFixed()) as string;
  };

  const actPercent = (number: number) => {
    const result = (number / invited) * 100;
    return (result.toFixed(2) + "%") as string;
  };

  return (
    <>
      <div className="w-full grid grid-cols-2 justify-items-center gap-4 lg:grid-cols-4 lg:gap-10 pb-6">
        <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-lg shadow-lg border-2 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center">
            <h1 className="text-xl">{invited}</h1>
          </div>
          <p className="italic text-slate-400">Total Pax Invited</p>
        </div>
        <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-lg shadow-lg border-2 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center">
            <h1 className="text-xl">{attending}</h1>
          </div>
          <p className="italic text-slate-400">Total Pax Attending</p>
        </div>
        <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-lg shadow-lg border-2 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center">
            <h1 className="text-xl">{invitations}</h1>
          </div>
          <p className="italic text-slate-400">Total Invitations</p>
        </div>
        <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-lg shadow-lg border-2 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center">
            <h1 className="text-xl">{sent}</h1>
          </div>
          <p className="italic text-slate-400">Invitations Sent</p>
        </div>
      </div>

      <div className="w-full flex flex-row justify-center gap-4 lg:gap-10 pb-6">
        <div className="bg-gradient-to-t from-pink-100 to-white w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-lg shadow-lg border-2 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center">
            <h1 className="font-bold">Bride&apos;s Side</h1>
            <h1 className="text-xl">{bride + " Pax"}</h1>
          </div>
          <p className="italic text-slate-400">{actPercent(bride)}</p>
        </div>
        <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-lg shadow-lg border-2 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center">
            <h1 className="font-bold">Others</h1>
            <h1 className="text-xl">{others + " Pax"}</h1>
          </div>
          <p className="italic text-slate-400">{actPercent(others)}</p>
        </div>
        <div className="bg-gradient-to-t from-cyan-100 to-white w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-lg shadow-lg border-2 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center">
            <h1 className="font-bold">Groom&apos;s Side</h1>
            <h1 className="text-xl">{groom + " Pax"}</h1>
          </div>
          <p className="italic text-slate-400">{actPercent(groom)}</p>
        </div>
      </div>
    </>
  );
};

export default GuestScoreboard;
