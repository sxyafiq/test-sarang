"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { trpc } from "@/trpc/client";

interface TodoChosenDateProps {
  id: string;
  tdDate: string;
  tChecked: boolean;
}

const TodoChosenDate = ({ id, tdDate, tChecked }: TodoChosenDateProps) => {
  const [date, setDate] = useState<Date>(new Date(tdDate));

  const edit = trpc.editTodo.useMutation();

  const editDate = (date: Date | Date[]) => {
    const selectedDate = Array.isArray(date) ? date[0] : date;
    const formattedDate = selectedDate.toISOString();

    setDate(new Date(formattedDate));

    edit.mutate({
      id: id,
      date: formattedDate,
      remarks: "",
    });
  };

  return (
    <>
      {tChecked === false ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              <p className="text-ellipsis overflow-hidden">
                {format(date, "PPP")}
              </p>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              //@ts-ignore
              onSelect={editDate}
              required
              initialFocus
            />
          </PopoverContent>
        </Popover>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="w-full justify-start text-left font-normal bg-slate-200"
              disabled
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              <p className="text-ellipsis overflow-hidden">
                {format(date, "PPP")}
              </p>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              //@ts-ignore
              onSelect={editDate}
              required
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export default TodoChosenDate;
