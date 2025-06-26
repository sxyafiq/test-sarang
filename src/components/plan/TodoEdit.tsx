"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon, Check, CheckCircle, Circle, Delete } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { trpc } from "@/trpc/client";
import { Checkbox } from "../ui/checkbox";

interface TodoEditProps {
  id: string;
  pTodo: string;
  pDate: string;
  pChecked: boolean;
  todoId: string;
  pRemarks: string;
}

const TodoEdit = ({
  id,
  pTodo,
  pDate,
  pChecked,
  todoId,
  pRemarks,
}: TodoEditProps) => {
  const [todo, setTodo] = useState(pTodo);
  const [date, setDate] = useState<Date>(new Date(pDate));
  const [checked, setChecked] = useState(pChecked);
  const [remarks, setRemarks] = useState(pRemarks);
  const [remarksButton, setRemarksButton] = useState("bg-emerald-200");

  const edit = trpc.editTodo.useMutation();
  const del = trpc.removeTodo.useMutation();

  const editRemarks = (event: { target: { value: string } }) => {
    const text = event.target.value as string;

    setRemarks(text);
    setRemarksButton("bg-amber-200 ease-in-out duration-300");
  };

  const editTodo = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    const text = event.target.value as string;

    setTodo(text);
    edit.mutate({
      id: todoId,
      todo: text,
    });
  };

  const editDate = (date: Date | Date[]) => {
    const selectedDate = Array.isArray(date) ? date[0] : date;
    const formattedDate = selectedDate.toISOString();

    setDate(new Date(formattedDate));

    edit.mutate({
      id: todoId,
      date: formattedDate,
    });
  };

  const editChecked = () => {
    if (checked) {
      setChecked(false);

      edit.mutate({
        id: todoId,
        check: false,
      });
    } else if (!checked) {
      setChecked(true);

      edit.mutate({
        id: todoId,
        check: true,
      });
    }
  };

  return (
    <div className="p-3 lg:p-0 mt-4 grid grid-cols-3 gap-3 md:grid-cols-10 md:gap-0 bg-slate-200 shadow-md lg:shadow-none lg:bg-white">
      <div className="col-span-3 md:px-4 flex items-center">
        {checked ? (
          <Input value={todo} disabled className="bg-slate-200" />
        ) : (
          <Input value={todo} onChange={(e) => editTodo(e)} />
        )}
      </div>
      <div className="col-span-3 md:col-span-2 flex justify-center items-center">
        <Popover>
          <PopoverTrigger asChild>
            {checked ? (
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
            ) : (
              <Button
                variant={"outline"}
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                <p className="text-ellipsis overflow-hidden">
                  {format(date, "PPP")}
                </p>
              </Button>
            )}
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
      </div>
      <div className="col-span-2 px-0 md:col-span-4 md:px-4 flex items-center">
        {checked ? (
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              placeholder="Remarks"
              value={remarks}
              disabled
              className="bg-slate-200"
            />
            <Button
              variant="outline"
              size="icon"
              className="bg-slate-300"
              disabled
            >
              <Check className="h-4 px-2 text-slate-700" />
            </Button>
          </div>
        ) : (
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              placeholder="Remarks"
              value={remarks}
              onChange={(e) => editRemarks(e)}
            />
            <Button
              variant="outline"
              size="icon"
              className={remarksButton}
              onClick={() => {
                edit.mutate({
                  id: id,
                  remarks: remarks,
                });
                setRemarksButton("bg-emerald-200 ease-in-out duration-300");
              }}
            >
              <Check className="h-4 px-2" />
            </Button>
          </div>
        )}
      </div>
      <div className="w-full h-full flex justify-around items-center">
        <Checkbox checked={checked} onCheckedChange={editChecked} />
        <Delete
          className="text-red-400 w-5 h-5 cursor-pointer hover:text-red-600"
          onClick={() =>
            del.mutate({
              todoId: todoId,
            })
          }
        />
      </div>
    </div>
  );
};

export default TodoEdit;
