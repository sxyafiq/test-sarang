"use client";

import { Guest } from "@/payload-types";
import React, { ChangeEvent, SetStateAction, useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Delete } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { trpc } from "@/trpc/client";
import { Checkbox } from "../ui/checkbox";

interface GuestPullContProps {
  guest: Guest;
}

const GuestPullCont = ({ guest }: GuestPullContProps) => {
  const [group, setGroup] = useState(guest.group);
  const [name, setName] = useState(guest.name);
  const [pax, setPax] = useState(guest.pax);
  const [attendance, setAttendance] = useState(guest.attendance);
  const [sent, setSent] = useState(guest.sent);

  const [groupButton, setGroupButton] = useState("bg-emerald-200");
  const [nameButton, setNameButton] = useState("bg-emerald-200");
  const [paxButton, setPaxButton] = useState("bg-emerald-200");
  const [attendanceButton, setAttendanceButton] = useState("bg-emerald-200");

  const handleName = (event: { target: { value: SetStateAction<string> } }) => {
    setName(event.target.value);
    setNameButton("bg-amber-200 ease-in-out duration-300");
  };

  const handlePax = (event: ChangeEvent<HTMLInputElement>) => {
    setPax(event.target.valueAsNumber);
    setPaxButton("bg-amber-200 ease-in-out duration-300");
  };

  const edit = trpc.editGuests.useMutation();

  const handleSent = () => {
    if (sent) {
      setSent(false);

      edit.mutate({
        id: guest.id,
        sent: false,
      });
    } else if (!sent) {
      setSent(true);

      edit.mutate({
        id: guest.id,
        sent: true,
      });
    }
  };

  const del = trpc.removeGuest.useMutation();

  return (
    <TableRow>
      <TableCell className="flex flex-col gap-2">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Select
            value={group}
            onValueChange={setGroup}
            onOpenChange={() =>
              setGroupButton("bg-amber-200 ease-in-out duration-300")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bride's Family">Bride&#39;s Family</SelectItem>
              <SelectItem value="Bride's Colleagues">
                Bride&#39;s Colleagues
              </SelectItem>
              <SelectItem value="Bride's Friends">
                Bride&#39;s Friends
              </SelectItem>
              <SelectItem value="Groom's Family">Groom&#39;s Family</SelectItem>
              <SelectItem value="Groom's Colleagues">
                Groom&#39;s Colleagues
              </SelectItem>
              <SelectItem value="Groom's Friends">
                Groom&#39;s Friends
              </SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            className={groupButton}
            onClick={() => {
              edit.mutate({
                id: guest.id,
                group: group,
              });
              setGroupButton("bg-emerald-200 ease-in-out duration-300");
            }}
          >
            <Check className="h-3" />
          </Button>
        </div>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Person's Name or Group's Name"
            value={name}
            onChange={(e) => handleName(e)}
          />
          <Button
            variant="outline"
            size="icon"
            className={nameButton}
            onClick={() => {
              edit.mutate({
                id: guest.id,
                name: name,
              });
              setNameButton("bg-emerald-200 ease-in-out duration-300");
            }}
          >
            <Check className="h-3" />
          </Button>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex w-full items-center space-x-1">
          <Input type="number" value={pax} onChange={(e) => handlePax(e)} />
          <Button
            variant="outline"
            size="icon"
            className={paxButton}
            onClick={() => {
              edit.mutate({
                id: guest.id,
                pax: pax,
              });
              setPaxButton("bg-emerald-200 ease-in-out duration-300");
            }}
          >
            <Check className="h-3" />
          </Button>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex w-full items-center justify-center">
          <Checkbox checked={sent} onCheckedChange={handleSent} />
        </div>
      </TableCell>
      <TableCell>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Select
            value={attendance}
            onValueChange={setAttendance}
            onOpenChange={() =>
              setAttendanceButton("bg-amber-200 ease-in-out duration-300")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select their attendance status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Attending">Attending</SelectItem>
              <SelectItem value="Not Attending">Not Attending</SelectItem>
              <SelectItem value="Waiting Confirmation">
                Waiting Confirmation
              </SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            className={attendanceButton}
            onClick={() => {
              edit.mutate({
                id: guest.id,
                attendance: attendance,
              });
              setAttendanceButton("bg-emerald-200 ease-in-out duration-300");
            }}
          >
            <Check className="h-3" />
          </Button>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center">
          <Delete
            className="text-red-400 w-5 h-5 cursor-pointer hover:text-red-600"
            onClick={() =>
              del.mutate({
                id: guest.id,
              })
            }
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default GuestPullCont;
