"use client";

import { trpc } from "@/trpc/client";
import { Loader } from "lucide-react";
import TodoPull from "./TodoPull";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format, setDate } from "date-fns";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { date } from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { ChangeEvent, SetStateAction, useState } from "react";
import WantToSync from "./WantToSync";

interface DetailsContProps {
  userId: string;
}

const TodoCont = ({ userId }: DetailsContProps) => {
  const [date, setDate] = useState<Date>();
  const [todo, setTodo] = useState("");
  const [remarks, setRemarks] = useState("");

  function handleTodoChange(event: ChangeEvent<HTMLInputElement>) {
    setTodo(event.target.value);
  }

  function handleRemarksChange(event: {
    target: { value: SetStateAction<string> };
  }) {
    setRemarks(event.target.value);
  }

  const plan = trpc.getPlan.useQuery({
    userId: userId,
  });

  const identifiedPlan = plan.data?.docs;

  const addTodo = trpc.addTodo.useMutation();

  const submitTodo = () => {
    if (identifiedPlan) {
      addTodo.mutate({
        planId: identifiedPlan[0].id as string,
        date: date?.toISOString() as string,
        todo: todo as string,
        remarks: remarks as string,
      });
      setRemarks("");
      setDate(new Date());
      setTodo("");
    }
  };

  return (
    <>
      {identifiedPlan && identifiedPlan.length === 1 ? (
        <>
          <div className="grid grid-cols-3 gap-2 md:gap-0 md:grid-cols-10 py-3 mb-5 rounded-lg shadow-md bg-gradient-to-r from-pink-100 to-cyan-100">
            <div className="col-span-3 px-4">
              <Input
                placeholder="Add a new to do.."
                value={todo}
                onChange={(e) => handleTodoChange(e)}
              />
            </div>
            <div className="col-span-3 px-4 md:px-0 md:col-span-2 flex justify-center items-center">
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
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="col-span-2 md:col-span-4 px-4">
              <Input
                placeholder="Remarks"
                value={remarks}
                onChange={(e) => handleRemarksChange(e)}
              />
            </div>
            <div className="w-full flex justify-center items-center">
              <PlusCircle
                onClick={submitTodo}
                className="cursor-pointer text-slate-400 hover:text-slate-600"
              />
            </div>
          </div>
          <TodoPull planId={identifiedPlan[0].id} />
        </>
      ) : identifiedPlan ? (
        <WantToSync plans={identifiedPlan} userId={userId} />
      ) : (
        <Loader className="animate-spin" />
      )}
    </>
  );
};

export default TodoCont;
