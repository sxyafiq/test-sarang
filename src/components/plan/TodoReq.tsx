"use client";

import { trpc } from "@/trpc/client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon, Check, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { ChangeEvent, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Todo } from "@/payload-types";
import TodoChosenDate from "./TodoChosenDate";
import { Input } from "../ui/input";
import TodoChosenRemarks from "./TodoChosenRemarks";
import TodoChosenDone from "./TodoChosenDone";

interface TodoReqProps {
  id: string;
  Todo: string;
}

const TodoReq = ({ id, Todo }: TodoReqProps) => {
  const [date, setDate] = useState<Date>(new Date());

  const addTodo = trpc.addTodo.useMutation();

  const results = trpc.getTodoByTodo.useQuery({
    todo: Todo,
    planId: id,
  });

  const submitTodo = (date: Date | Date[]) => {
    const selectedDate = Array.isArray(date) ? date[0] : date;
    const formattedDate = selectedDate.toISOString();

    setDate(new Date(formattedDate));

    addTodo.mutate({
      planId: id,
      todo: Todo,
      date: formattedDate,
      remarks: "",
    });
  };

  return (
    <div className="p-3 lg:p-0 grid grid-cols-3 gap-2 md:grid-cols-10 md:gap-0 bg-slate-200 shadow-md lg:shadow-none lg:bg-white">
      <div className="col-span-3 md:px-4 flex flex-row items-center">
        <p className="px-2 font-medium">{Todo}</p>
      </div>
      {results.data && results.data?.docs.length > 0 ? (
        <>
          <div className="col-span-3 md:col-span-2 flex justify-center items-center">
            <TodoChosenDate
              id={results.data.docs[0].id}
              tdDate={results.data.docs[0].date}
              tChecked={results.data.docs[0].done}
            />
          </div>
          <div className="col-span-2 px-0 md:col-span-4 md:px-4 flex flex-row items-center">
            <TodoChosenRemarks
              id={results.data.docs[0].id}
              tRemarks={results.data.docs[0].remarks || ""}
              tChecked={results.data.docs[0].done}
            />
          </div>
        </>
      ) : (
        <>
          <div className="col-span-3 md:col-span-2 flex justify-center items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>Pick a date</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  //@ts-ignore
                  onSelect={submitTodo}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="col-span-2 px-0 md:col-span-4 md:px-4 flex flex-row items-center">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input placeholder="Remarks - Pick a date first!" disabled />
              <Button
                variant="outline"
                size="icon"
                className="bg-slate-300"
                disabled
              >
                <Check className="h-4 px-2 text-slate-700" />
              </Button>
            </div>
          </div>
        </>
      )}
      <div className="w-full flex justify-center items-center gap-2">
        {results.data && results.data?.docs.length > 0 ? (
          <TodoChosenDone
            id={results.data.docs[0].id}
            tChecked={results.data.docs[0].done}
          />
        ) : (
          <Loader2 className="animate-spin" />
        )}
      </div>
    </div>
  );
};

export default TodoReq;
